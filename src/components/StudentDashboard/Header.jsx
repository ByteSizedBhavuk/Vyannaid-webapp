import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import './Header.css';

const Header = ({ toggleSidebar, toggleProfile }) => {
    const { user } = useAuth();
    const userName = user?.name || 'Alex Chen'; // Fallback to 'Alex Chen'

    return (
        <header className="dashboard-header">
            {/* Mobile: Settings and Notifications on the left */}
            <div className="header-left-actions desktop-hide">
                <button className="settings-btn-mobile">
                    <Settings size={20} color="#64748B" />
                </button>
                <button className="notification-btn">
                    <Bell size={20} color="#64748B" />
                </button>
            </div>

            <div className="header-spacer"></div>

            <div className="header-actions">
                <button className="settings-btn mobile-hide">
                    <Settings size={20} color="#64748B" />
                </button>
                <button className="notification-btn mobile-hide">
                    <Bell size={20} color="#64748B" />
                </button>

                {/* Vyannaid text for mobile */}
                <div className="vyannaid-mobile-logo desktop-hide">
                    Vyannaid
                </div>

                <button className="user-profile-pill" onClick={toggleProfile}>
                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="profile-img" />
                </button>
            </div>
        </header>
    );
};

export default Header;
