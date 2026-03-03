import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { logMood } from '../../api/moodApi';
import './MoodCheckIn.css';

const MOODS = [
  { score: 1, emoji: '😔', label: 'Awful'   },
  { score: 2, emoji: '😕', label: 'Bad'     },
  { score: 3, emoji: '😐', label: 'Okay'    },
  { score: 4, emoji: '😊', label: 'Good'    },
  { score: 5, emoji: '😄', label: 'Amazing' },
];

const toBackendScore = (rating) => rating * 2;

// Key is scoped to BOTH the user ID and today's date
// so each user gets their own independent daily check-in
const todayKey = (userId) => {
  const d = new Date();
  return `mood_checkin_${userId}_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
};

const MoodCheckIn = ({ onMoodLogged }) => {
  const { user } = useAuth();
  const [visible,  setVisible]  = useState(false);
  const [selected, setSelected] = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [done,     setDone]     = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    const alreadyDone = localStorage.getItem(todayKey(user.id));
    if (!alreadyDone) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [user?.id]);

  const handleSubmit = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await logMood(toBackendScore(selected));
      localStorage.setItem(todayKey(user.id), '1');
      setDone(true);
      if (onMoodLogged) onMoodLogged();
      setTimeout(() => setVisible(false), 1800);
    } catch {
      setSaving(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(todayKey(user.id), 'skipped');
    setVisible(false);
  };

  if (!visible) return null;

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="mci-overlay">
      <div className="mci-card">
        {!done ? (
          <>
            <div className="mci-top">
              <span className="mci-wave">👋</span>
              <h2 className="mci-greeting">
                {firstName}, how are you feeling today?
              </h2>
              <p className="mci-sub">Tap an emoji to log your mood</p>
            </div>

            <div className="mci-emojis">
              {MOODS.map((m) => (
                <button
                  key={m.score}
                  className={`mci-emoji-btn ${selected === m.score ? 'selected' : ''}`}
                  onClick={() => setSelected(m.score)}
                  type="button"
                >
                  <span className="mci-emoji">{m.emoji}</span>
                  <span className="mci-emoji-label">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="mci-actions">
              <button
                className="mci-submit"
                onClick={handleSubmit}
                disabled={!selected || saving}
              >
                {saving ? 'Saving…' : 'Log Mood'}
              </button>
              <button className="mci-skip" onClick={handleSkip} type="button">
                Skip for today
              </button>
            </div>
          </>
        ) : (
          <div className="mci-done">
            <span className="mci-done-emoji">
              {MOODS.find(m => m.score === selected)?.emoji}
            </span>
            <h2 className="mci-done-title">Mood logged!</h2>
            <p className="mci-done-sub">Your vitals have been updated.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodCheckIn;