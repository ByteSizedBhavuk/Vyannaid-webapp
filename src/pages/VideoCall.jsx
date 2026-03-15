/**
 * src/pages/VideoCall.jsx
 *
 * Full-screen video call page.
 * Route: /call/:sessionId  (sessionId = MongoDB Session._id)
 *
 * Features:
 *  - Camera + microphone access via getUserMedia
 *  - WebRTC peer-to-peer connection with TURN fallback
 *  - Mic toggle, camera toggle, end call
 *  - Slide-in text chat panel (Socket.io, no WebRTC)
 *  - Waiting screen until peer joins
 *  - Peer-left / disconnect handling
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate }                           from 'react-router-dom';
import { useAuth }                                          from '../auth/AuthContext';
import { getSocket }                                        from '../api/socketClient';
import {
  Mic, MicOff, Video, VideoOff,
  PhoneOff, MessageSquare, Users
} from 'lucide-react';
import './VideoCall.css';

// ── ICE / TURN configuration ─────────────────────────────────────
// Reads TURN credentials from Vite environment variables.
// Fallback to Google's public STUN if TURN is not configured.
const getIceConfig = () => ({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // TURN server — required for users behind strict NATs
    ...(import.meta.env.VITE_TURN_URL ? [{
      urls:       import.meta.env.VITE_TURN_URL,
      username:   import.meta.env.VITE_TURN_USERNAME,
      credential: import.meta.env.VITE_TURN_CREDENTIAL,
    }] : []),
  ],
});

// ── VideoCall component ───────────────────────────────────────────
const VideoCall = () => {
  const { sessionId } = useParams();   // /call/:sessionId
  const { user }      = useAuth();
  const navigate      = useNavigate();

  // DOM refs
  const localVideoRef  = useRef(null);  // small local feed (bottom-right)
  const remoteVideoRef = useRef(null);  // large remote feed

  // WebRTC refs — not state, mutations don't need re-renders
  const pcRef     = useRef(null);   // RTCPeerConnection
  const streamRef = useRef(null);   // local MediaStream

  // UI state
  const [status,    setStatus]    = useState('connecting'); // connecting | waiting | live | ended
  const [micOn,     setMicOn]     = useState(true);
  const [camOn,     setCamOn]     = useState(true);
  const [showChat,  setShowChat]  = useState(false);
  const [messages,  setMessages]  = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [peerInfo,  setPeerInfo]  = useState(null);  // { name, role }
  const [mediaErr,  setMediaErr]  = useState('');

  const socket = getSocket(localStorage.getItem('token'));

  // ── Create a new RTCPeerConnection ────────────────────────────
  const createPC = useCallback(() => {
    const pc = new RTCPeerConnection(getIceConfig());

    // Remote track arrives — display in remote video element
    pc.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    // ICE candidates — forward to peer via Socket.io
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('ice-candidate', { roomId: sessionId, candidate: e.candidate });
      }
    };

    // Connection state changes
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') setStatus('live');
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        setStatus('ended');
      }
    };

    return pc;
  }, [sessionId, socket]);

  // ── Main effect — runs once on mount ─────────────────────────
  useEffect(() => {
    let pc;

    const start = async () => {
      // 1. Request camera + mic access
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } catch (err) {
        setMediaErr(
          err.name === 'NotAllowedError'
            ? 'Camera/microphone permission denied. Please allow access and refresh.'
            : `Could not access camera/mic: ${err.message}`
        );
        setStatus('ended');
        return;
      }

      streamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      // 2. Join the Socket.io room (roomId = sessionId = Session._id)
      socket.emit('join-room', sessionId);
      setStatus('waiting');

      // 3. ── Peer joined (we are the FIRST person — we send the offer) ──
      socket.on('peer-joined', async ({ name, role }) => {
        setPeerInfo({ name, role });

        pc = createPC();
        pcRef.current = pc;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        // Create and send offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { roomId: sessionId, sdp: offer });
      });

      // 4. ── Received offer (we are the SECOND person — we send the answer) ──
      socket.on('offer', async ({ sdp }) => {
        pc = createPC();
        pcRef.current = pc;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', { roomId: sessionId, sdp: answer });
        setStatus('live');
      });

      // 5. ── Received answer (we sent the offer — connection is completing) ──
      socket.on('answer', async ({ sdp }) => {
        await pcRef.current?.setRemoteDescription(new RTCSessionDescription(sdp));
        setStatus('live');
      });

      // 6. ── ICE candidate from peer ──
      socket.on('ice-candidate', async ({ candidate }) => {
        try {
          await pcRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.warn('[WebRTC] ICE candidate error:', e);
        }
      });

      // 7. ── Peer left the call ──
      socket.on('peer-left', () => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
        setStatus('waiting');
        setPeerInfo(null);
        // Close existing PC so a fresh one is created if they rejoin
        pcRef.current?.close();
        pcRef.current = null;
      });

      // 8. ── Incoming chat message ──
      socket.on('chat-message', (msg) => {
        setMessages(prev => [...prev, msg]);
      });
    };

    start().catch(console.error);

    // Cleanup on unmount
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
      pcRef.current?.close();
      socket.emit('leave-room', sessionId);
      socket.off('peer-joined');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('peer-left');
      socket.off('chat-message');
    };
  }, [sessionId]);   // eslint-disable-line react-hooks/exhaustive-deps

  // ── Controls ──────────────────────────────────────────────────
  const toggleMic = () => {
    const track = streamRef.current?.getAudioTracks()[0];
    if (track) { track.enabled = !track.enabled; setMicOn(track.enabled); }
  };

  const toggleCam = () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (track) { track.enabled = !track.enabled; setCamOn(track.enabled); }
  };

  const endCall = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    pcRef.current?.close();
    socket.emit('leave-room', sessionId);
    navigate(-1);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    socket.emit('chat-message', { roomId: sessionId, text: chatInput.trim() });
    setChatInput('');
  };

  // Unread count — messages from the other person while chat is closed
  const unread = showChat ? 0 : messages.filter(m => m.senderId !== user?.id).length;

  // ── Render ────────────────────────────────────────────────────
  if (mediaErr) {
    return (
      <div className="vc-error-screen">
        <div className="vc-error-card">
          <VideoOff size={40} />
          <h2>Cannot start call</h2>
          <p>{mediaErr}</p>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="vc-page">

      {/* ── Video area ── */}
      <div className={`vc-videos ${showChat ? 'with-chat' : ''}`}>
        {/* Remote (large) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="vc-remote"
        />

        {/* Local (small, muted — never plays your own audio back) */}
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="vc-local"
        />

        {/* Status overlay */}
        {status === 'waiting' && (
          <div className="vc-overlay">
            <div className="vc-overlay-pulse" />
            <p className="vc-overlay-text">
              {peerInfo ? `${peerInfo.name} is reconnecting…` : 'Waiting for the other person to join…'}
            </p>
          </div>
        )}

        {status === 'connecting' && (
          <div className="vc-overlay">
            <div className="vc-overlay-spinner" />
            <p className="vc-overlay-text">Setting up your camera…</p>
          </div>
        )}

        {/* Peer name badge (shown when live) */}
        {status === 'live' && peerInfo && (
          <div className="vc-peer-badge">
            <Users size={13} />
            {peerInfo.name} · {peerInfo.role}
          </div>
        )}
      </div>

      {/* ── Controls bar ── */}
      <div className="vc-controls">
        <button
          className={`vc-btn ${micOn ? '' : 'off'}`}
          onClick={toggleMic}
          title={micOn ? 'Mute microphone' : 'Unmute microphone'}
        >
          {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          <span className="vc-btn-label">{micOn ? 'Mute' : 'Unmute'}</span>
        </button>

        <button
          className={`vc-btn ${camOn ? '' : 'off'}`}
          onClick={toggleCam}
          title={camOn ? 'Turn off camera' : 'Turn on camera'}
        >
          {camOn ? <Video size={20} /> : <VideoOff size={20} />}
          <span className="vc-btn-label">{camOn ? 'Camera' : 'No Cam'}</span>
        </button>

        <button
          className="vc-btn vc-end"
          onClick={endCall}
          title="End call"
        >
          <PhoneOff size={20} />
          <span className="vc-btn-label">End</span>
        </button>

        <button
          className={`vc-btn ${showChat ? 'active' : ''}`}
          onClick={() => setShowChat(p => !p)}
          title="Toggle chat"
        >
          <MessageSquare size={20} />
          {unread > 0 && <span className="vc-badge">{unread}</span>}
          <span className="vc-btn-label">Chat</span>
        </button>
      </div>

      {/* ── Chat panel ── */}
      {showChat && (
        <div className="vc-chat">
          <div className="vc-chat-header">
            <span>In-call chat</span>
          </div>

          <div className="vc-chat-messages">
            {messages.length === 0 && (
              <p className="vc-chat-empty">No messages yet. Say hello!</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`vc-msg ${m.senderId === user?.id ? 'mine' : 'theirs'}`}
              >
                <span className="vc-msg-name">{m.senderName}</span>
                <span className="vc-msg-text">{m.text}</span>
                <span className="vc-msg-time">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={sendChat} className="vc-chat-form">
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Type a message…"
              className="vc-chat-input"
            />
            <button type="submit" className="vc-chat-send">Send</button>
          </form>
        </div>
      )}

    </div>
  );
};

export default VideoCall;