import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import './Header.css';

const Header = ({ toggleSidebar, toggleProfile }) => {
    const { user } = useAuth();
    const userName = user?.name || 'Alex Chen'; // Fallback to 'Alex Chen'

    return (
        <header className="dashboard-header">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
                <Menu size={24} color="#1A2234" />
            </button>

            <div className="header-spacer"></div>

            <div className="header-actions">
                <button className="notification-btn">
                    <Bell size={20} color="#64748B" />
                </button>

                <button className="user-profile-pill" onClick={toggleProfile}>
                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="profile-img" />
                    <span className="profile-name">{userName}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
