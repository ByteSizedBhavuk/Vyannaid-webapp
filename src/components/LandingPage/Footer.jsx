import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Globe, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-top">
                <div className="footer-logo-section">
                    <div className="footer-logo">
                        <div className="logo-icon">
                            <div className="logo-dot"></div>
                        </div>
                        <span className="logo-text">Vyannaid</span>
                    </div>
                    <p className="footer-desc">
                        Illuminating the path to mental wellbeing for students everywhere. Every sunrise is a new opportunity.
                    </p>
                </div>

                <div className="footer-links-column">
                    <h4>PLATFORM</h4>
                    <Link to="#" className="footer-link">How it Works</Link>
                    <Link to="#" className="footer-link">For Students</Link>
                    <Link to="#" className="footer-link">For Counselors</Link>
                    <Link to="#" className="footer-link">University Admin</Link>
                </div>

                <div className="footer-links-column">
                    <h4>RESOURCES</h4>
                    <Link to="#" className="footer-link">Support Center</Link>
                    <Link to="#" className="footer-link">Privacy Policy</Link>
                    <Link to="#" className="footer-link">Community Guidelines</Link>
                    <Link to="#" className="footer-link">Emergency Help</Link>
                </div>

                <div className="footer-links-column">
                    <h4>CONNECT</h4>
                    <div className="social-icons">
                        {[Instagram, Mail, Globe].map((Icon, idx) => (
                            <div key={idx} className="social-icon-wrapper">
                                <Icon size={18} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div>© 2026 Vyannaid. All rights reserved.</div>
                <div className="footer-bottom-links">
                    <span className="footer-bottom-link">Terms of Service</span>
                    <span className="footer-bottom-link">Privacy Settings</span>
                    <span className="footer-bottom-link">Cookie Policy</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
