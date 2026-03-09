import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import { Plus, ChevronLeft, ChevronRight, BookOpen, Calendar, List, X } from 'lucide-react';
import { getJournalEntries, getJournalCalendar, deleteJournalEntry } from '../api/journalApi';
import './JournalingHome.css';

/* ─── helpers ─────────────────────────────────────────────── */
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function groupByDay(entries) {
  const map = {};
  for (const e of entries) {
    const key = new Date(e.createdAt).toISOString().slice(0, 10);
    if (!map[key]) map[key] = [];
    map[key].push(e);
  }
  // Sort days descending
  return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
}

function formatDayLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (d.getTime() === today.getTime()) return 'Today';
  if (d.getTime() === yesterday.getTime()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatUpdated(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/* ─── Calendar sub-component ─────────────────────────────── */
const JournalCalendar = ({ year, month, activeDays, onDayClick, onMonthChange }) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const activeSet = new Set(activeDays.map(a => new Date(a.date + 'T00:00:00').getDate()));

  return (
    <div className="jh-calendar">
      <div className="jh-cal-header">
        <button className="jh-cal-nav" onClick={() => onMonthChange(-1)}><ChevronLeft size={16} /></button>
        <span className="jh-cal-title">{MONTHS[month - 1]} {year}</span>
        <button className="jh-cal-nav" onClick={() => onMonthChange(1)}><ChevronRight size={16} /></button>
      </div>
      <div className="jh-cal-grid">
        {DAYS.map(d => <div key={d} className="jh-cal-dayname">{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="jh-cal-cell empty" />;
          const isToday = day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();
          const hasEntry = activeSet.has(day);
          return (
            <div
              key={day}
              className={`jh-cal-cell ${isToday ? 'today' : ''} ${hasEntry ? 'has-entry' : ''}`}
              onClick={() => hasEntry && onDayClick(day)}
              title={hasEntry ? 'Has entries' : ''}
            >
              {day}
              {hasEntry && <span className="jh-cal-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Main Page ───────────────────────────────────────────── */
const JournalingHome = () => {
  const navigate = useNavigate();
  const now = new Date();

  const [view, setView] = useState('list');   // 'list' | 'calendar'
  const [entries, setEntries] = useState([]);
  const [calDays, setCalDays] = useState([]);
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);

  const loadEntries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getJournalEntries();
      setEntries(res.data.data);
    } catch {
      setError('Could not load entries.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCalendar = useCallback(async () => {
    try {
      const res = await getJournalCalendar(calYear, calMonth);
      setCalDays(res.data.data);
    } catch {
      setCalDays([]);
    }
  }, [calYear, calMonth]);

  useEffect(() => { loadEntries(); }, [loadEntries]);
  useEffect(() => { loadCalendar(); }, [loadCalendar]);

  const handleMonthChange = (delta) => {
    let m = calMonth + delta;
    let y = calYear;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    setCalMonth(m);
    setCalYear(y);
  };

  const handleCalDayClick = (day) => {
    const dateStr = `${calYear}-${String(calMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const match = entries.find(e => e.createdAt.slice(0, 10) === dateStr);
    if (match) navigate(`/dashboard/journaling/${match._id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this journal entry?')) return;
    setDeleting(id);
    try {
      await deleteJournalEntry(id);
      setEntries(prev => prev.filter(en => en._id !== id));
      loadCalendar();
    } catch {
      alert('Could not delete entry.');
    } finally {
      setDeleting(null);
    }
  };

  const grouped = groupByDay(entries);
  const totalWords = entries.reduce((sum, e) => sum + (e.wordCount || 0), 0);

  // Check if an entry already exists for today
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayEntry = entries.find(e => e.createdAt.slice(0, 10) === todayStr);

  const handleNewEntry = (promptState) => {
    if (todayEntry) {
      // Already has an entry today — open it for editing
      navigate(`/dashboard/journaling/${todayEntry._id}`);
    } else {
      navigate('/dashboard/journaling/new', promptState ? { state: promptState } : undefined);
    }
  };

  return (
    <DashboardLayout>
      <div className="jh-page">
        {/* ── Hero / Header ── */}
        <div className="jh-hero">
          <div className="jh-hero-content">
            <h1 className="jh-hero-title">Mindful Journal</h1>
            <p className="jh-hero-subtitle">
              Your safe space to reflect, process, and grow.<br />
              <span className="jh-hero-stats">{entries.length} {entries.length === 1 ? 'entry' : 'entries'} · {totalWords.toLocaleString()} words</span>
            </p>
          </div>
          <button className="jh-hero-btn" onClick={() => handleNewEntry(null)}>
            <Plus size={18} strokeWidth={2.5} />
            {todayEntry ? 'Edit Today\'s Entry' : 'Write a New Entry'}
          </button>
        </div>

        {/* ── Prompt of the Day (Glassmorphism card) ── */}
        <div
          className="jh-prompt-card"
          onClick={() => handleNewEntry({ selectedPrompt: "How has your perspective on a personal challenge shifted over the past week?" })}
        >
          <div className="jh-prompt-bg"></div>
          <div className="jh-prompt-content">
            <span className="jh-prompt-tag">Daily Reflection</span>
            <p className="jh-prompt-text">"How has your perspective on a personal challenge shifted over the past week?"</p>
            <div className="jh-prompt-cta">Respond thoughtfully <ChevronRight size={14} /></div>
          </div>
        </div>

        {/* ── Tabs & Content Area ── */}
        <div className="jh-content-area">
          <div className="jh-tabs">
            <button className={`jh-tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>
              <List size={16} /> Entries
            </button>
            <button className={`jh-tab ${view === 'calendar' ? 'active' : ''}`} onClick={() => setView('calendar')}>
              <Calendar size={16} /> Calendar
            </button>
          </div>

          <div className="jh-content">
            {/* ── Calendar View ── */}
            {view === 'calendar' && (
              <div className="jh-calendar-wrapper fade-in">
                <JournalCalendar
                  year={calYear}
                  month={calMonth}
                  activeDays={calDays}
                  onDayClick={handleCalDayClick}
                  onMonthChange={handleMonthChange}
                />
              </div>
            )}

            {/* ── List View ── */}
            {view === 'list' && (
              <div className="jh-list fade-in">
                {loading && <div className="jh-loading-pulse">Loading your reflections…</div>}
                {!loading && error && <div className="jh-empty jh-error">{error}</div>}

                {!loading && !error && entries.length === 0 && (
                  <div className="jh-empty-state">
                    <div className="jh-empty-icon"><BookOpen size={48} strokeWidth={1} /></div>
                    <h3>Your journal is empty</h3>
                    <p>Begin your mindfulness journey today.</p>
                    <button className="jh-empty-btn" onClick={() => handleNewEntry(null)}>
                      Start Writing
                    </button>
                  </div>
                )}

                {!loading && grouped.map(([dateStr, dayEntries]) => (
                  <div key={dateStr} className="jh-day-group">
                    <div className="jh-day-header">
                      <span className="jh-day-date">{formatDayLabel(dateStr)}</span>
                      <span className="jh-day-line"></span>
                    </div>

                    <div className="jh-cards-grid">
                      {dayEntries.map(entry => (
                        <div
                          key={entry._id}
                          className="jh-card"
                          onClick={() => navigate(`/dashboard/journaling/${entry._id}`)}
                        >
                          <div className="jh-card-inner">
                            <h3 className="jh-card-title">{entry.title || 'Untitled Entry'}</h3>
                            <p className="jh-card-preview">
                              {entry.body.slice(0, 120)}{entry.body.length > 120 ? '…' : ''}
                            </p>

                            <div className="jh-card-footer">
                              <span className="jh-card-time">{formatTime(entry.createdAt)}</span>
                              <div className="jh-card-actions">
                                {entry.wordCount > 0 && <span className="jh-card-words">{entry.wordCount} words</span>}
                                <button
                                  className="jh-card-delete"
                                  disabled={deleting === entry._id}
                                  onClick={(e) => handleDelete(e, entry._id)}
                                  aria-label="Delete entry"
                                >
                                  {deleting === entry._id ? '…' : <X size={14} />}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Accent bar on the side dependent on tags optionally */}
                          <div className="jh-card-accent"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default JournalingHome;