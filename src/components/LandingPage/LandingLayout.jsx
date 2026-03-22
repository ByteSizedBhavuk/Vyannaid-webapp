
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingLayout = () => {
    const location = useLocation();
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    return (
        <div className="landing-layout" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: isAuthPage ? '100vh' : 'auto', /* Force full viewport on auth */
            minHeight: '100vh',
            overflow: isAuthPage ? 'hidden' : 'visible'
        }}>
            <Navbar />
            <main style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                minHeight: 0 /* Important for flex children scrolling if needed */
            }}>
                <Outlet />
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default LandingLayout;
