import React from 'react';
import { CheckCircle, Activity, Sun, ChevronRight } from 'lucide-react';

const GentleInsights = () => {
    return (
        <section style={{
            padding: '6rem 5%',
            backgroundColor: 'var(--color-bg-cream)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem'
        }}>
            <div className="insights-container" style={{ display: 'flex', alignItems: 'center', gap: '5%' }}>

                {/* Left Side: Visuals */}
                <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{
                        backgroundColor: '#FFF8EE',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        maxWidth: '450px',
                        position: 'relative'
                    }}>
                        {/* Abstract Layout for Visuals */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                flex: 1,
                                backgroundColor: '#FFFFFA',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <div style={{ color: '#FF8C32', marginBottom: '0.5rem' }}><Activity size={24} /></div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>IoT Integration</div>
                                <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>Sync your daily metrics...</div>
                            </div>

                            <div style={{
                                flex: 1,
                                backgroundColor: '#FFF5E0', /* Highlighted Box */
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <div style={{ color: '#FF8C32', marginBottom: '0.5rem' }}><Sun size={24} /></div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Fresh Start Metrics</div>
                                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>Visualizing your journey...</div>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: '#FFFFFA',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{ color: '#FF8C32', marginBottom: '0.5rem' }}><Activity size={24} /></div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>HIL Analysis</div>
                            <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>Context aware recognition...</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Text */}
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                        Gentle Insights for a <br /> Brighter Path
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.7' }}>
                        We use technology not to overwhelm, but to empower. By understanding your unique rhythms, SereneCampus helps you find balance and positivity in the fast-paced college environment.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <CheckCircle size={24} color="#FF8C32" fill="white" />
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Holistic Health Sync</h4>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Easily connect your preferred wearables for an integrated view.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <CheckCircle size={24} color="#FF8C32" fill="white" />
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Positivity Reports</h4>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Focus on growth with personalized insights that celebrate progress.</p>
                            </div>
                        </div>
                    </div>

                    <a href="#" style={{ color: '#FF8C32', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Explore your Dashboard <ChevronRight size={20} />
                    </a>
                </div>
            </div>

            <style>{`
        @media (max-width: 992px) {
          .insights-container {
            flex-direction: column;
            gap: 3rem;
          }
          .insights-container > div {
             width: 100%;
          }
        }
      `}</style>
        </section>
    );
};

export default GentleInsights;
