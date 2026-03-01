import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import {
    getPlatformStats, getAllUsers, changeUserRole,
    deleteUser, assignStudentToCounsellor
} from '../api/adminApi';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import './AdminDashboard.css';

const ROLES = ['student', 'counsellor', 'admin'];

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats]       = useState(null);
    const [users, setUsers]       = useState([]);
    const [roleFilter, setFilter] = useState('');
    const [loading, setLoading]   = useState(true);
    const [toast, setToast]       = useState('');

    // Assign modal state
    const [assignModal, setAssignModal]     = useState(false);
    const [counsellors, setCounsellors]     = useState([]);
    const [students, setStudents]           = useState([]);
    const [assignForm, setAssignForm]       = useState({ counsellorId: '', studentId: '' });

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const loadData = (filter = roleFilter) => {
        setLoading(true);
        Promise.all([
            getPlatformStats(),
            getAllUsers(filter || undefined),
        ])
            .then(([statsRes, usersRes]) => {
                setStats(statsRes.data.data);
                setUsers(usersRes.data.data);
            })
            .catch(() => showToast('Failed to load data.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadData(); }, []);

    const handleFilterChange = (f) => {
        setFilter(f);
        loadData(f);
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await changeUserRole(userId, newRole);
            showToast('Role updated successfully.');
            loadData();
        } catch {
            showToast('Failed to update role.');
        }
    };

    const handleDelete = async (userId, name) => {
        if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
        try {
            await deleteUser(userId);
            showToast(`${name} deleted.`);
            loadData();
        } catch {
            showToast('Failed to delete user.');
        }
    };

    const openAssignModal = async () => {
        const [cRes, sRes] = await Promise.all([
            getAllUsers('counsellor'), getAllUsers('student')
        ]);
        setCounsellors(cRes.data.data);
        setStudents(sRes.data.data);
        setAssignModal(true);
    };

    const submitAssign = async () => {
        if (!assignForm.counsellorId || !assignForm.studentId) {
            return showToast('Please select both a counsellor and a student.');
        }
        try {
            await assignStudentToCounsellor(assignForm.counsellorId, assignForm.studentId);
            showToast('Student assigned successfully.');
            setAssignModal(false);
            setAssignForm({ counsellorId: '', studentId: '' });
        } catch (err) {
            showToast(err.response?.data?.message || 'Assignment failed.');
        }
    };

    return (
        <DashboardLayout>
            <div className="ad-page">

                {/* Toast */}
                {toast && <div className="ad-toast">{toast}</div>}

                {/* Header */}
                <div className="ad-header">
                    <div>
                        <h1 className="ad-title">Admin Dashboard</h1>
                        <p className="ad-subtitle">Welcome, {user?.name}</p>
                    </div>
                    <button className="ad-assign-btn" onClick={openAssignModal}>
                        + Assign Student
                    </button>
                </div>

                {/* Stats Row */}
                {stats && (
                    <div className="ad-stats-row">
                        {[
                            { label: 'Total Users',       value: stats.totalUsers },
                            { label: 'Students',          value: stats.totalStudents },
                            { label: 'Counsellors',       value: stats.totalCounsellors },
                            { label: 'Admins',            value: stats.totalAdmins },
                        ].map((s) => (
                            <div key={s.label} className="ad-stat-card">
                                <span className="ad-stat-value">{s.value}</span>
                                <span className="ad-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Users Table */}
                <div className="ad-card">
                    <div className="ad-table-header">
                        <h3 className="ad-section-title">Users</h3>
                        <div className="ad-filter-tabs">
                            {['', 'student', 'counsellor', 'admin'].map((r) => (
                                <button
                                    key={r}
                                    className={`ad-filter-tab ${roleFilter === r ? 'active' : ''}`}
                                    onClick={() => handleFilterChange(r)}
                                >
                                    {r || 'All'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <p className="ad-loading">Loading…</p>
                    ) : users.length === 0 ? (
                        <p className="ad-empty">No users found.</p>
                    ) : (
                        <div className="ad-table-wrapper">
                            <table className="ad-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u._id}>
                                            <td className="ad-td-name">
                                                <div className="ad-user-avatar">
                                                    {u.name?.charAt(0).toUpperCase()}
                                                </div>
                                                {u.name}
                                            </td>
                                            <td className="ad-td-email">{u.email}</td>
                                            <td>
                                                {/* Prevent admin from changing their own role */}
                                                {u._id === user?.id ? (
                                                    <span className={`ad-role-badge ${u.role}`}>{u.role}</span>
                                                ) : (
                                                    <select
                                                        className="ad-role-select"
                                                        value={u.role}
                                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                    >
                                                        {ROLES.map((r) => (
                                                            <option key={r} value={r}>{r}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </td>
                                            <td className="ad-td-date">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {u._id !== user?.id && (
                                                    <button
                                                        className="ad-delete-btn"
                                                        onClick={() => handleDelete(u._id, u.name)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Assign Modal */}
                {assignModal && (
                    <div className="ad-modal-overlay" onClick={() => setAssignModal(false)}>
                        <div className="ad-modal" onClick={(e) => e.stopPropagation()}>
                            <h3 className="ad-modal-title">Assign Student to Counsellor</h3>

                            <label className="ad-modal-label">Counsellor</label>
                            <select
                                className="ad-modal-select"
                                value={assignForm.counsellorId}
                                onChange={(e) => setAssignForm({ ...assignForm, counsellorId: e.target.value })}
                            >
                                <option value="">Select counsellor…</option>
                                {counsellors.map((c) => (
                                    <option key={c._id} value={c._id}>{c.name} — {c.email}</option>
                                ))}
                            </select>

                            <label className="ad-modal-label">Student</label>
                            <select
                                className="ad-modal-select"
                                value={assignForm.studentId}
                                onChange={(e) => setAssignForm({ ...assignForm, studentId: e.target.value })}
                            >
                                <option value="">Select student…</option>
                                {students.map((s) => (
                                    <option key={s._id} value={s._id}>{s.name} — {s.email}</option>
                                ))}
                            </select>

                            <div className="ad-modal-actions">
                                <button className="ad-modal-cancel" onClick={() => setAssignModal(false)}>Cancel</button>
                                <button className="ad-modal-confirm" onClick={submitAssign}>Assign</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
