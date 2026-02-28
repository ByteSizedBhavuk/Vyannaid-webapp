import React from 'react';
import { Home, Activity, Calendar, Users, Bot } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
    const location = useLocation();

    // Helper function to check if a route is active
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="mobile-bottom-nav">
            <Link to="/dashboard/appointments" className={`nav-item ${isActive('/dashboard/appointments') ? 'active' : ''}`}>
                <Calendar size={isActive('/dashboard/appointments') ? 28 : 24} />
                <span>Care</span>
            </Link>

            <Link to="/dashboard/analytics" className={`nav-item ${isActive('/dashboard/analytics') ? 'active' : ''}`}>
                <Activity size={isActive('/dashboard/analytics') ? 28 : 24} />
                <span>Vitals</span>
            </Link>

            {/* Center "Home" Floating Button */}
            <Link to="/dashboard/student" className={`nav-item center-button ${isActive('/dashboard/student') ? 'active' : ''}`}>
                <div className="center-circle">
                    <Home size={28} />
                </div>
                <span>Home</span>
            </Link>

            <Link to="/dashboard/activities" className={`nav-item ${isActive('/dashboard/activities') ? 'active' : ''}`}>
                <Bot size={isActive('/dashboard/activities') ? 28 : 24} />
                <span>AI Care</span>
            </Link>

            <Link to="/dashboard/community" className={`nav-item ${isActive('/dashboard/community') ? 'active' : ''}`}>
                <Users size={isActive('/dashboard/community') ? 28 : 24} />
                <span>Comm</span>
            </Link>
        </nav>
    );
};

export default MobileBottomNav;
