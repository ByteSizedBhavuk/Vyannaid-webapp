import React from 'react';
import { X, User, Info, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfileSidebar.css';

const ProfileSidebar = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        onClose();
    };

    const menuItems = [
        { icon: User, label: 'Profile', action: () => console.log('Profile clicked') },
        { icon: Info, label: 'About', action: () => console.log('About clicked') },
        { icon: HelpCircle, label: 'Help', action: () => console.log('Help clicked') },
    ];

    if (!isOpen) return null;

    return (
        <div className="profile-sidebar-overlay" onClick={onClose}>
            <div className="profile-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="profile-sidebar-header">
                    <h2>Profile</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="profile-info">
                    <div className="profile-avatar-large">
                        <img src={user?.avatar || "https://i.pravatar.cc/150?img=11"} alt="Profile" />
                    </div>
                    <h3>{user?.name || 'User Name'}</h3>
                    <p>{user?.email || 'user@example.com'}</p>
                </div>

                <div className="profile-menu">
                    {menuItems.map((item, index) => (
                        <button key={index} className="menu-item" onClick={item.action}>
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                <div className="profile-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
