/**
 * src/components/StudentDashboard/SessionNotification.jsx
 *
 * Listens for 'session:new' events on the socket and shows a toast
 * notification in the student dashboard.
 *
 * Usage — drop this into Dashboard.jsx (or any always-rendered student layout):
 *   <SessionNotification />
 *
 * No props required — reads auth context internally.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Video, X, Bell } from 'lucide-react';
import { getSocket } from '../../api/socketClient';
import { useAuth } from '../../auth/AuthContext';
import './SessionNotification.css';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short',
  });

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

const SessionNotification = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;
    const token  = localStorage.getItem('token');
    const socket = getSocket(token);

    const onSessionNew = (session) => {
      const id = session._id?.toString() || String(Date.now());
      setNotifications(prev => [
        { ...session, notifId: id, seen: false },
        ...prev.slice(0, 2), // keep at most 3 toasts
      ]);

      // Auto-dismiss after 12 seconds
      setTimeout(() => dismiss(id), 12000);
    };

    socket.on('session:new', onSessionNew);
    return () => socket.off('session:new', onSessionNew);
  }, [user]);

  const dismiss = (notifId) =>
    setNotifications(prev => prev.filter(n => n.notifId !== notifId));

  if (notifications.length === 0) return null;

  return (
    <div className="sn-stack" aria-live="polite">
      {notifications.map((n) => (
        <div key={n.notifId} className="sn-toast">
          {/* Icon */}
          <div className="sn-icon-wrap">
            <Bell size={18} />
          </div>

          {/* Content */}
          <div className="sn-body">
            <p className="sn-title">New Session Scheduled</p>
            <p className="sn-sub">
              {n.counsellorName || 'Your counsellor'} scheduled a{' '}
              <strong>{n.type || 'video'}</strong> session
            </p>
            <p className="sn-time">
              <Calendar size={12} />
              {formatDate(n.scheduledAt)} at {formatTime(n.scheduledAt)}
              {' · '}{n.durationMinutes || 50} min
            </p>

            <div className="sn-actions">
              <button
                className="sn-btn-primary"
                onClick={() => {
                  dismiss(n.notifId);
                  navigate('/dashboard/appointments');
                }}
              >
                <Calendar size={13} /> View Details
              </button>

              {/* Show Join immediately only if session is within 15 min */}
              {isJoinable(n.scheduledAt) && (
                <button
                  className="sn-btn-join"
                  onClick={() => {
                    dismiss(n.notifId);
                    navigate(`/call/${n._id}`);
                  }}
                >
                  <Video size={13} /> Join Now
                </button>
              )}
            </div>
          </div>

          {/* Dismiss */}
          <button
            className="sn-close"
            onClick={() => dismiss(n.notifId)}
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

/** true if session starts within the next 15 minutes */
function isJoinable(scheduledAt) {
  const diff = new Date(scheduledAt) - Date.now();
  return diff >= 0 && diff <= 15 * 60 * 1000;
}

export default SessionNotification;