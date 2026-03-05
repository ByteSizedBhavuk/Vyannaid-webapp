

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Check, X, GraduationCap } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { getProfile, updateProfile } from '../api/profileApi';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import './ProfilePage.css';

const AVATAR_COLORS = [
  '#1A2234', '#4F46E5', '#0891B2', '#059669',
  '#D97706', '#DC2626', '#9333EA', '#DB2777',
];

const getInitials = (name = '') =>
  name.trim().split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

// Derive current study year from the year the course started
const getCurrentYear = (startYear) => {
  if (!startYear) return null;
  const yr = new Date().getFullYear() - Number(startYear) + 1;
  return yr > 0 ? yr : null;
};

// Year options: next year down to 12 years ago
const YEAR_OPTIONS = Array.from({ length: 13 }, (_, i) => new Date().getFullYear() + 1 - i);

const ProfilePage = () => {
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const [profile,  setProfile]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [editing,  setEditing]  = useState(false);
  const [toast,    setToast]    = useState(null);
  const [form,     setForm]     = useState({
    name: '', bio: '', avatarColor: AVATAR_COLORS[0],
    institution: '', course: '', courseStartYear: '',
  });

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const toForm = (d) => ({
    name:            d.name            || '',
    bio:             d.bio             || '',
    avatarColor:     d.avatarColor     || AVATAR_COLORS[0],
    institution:     d.institution     || '',
    course:          d.course          || '',
    courseStartYear: d.courseStartYear ? String(d.courseStartYear) : '',
  });

  useEffect(() => {
    getProfile()
      .then(res => {
        const d = res.data.data;
        setProfile(d);
        setForm(toForm(d));
      })
      .catch(() => showToast('Failed to load profile', true))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (form.name.trim().length < 2)
      return showToast('Name must be at least 2 characters', true);
    setSaving(true);
    try {
      const res = await updateProfile(form);
      const d = res.data.data;
      setProfile(d);
      setForm(toForm(d));
      updateUser({
        name:            d.name,
        avatarColor:     d.avatarColor || AVATAR_COLORS[0],
        institution:     d.institution,
        course:          d.course,
        courseStartYear: d.courseStartYear,
      });
      setEditing(false);
      showToast('Profile saved!');
    } catch {
      showToast('Failed to save profile', true);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) setForm(toForm(profile));
    setEditing(false);
  };

  const displayColor = editing
    ? (form.avatarColor || AVATAR_COLORS[0])
    : (profile?.avatarColor || AVATAR_COLORS[0]);
  const displayInitials = getInitials(editing ? form.name : profile?.name);

  if (loading) return (
    <DashboardLayout>
      <div className="pp-loading">Loading profile…</div>
    </DashboardLayout>
  );

  const currentYear = getCurrentYear(profile?.courseStartYear);

  return (
    <DashboardLayout>
      <div className="pp-page">

        {toast && (
          <div className={`pp-toast${toast.isError ? ' pp-toast-error' : ''}`}>
            {toast.msg}
          </div>
        )}

        {/* Header */}
        <div className="pp-header">
          <button className="pp-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="pp-title">My Profile</h1>
            <p className="pp-subtitle">Manage your personal information</p>
          </div>
        </div>

        {/* Nudge */}
        {!editing && (!profile?.institution || !profile?.course) && (
          <div className="pp-nudge">
            <GraduationCap size={16} strokeWidth={2.5} />
            <span>Add your institution and course to unlock personalised community features.</span>
            <button className="pp-nudge-btn" onClick={() => setEditing(true)}>Add now</button>
          </div>
        )}

        {/* Main card */}
        <div className="pp-card">

          {/* Avatar + swatches */}
          <div className="pp-avatar-section">
            <div className="pp-avatar" style={{ background: displayColor }}>
              {displayInitials}
            </div>
            {editing && (
              <div className="pp-swatches">
                {AVATAR_COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`pp-swatch${form.avatarColor === c ? ' pp-swatch-active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setForm(f => ({ ...f, avatarColor: c }))}
                  >
                    {form.avatarColor === c && <Check size={10} color="white" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!editing ? (
            /* ── View mode ── */
            <div className="pp-view">
              <div className="pp-view-top">
                <div>
                  <h2 className="pp-name">{profile?.name}</h2>
                  <p className="pp-email">{profile?.email}</p>
                </div>
                <span className="pp-role-badge">{profile?.role}</span>
              </div>

              {profile?.bio && <p className="pp-bio">"{profile.bio}"</p>}

              {(profile?.institution || profile?.course) && (
                <div className="pp-chips">
                  {profile.institution && (
                    <span className="pp-chip pp-chip-blue">{profile.institution}</span>
                  )}
                  {profile.course && (
                    <span className="pp-chip">{profile.course}</span>
                  )}
                  {currentYear && (
                    <span className="pp-chip pp-chip-year">Year {currentYear}</span>
                  )}
                </div>
              )}

              <div className="pp-card-divider" />

              {[
                ['Email',        profile?.email],
                ['Role',         profile?.role],
                ['Institution',  profile?.institution  || '—'],
                ['Course',       profile?.course       || '—'],
                ['Started in',   profile?.courseStartYear ? String(profile.courseStartYear) : '—'],
                ['Current year', currentYear ? `Year ${currentYear}` : '—'],
                ['Member since', profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
                  : '—'],
              ].map(([label, value], i, arr) => (
                <React.Fragment key={label}>
                  <div className="pp-row">
                    <span className="pp-row-label">{label}</span>
                    <span className="pp-row-value">{value}</span>
                  </div>
                  {i < arr.length - 1 && <div className="pp-row-divider" />}
                </React.Fragment>
              ))}

              <button className="pp-edit-btn" onClick={() => setEditing(true)}>
                <Pencil size={14} />
                Edit Profile
              </button>
            </div>
          ) : (
            /* ── Edit mode ── */
            <div className="pp-form">
              <div className="pp-field">
                <label className="pp-label">NAME</label>
                <input className="pp-input" value={form.name} maxLength={60}
                  placeholder="Your full name"
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>

              <div className="pp-field">
                <label className="pp-label">BIO <span className="pp-opt">optional</span></label>
                <textarea className="pp-input pp-textarea" value={form.bio} rows={2} maxLength={300}
                  placeholder="A short note about yourself…"
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
                <span className="pp-count">{form.bio.length} / 300</span>
              </div>

              <div className="pp-field">
                <label className="pp-label">INSTITUTION <span className="pp-opt">optional</span></label>
                <input className="pp-input" value={form.institution} maxLength={150}
                  placeholder="e.g. University of Delhi"
                  onChange={e => setForm(f => ({ ...f, institution: e.target.value }))} />
              </div>

              <div className="pp-two-col">
                <div className="pp-field">
                  <label className="pp-label">COURSE <span className="pp-opt">optional</span></label>
                  <input className="pp-input" value={form.course} maxLength={100}
                    placeholder="e.g. B.Sc. Psychology"
                    onChange={e => setForm(f => ({ ...f, course: e.target.value }))} />
                </div>
                <div className="pp-field pp-year-field">
                  <label className="pp-label">STARTED IN</label>
                  <select className="pp-input pp-select" value={form.courseStartYear}
                    onChange={e => setForm(f => ({ ...f, courseStartYear: e.target.value }))}>
                    <option value="">—</option>
                    {YEAR_OPTIONS.map(y => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </select>
                  {/* Show computed current year live as user picks */}
                  {form.courseStartYear && (
                    <span className="pp-year-hint">
                      → Currently Year {getCurrentYear(form.courseStartYear)}
                    </span>
                  )}
                </div>
              </div>

              <div className="pp-form-actions">
                <button className="pp-save-btn" onClick={handleSave} disabled={saving}>
                  <Check size={14} />
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button className="pp-cancel-btn" onClick={handleCancel}>
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;