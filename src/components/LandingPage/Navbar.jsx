// import React from 'react';
// import { Menu } from 'lucide-react';

// const Navbar = () => {
//     return (
//         <nav style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '1.5rem 5%',
//             backgroundColor: 'var(--color-bg-cream)',
//             position: 'sticky',
//             top: 0,
//             zIndex: 100
//         }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                 <div style={{ width: '24px', height: '24px', backgroundColor: '#FFD1AA', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-primary)', borderRadius: '50%' }}></div>
//                 </div>
//                 <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px' }}>Vyannaid</span>
//             </div>

//             <div style={{ display: 'none', gap: '2rem', md: { display: 'flex' } }} className="desktop-menu">
//                 <a href="#" style={{ fontSize: '0.9rem', fontWeight: '500' }}>How it Works</a>
//                 <a href="#" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Community</a>
//                 <a href="#" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Insights</a>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
//                 <a href="#" style={{ fontSize: '0.9rem', fontWeight: '600' }}>Sign In</a>
//                 <button style={{
//                     backgroundColor: 'var(--color-primary)',
//                     color: 'white',
//                     padding: '0.6rem 1.4rem',
//                     borderRadius: '50px',
//                     fontWeight: '600',
//                     fontSize: '0.9rem',
//                     boxShadow: 'var(--shadow-md)',
//                     transition: 'background-color 0.2s',
//                     cursor: 'pointer'
//                 }}
//                     onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
//                     onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
//                 >
//                     Get Started
//                 </button>
//             </div>

//             <style>{`
//         @media (max-width: 768px) {
//           .desktop-menu { display: none !important; }
//         }
//         @media (min-width: 769px) {
//           .desktop-menu { display: flex !important; }
//         }
//       `}</style>
//         </nav>
//     );
// };

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo-dot"></div>
        <span>Vyannaid</span>
      </Link>

      <div className="nav-links">
        <a href="#" className="nav-link">How it Works</a>
        <a href="#" className="nav-link">Community</a>
        <a href="#" className="nav-link">Insights</a>
      </div>

      <div className="nav-actions">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="sign-in-btn">Sign In</Link>
            <Link to="/register" className="get-started-btn">Get Started</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
