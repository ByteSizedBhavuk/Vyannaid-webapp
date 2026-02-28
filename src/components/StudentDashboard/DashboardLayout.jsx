
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ProfileSidebar from './ProfileSidebar';
import MobileBottomNav from './MobileBottomNav';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const closeProfile = () => setIsProfileOpen(false);

    return (
        <div className="dashboard-layout">
            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

            <ProfileSidebar isOpen={isProfileOpen} onClose={closeProfile} />

            <main className="dashboard-main">
                <Header toggleSidebar={toggleSidebar} toggleProfile={toggleProfile} />
                <div className="dashboard-content-wrapper">
                    {children}
                </div>
            </main>
            <MobileBottomNav />
        </div>
    );
};

export default DashboardLayout;
