import React from 'react';
import { ArrowRight, Play, Sun } from 'lucide-react';
import heroImage from '../assets/hero-image.png';

const Hero = () => {
    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 5%',
            backgroundColor: 'var(--color-bg-cream)',
            gap: '3rem',
            minHeight: '90vh', // Ensure it takes mostly full screen
            position: 'relative'
        }}>
            <div className="hero-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '600px', paddingTop: '2rem' }}>
                <div style={{
                    display: 'inline-block',
                    backgroundColor: '#FFE8D6',
                    color: '#FF8C32',
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '1.5rem',
                    alignSelf: 'flex-start'
                }}>
                    New Dawn for Campus Wellness
                </div>

                <h1 style={{
                    fontSize: '4rem',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    letterSpacing: '-1.5px'
                }}>
                    Your Mental Wellbeing, <br />
                    <span style={{ color: '#FF8C32' }}>Connected.</span>
                </h1>

                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-muted)',
                    marginBottom: '2.5rem',
                    maxWidth: '480px',
                    lineHeight: '1.7'
                }}>
                    A holistic support system for students, powered by meaningful community connections and proactive smart insights. Start your fresh chapter today.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <button style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        Join the Community <ArrowRight size={20} />
                    </button>

                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        backgroundColor: 'white',
                        fontWeight: '600',
                        fontSize: '1rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            backgroundColor: '#FFF0E6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FF8C32'
                        }}>
                            <Play size={14} fill="#FF8C32" />
                        </div>
                        Watch Story
                    </button>
                </div>
            </div>

            <div className="hero-image-container" style={{ flex: 1, position: 'relative' }}>
                <img
                    src={heroImage}
                    alt="Students on campus"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 'var(--radius-lg)', /* Top right rounded */
                        borderBottomLeftRadius: 'var(--radius-lg)',
                        borderBottomRightRadius: 'var(--radius-lg)',
                        borderTopLeftRadius: '120px', /* Distinctive shape from design */
                        objectFit: 'cover',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                />

                {/* Floating Card */}
                <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '40px',
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    maxWidth: '240px'
                }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF9E6', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Sun size={20} color="#FFB84D" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>Daily Positivity Score</div>
                        <div style={{ height: '4px', width: '100px', backgroundColor: '#F0F0F0', borderRadius: '2px' }}>
                            <div style={{ height: '100%', width: '75%', backgroundColor: '#FFB84D', borderRadius: '2px' }}></div>
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#999', marginTop: '0.2rem' }}>Community wellness is soaring today</div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (min-width: 992px) {
          section {
            flex-direction: row !important;
            align-items: center;
          }
        }
        @media (max-width: 768px) {
          h1 { font-size: 2.5rem !important; }
        }
      `}</style>
        </section>
    );
};

export default Hero;
