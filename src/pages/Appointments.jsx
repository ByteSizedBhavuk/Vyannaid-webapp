import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import { getStudentSessions, getStudentCounsellor } from '../api/studentApi';
import {
  Video, MessageSquare, Phone, Users,
  Calendar, Clock, CheckCircle2,
  GraduationCap
} from 'lucide-react';
import './Appointments.css';

// ── Helpers ───────────────────────────────────────────────────
const TYPE_ICON = {
  video:       <Video size={16} />,
  chat:        <MessageSquare size={16} />,
  phone:       <Phone size={16} />,
  'in-person': <Users size={16} />,
};

const STATUS_CONFIG = {
  scheduled:  { label: 'Upcoming',  cls: 'apt-status-blue'  },
  completed:  { label: 'Completed', cls: 'apt-status-green' },
  cancelled:  { label: 'Cancelled', cls: 'apt-status-red'   },
  'no-show':  { label: 'No Show',   cls: 'apt-status-amber' },
};

const getInitials = (name = '') =>
  name.trim().split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true
  });

const isUpcoming = (iso) => new Date(iso) > new Date();

// ── Counsellor card ───────────────────────────────────────────
const CounsellorCard = ({ counsellor }) => {
  if (!counsellor) {
    return (
      <div className="apt-counsellor-card apt-counsellor-empty">
        <div className="apt-ce-icon"><GraduationCap size={28} /></div>
        <div>
          <h3 className="apt-ce-title">No counsellor assigned yet</h3>
          <p className="apt-ce-sub">Your institution admin will assign a counsellor to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="apt-counsellor-card">
      <div className="apt-c-avatar" style={{ background: counsellor.avatarColor || '#1A2234' }}>
        {getInitials(counsellor.name)}
      </div>
      <div className="apt-c-info">
        <h3 className="apt-c-name">{counsellor.name}</h3>
        {counsellor.specialization && (
          <p className="apt-c-spec">{counsellor.specialization}</p>
        )}
        {counsellor.bio && (
          <p className="apt-c-bio">"{counsellor.bio}"</p>
        )}
        <div className="apt-c-meta">
          <span className="apt-c-pill">
            <CheckCircle2 size={12} />
            {counsellor.isActive ? 'Active' : 'Away'}
          </span>
          {counsellor.institution && (
            <span className="apt-c-pill">
              <GraduationCap size={12} />
              {counsellor.institution}
            </span>
          )}
        </div>
        {counsellor.availability?.length > 0 && (
          <div className="apt-c-avail">
            <span className="apt-c-avail-label">Available:</span>
            {counsellor.availability.slice(0, 3).map((slot, i) => (
              <span key={i} className="apt-c-slot">
                {slot.day} {slot.startTime}–{slot.endTime}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Session card ──────────────────────────────────────────────
const SessionCard = ({ session, onJoin }) => {
  const status   = STATUS_CONFIG[session.status] || STATUS_CONFIG.scheduled;
  const upcoming = isUpcoming(session.scheduledAt);
  const canJoin  = upcoming &&
                   session.status === 'scheduled' &&
                   (session.type === 'video' || session.type === 'phone');

  return (
    <div className={`apt-session-card ${upcoming ? 'apt-session-upcoming' : ''}`}>
      <div className="apt-session-type-icon">
        {TYPE_ICON[session.type] || <Video size={16} />}
      </div>
      <div className="apt-session-body">
        <div className="apt-session-top">
          <span className="apt-session-counsellor">{session.counsellorName}</span>
          <span className={`apt-status-pill ${status.cls}`}>{status.label}</span>
        </div>
        <div className="apt-session-time">
          <Calendar size={12} />
          {formatDate(session.scheduledAt)}
          <span className="apt-dot">·</span>
          <Clock size={12} />
          {formatTime(session.scheduledAt)}
          <span className="apt-dot">·</span>
          {session.durationMinutes || 50} min
        </div>
        {session.notes && (
          <p className="apt-session-notes">{session.notes}</p>
        )}
      </div>

      {/* Join Call button — only for upcoming video/phone sessions */}
      {canJoin && (
        <button
          className="apt-join-btn"
          onClick={() => onJoin(session._id)}
        >
          <Video size={14} />
          Join Call
        </button>
      )}
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────
const Appointments = () => {
  const navigate = useNavigate();
  const [counsellor, setCounsellor] = useState(null);
  const [sessions,   setSessions]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [tab,        setTab]        = useState('upcoming');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getStudentCounsellor(),
      getStudentSessions(),
    ])
      .then(([cRes, sRes]) => {
        setCounsellor(cRes.data.data);
        setSessions(sRes.data.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const upcoming = sessions.filter(s => isUpcoming(s.scheduledAt) && s.status !== 'cancelled');
  const past     = sessions.filter(s => !isUpcoming(s.scheduledAt) || s.status === 'cancelled');
  const shown    = tab === 'upcoming' ? upcoming : past;

  const handleJoin = (sessionId) => {
    navigate(`/call/${sessionId}`);
  };

  return (
    <DashboardLayout>
      <div className="appointments-page">

        {/* Header */}
        <div className="section-header">
          <h2 className="section-label">CONNECT WITH CARE</h2>
        </div>

        {/* Counsellor */}
        <div className="apt-block-label">YOUR COUNSELLOR</div>
        {loading ? (
          <div className="apt-loading"><div className="apt-spinner" /></div>
        ) : (
          <CounsellorCard counsellor={counsellor} />
        )}

        {/* Sessions */}
        <div className="apt-sessions-header">
          <div className="apt-block-label">SESSIONS</div>
          <div className="apt-tabs">
            <button
              className={`apt-tab ${tab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setTab('upcoming')}
            >
              Upcoming
              {upcoming.length > 0 && (
                <span className="apt-tab-count">{upcoming.length}</span>
              )}
            </button>
            <button
              className={`apt-tab ${tab === 'past' ? 'active' : ''}`}
              onClick={() => setTab('past')}
            >
              Past
            </button>
          </div>
        </div>

        {loading ? (
          <div className="apt-loading"><div className="apt-spinner" /></div>
        ) : shown.length === 0 ? (
          <div className="apt-empty">
            {tab === 'upcoming'
              ? <><Calendar size={32} /><p>No upcoming sessions. Your counsellor will schedule one.</p></>
              : <><CheckCircle2 size={32} /><p>No past sessions yet.</p></>
            }
          </div>
        ) : (
          <div className="apt-session-list">
            {shown.map(s => (
              <SessionCard key={s._id} session={s} onJoin={handleJoin} />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Appointments;