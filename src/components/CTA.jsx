import React from 'react';
import { Sun } from 'lucide-react';

const CTA = () => {
    return (
        <section style={{ padding: '0 5% 6rem', backgroundColor: 'var(--color-bg-cream)' }}>
            <div style={{
                background: 'linear-gradient(135deg, #FF9F1C 0%, #FFB74D 100%)',
                borderRadius: '32px',
                padding: '5rem 2rem',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)'
            }}>
                {/* Background Sun Accent */}
                <Sun
                    size={200}
                    color="#FFC978"
                    style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.3 }}
                />

                <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem', position: 'relative', zIndex: 1, color: 'white' }}>
                    Ready to wake up to a <br /> healthier campus?
                </h2>

                <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem', position: 'relative', zIndex: 1, opacity: 0.9 }}>
                    Join thousands of students who have started their journey towards mental brightness. Available now at 45 universities.
                </p>

                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <button style={{
                        backgroundColor: 'white',
                        color: '#FF8C32',
                        padding: '1rem 2.5rem',
                        borderRadius: '50px',
                        fontWeight: '700',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}>
                        Create Free Account
                    </button>

                    <button style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: '2px solid rgba(255,255,255,0.4)',
                        padding: '1rem 2.5rem',
                        borderRadius: '50px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'background-color 0.2s'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        For Universities
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
