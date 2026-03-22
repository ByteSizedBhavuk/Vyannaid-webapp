import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import './Header.css';

const Header = ({ toggleSidebar, toggleProfile }) => {
    const { user } = useAuth();
    const userName = user?.name || 'Alex Chen'; // Fallback to 'Alex Chen'


const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);



    return (
        <header className="dashboard-header">
            {/* Left Actions: Settings (Mobile Only) */}
            <div className="header-left-actions desktop-hide">
                <button className="settings-btn-mobile">
                    <Settings size={20} color="#64748B" />
                </button>
            </div>

            {/* Center Logo (Mobile Only - Positioned absolutely in CSS) */}
            <div className="vyannaid-mobile-logo desktop-hide">
                Vyannaid
            </div>

            <div className="header-spacer mobile-hide"></div>

            <div className="header-actions">
                <button className="settings-btn mobile-hide">
                    <Settings size={20} color="#64748B" />
                </button>
                <button className="notification-btn">
                    <Bell size={20} color="#64748B" />
                </button>

                <button className="user-profile-pill" onClick={toggleProfile}>
                    <div
                        className="profile-avatar"
                        style={{ background: user?.avatarColor || "#4F46E5" }}
                    >
                         {getInitials(user?.name)}
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Header;
