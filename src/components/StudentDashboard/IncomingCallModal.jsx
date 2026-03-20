/**
 * src/components/StudentDashboard/IncomingCallModal.jsx
 *
 * Renders a ringing overlay when the student receives a call:incoming event.
 * Auto-dismisses after 30 seconds (missed call).
 * Used inside DashboardLayout so it's always active when student is logged in.
 */

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneOff, Phone } from 'lucide-react';
import { getSocket, acceptCall, rejectCall } from '../../api/socketClient';
import './IncomingCallModal.css';

const RING_TIMEOUT = 30; // seconds

const IncomingCallModal = () => {
  const navigate     = useNavigate();
  const [call, setCall] = useState(null); // { sessionId, callerId, callerName }
  const [countdown, setCountdown] = useState(RING_TIMEOUT);
  const timerRef    = useRef(null);
  const countRef    = useRef(null);
  const audioRef    = useRef(null);

  useEffect(() => {
    const socket = getSocket(localStorage.getItem('token'));

    const onIncoming = ({ sessionId, callerId, callerName, callerRole }) => {
      setCall({ sessionId, callerId, callerName, callerRole });
      setCountdown(RING_TIMEOUT);
      // Auto-dismiss after timeout (missed)
      timerRef.current = setTimeout(() => {
        setCall(null);
      }, RING_TIMEOUT * 1000);
      // Countdown tick
      countRef.current = setInterval(() => {
        setCountdown(c => Math.max(0, c - 1));
      }, 1000);
    };

    const onMissed  = () => clearAndDismiss();
    const onEnded   = () => clearAndDismiss();

    socket.on('call:incoming', onIncoming);
    socket.on('call:missed',   onMissed);
    socket.on('call:ended',    onEnded);

    return () => {
      socket.off('call:incoming', onIncoming);
      socket.off('call:missed',   onMissed);
      socket.off('call:ended',    onEnded);
      clearTimeout(timerRef.current);
      clearInterval(countRef.current);
    };
  }, []);

  const clearAndDismiss = () => {
    clearTimeout(timerRef.current);
    clearInterval(countRef.current);
    setCall(null);
  };

  const handleAccept = () => {
    const socket = getSocket(localStorage.getItem('token'));
    acceptCall(socket, call.sessionId, call.callerId);
    clearAndDismiss();
    navigate(`/call/${call.sessionId}`);
  };

  const handleReject = () => {
    const socket = getSocket(localStorage.getItem('token'));
    rejectCall(socket, call.sessionId, call.callerId);
    clearAndDismiss();
  };

  if (!call) return null;

  // Ring progress bar width
  const progress = ((RING_TIMEOUT - countdown) / RING_TIMEOUT) * 100;

  return (
    <div className="icm-overlay">
      <div className="icm-card">
        {/* Progress bar */}
        <div className="icm-progress">
          <div className="icm-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Caller avatar */}
        <div className="icm-avatar">
          <span className="icm-avatar-initial">{call.callerName?.charAt(0).toUpperCase() || 'C'}</span>
          <div className="icm-ring-outer" />
          <div className="icm-ring-inner" />
        </div>

        <div className="icm-info">
          <p className="icm-label">Incoming Video Call</p>
          <h2 className="icm-name">{call.callerName || 'Your Counsellor'}</h2>
          <p className="icm-role">{call.callerRole || 'Counsellor'}</p>
        </div>

        <div className="icm-countdown">{countdown}s</div>

        <div className="icm-actions">
          <button className="icm-reject" onClick={handleReject} title="Decline">
            <PhoneOff size={22} />
            <span>Decline</span>
          </button>
          <button className="icm-accept" onClick={handleAccept} title="Accept">
            <Phone size={22} />
            <span>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;