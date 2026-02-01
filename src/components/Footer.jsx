import React from 'react';
import { Twitter, Instagram, Globe, Mail } from 'lucide-react';

const Footer = () => {
    const linkStyle = { color: '#666', fontSize: '0.9rem', marginBottom: '0.8rem', display: 'block', cursor: 'pointer' };
    const headingStyle = { fontSize: '0.8rem', fontWeight: '700', color: '#FF8C32', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' };

    return (
        <footer style={{ padding: '4rem 5% 2rem', backgroundColor: 'white' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '3rem',
                marginBottom: '4rem'
            }}>
                <div style={{ maxWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '24px', height: '24px', backgroundColor: '#FFD1AA', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '12px', height: '12px', backgroundColor: '#FF8C32', borderRadius: '50%' }}></div>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Vyannaid</span>
                    </div>
                    <p style={{ color: '#999', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Illuminating the path to mental wellbeing for students everywhere. Every sunrise is a new opportunity.
                    </p>
                </div>

                <div>
                    <h4 style={headingStyle}>PLATFORM</h4>
                    <a style={linkStyle}>How it Works</a>
                    <a style={linkStyle}>For Students</a>
                    <a style={linkStyle}>For Counselors</a>
                    <a style={linkStyle}>University Admin</a>
                </div>

                <div>
                    <h4 style={headingStyle}>RESOURCES</h4>
                    <a style={linkStyle}>Support Center</a>
                    <a style={linkStyle}>Privacy Policy</a>
                    <a style={linkStyle}>Community Guidelines</a>
                    <a style={linkStyle}>Emergency Help</a>
                </div>

                <div>
                    <h4 style={headingStyle}>CONNECT</h4>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[Instagram, Mail, Globe].map((Icon, idx) => (
                            <div key={idx} style={{
                                width: '36px', height: '36px',
                                backgroundColor: '#FFF0E6',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#FF8C32',
                                cursor: 'pointer'
                            }}>
                                <Icon size={18} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{
                borderTop: '1px solid #F0F0F0',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                color: '#999',
                fontSize: '0.8rem'
            }}>
                <div>© 2026 Vyannaid. All rights reserved.</div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <span>Terms of Service</span>
                    <span>Privacy Settings</span>
                    <span>Cookie Policy</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
