import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getCounsellorProfile, updateCounsellorProfile } from '../api/counsellorApi';
import { getAssignedStudentDashboard } from '../api/counsellorApi';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import './CounsellorDashboard.css';

const CounsellorDashboard = () => {
    const { user } = useAuth();
    const [profile, setProfile]           = useState(null);
    const [loading, setLoading]           = useState(true);
    const [selectedStudent, setSelected]  = useState(null);
    const [studentData, setStudentData]   = useState(null);
    const [studentLoading, setStudentLoading] = useState(false);
    const [editing, setEditing]           = useState(false);
    const [editForm, setEditForm]         = useState({ bio: '', specialization: '' });
    const [saveMsg, setSaveMsg]           = useState('');

    useEffect(() => {
        getCounsellorProfile()
            .then((res) => {
                setProfile(res.data.data);
                setEditForm({
                    bio: res.data.data.bio || '',
                    specialization: res.data.data.specialization || '',
                });
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const viewStudent = (student) => {
        setSelected(student);
        setStudentData(null);
        setStudentLoading(true);
        getAssignedStudentDashboard(student._id)
            .then((res) => setStudentData(res.data.data))
            .catch(() => setStudentData(null))
            .finally(() => setStudentLoading(false));
    };

    const saveProfile = async () => {
        try {
            const res = await updateCounsellorProfile(editForm);
            setProfile(res.data.data);
            setEditing(false);
            setSaveMsg('Profile updated!');
            setTimeout(() => setSaveMsg(''), 3000);
        } catch {
            setSaveMsg('Failed to save. Please try again.');
        }
    };

    if (loading) return <DashboardLayout><div className="cd-loading">Loading…</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="cd-page">

                {/* ── Profile Card ── */}
                <div className="cd-card cd-profile-card">
                    <div className="cd-profile-top">
                        <div className="cd-avatar">
                            <img src="https://i.pravatar.cc/150?img=12" alt="avatar" />
                        </div>
                        <div className="cd-profile-info">
                            <h2 className="cd-name">{user?.name || 'Counsellor'}</h2>
                            <p className="cd-email">{user?.email}</p>
                            <span className="cd-role-badge">Counsellor</span>
                        </div>
                        <button className="cd-edit-btn" onClick={() => setEditing(!editing)}>
                            {editing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {editing ? (
                        <div className="cd-edit-form">
                            <label>Specialization</label>
                            <input
                                value={editForm.specialization}
                                onChange={(e) => setEditForm({ ...editForm, specialization: e.target.value })}
                                placeholder="e.g. Anxiety, Academic Stress"
                            />
                            <label>Bio</label>
                            <textarea
                                value={editForm.bio}
                                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                placeholder="Tell students about yourself…"
                                rows={3}
                            />
                            <button className="cd-save-btn" onClick={saveProfile}>Save</button>
                            {saveMsg && <p className="cd-save-msg">{saveMsg}</p>}
                        </div>
                    ) : (
                        <div className="cd-profile-details">
                            <p><strong>Specialization:</strong> {profile?.specialization || 'Not set'}</p>
                            <p><strong>Bio:</strong> {profile?.bio || 'Not set'}</p>
                            {saveMsg && <p className="cd-save-msg">{saveMsg}</p>}
                        </div>
                    )}
                </div>

                {/* ── Assigned Students ── */}
                <div className="cd-card">
                    <h3 className="cd-section-title">Assigned Students
                        <span className="cd-count">{profile?.assignedStudents?.length || 0}</span>
                    </h3>

                    {!profile?.assignedStudents?.length ? (
                        <p className="cd-empty">No students assigned yet. Contact your admin.</p>
                    ) : (
                        <div className="cd-students-list">
                            {profile.assignedStudents.map((student) => (
                                <div
                                    key={student._id}
                                    className={`cd-student-item ${selectedStudent?._id === student._id ? 'active' : ''}`}
                                    onClick={() => viewStudent(student)}
                                >
                                    <div className="cd-student-avatar">
                                        {student.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="cd-student-info">
                                        <span className="cd-student-name">{student.name}</span>
                                        <span className="cd-student-email">{student.email}</span>
                                    </div>
                                    <span className="cd-view-arrow">›</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Student Dashboard Viewer ── */}
                {selectedStudent && (
                    <div className="cd-card cd-student-viewer">
                        <div className="cd-viewer-header">
                            <h3 className="cd-section-title">{selectedStudent.name}'s Dashboard</h3>
                            <button className="cd-close-btn" onClick={() => { setSelected(null); setStudentData(null); }}>✕</button>
                        </div>

                        {studentLoading ? (
                            <p className="cd-loading">Loading student data…</p>
                        ) : studentData ? (
                            <div className="cd-student-data">
                                <div className="cd-stat-row">
                                    <div className="cd-stat">
                                        <span className="cd-stat-label">Mood Score</span>
                                        <span className="cd-stat-value">{studentData.mentalStats?.moodScore ?? '—'}</span>
                                    </div>
                                    <div className="cd-stat">
                                        <span className="cd-stat-label">Stress Level</span>
                                        <span className="cd-stat-value">{studentData.mentalStats?.stressLevel ?? '—'}</span>
                                    </div>
                                    <div className="cd-stat">
                                        <span className="cd-stat-label">Last Check-in</span>
                                        <span className="cd-stat-value">
                                            {studentData.mentalStats?.lastCheckIn
                                                ? new Date(studentData.mentalStats.lastCheckIn).toLocaleDateString()
                                                : '—'}
                                        </span>
                                    </div>
                                </div>

                                <div className="cd-goals-section">
                                    <h4>Goals ({studentData.goals?.length || 0})</h4>
                                    {studentData.goals?.length ? (
                                        <ul className="cd-goals-list">
                                            {studentData.goals.map((g, i) => (
                                                <li key={i} className={g.completed ? 'completed' : ''}>
                                                    {g.completed ? '✓' : '○'} {g.title}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : <p className="cd-empty">No goals set yet.</p>}
                                </div>

                                <div className="cd-journal-section">
                                    <h4>Recent Journal Entries ({studentData.journalEntries?.length || 0})</h4>
                                    {studentData.journalEntries?.length ? (
                                        <div className="cd-journal-list">
                                            {studentData.journalEntries.slice(-3).reverse().map((entry, i) => (
                                                <div key={i} className="cd-journal-entry">
                                                    <p className="cd-journal-date">
                                                        {new Date(entry.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <p className="cd-journal-text">{entry.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <p className="cd-empty">No journal entries yet.</p>}
                                </div>
                            </div>
                        ) : (
                            <p className="cd-empty">Could not load student data.</p>
                        )}
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
};

export default CounsellorDashboard;
