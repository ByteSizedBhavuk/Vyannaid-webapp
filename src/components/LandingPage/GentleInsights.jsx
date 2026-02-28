import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Activity, Sun, ChevronRight } from 'lucide-react';
import './GentleInsights.css';

const GentleInsights = () => {
    return (
        <section className="gentle-insights-section">
            <div className="insights-container">

                {/* Left Side: Visuals */}
                <div className="visuals-container">
                    <div className="visuals-wrapper">
                        {/* Abstract Layout for Visuals */}
                        <div className="visuals-row">
                            <div className="visual-card">
                                <div className="visual-icon"><Activity size={24} /></div>
                                <div className="visual-title">IoT Integration</div>
                                <div className="visual-desc">Sync your daily metrics...</div>
                            </div>

                            <div className="visual-card highlight">
                                <div className="visual-icon"><Sun size={24} /></div>
                                <div className="visual-title">Fresh Start Metrics</div>
                                <div className="visual-desc">Visualizing your journey...</div>
                            </div>
                        </div>

                        <div className="visual-card">
                            <div className="visual-icon"><Activity size={24} /></div>
                            <div className="visual-title">ML-based analytics</div>
                            <div className="visual-desc">Predictive Mental Health Analytics...</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Text */}
                <div className="text-container">
                    <h2 className="insights-heading">
                        Gentle Insights for a <br /> Brighter Path
                    </h2>
                    <p className="insights-description">
                        We use technology not to overwhelm, but to empower. By understanding your unique rhythms, SereneCampus helps you find balance and positivity in the fast-paced college environment.
                    </p>

                    <div className="features-list">
                        <div className="feature-item">
                            <CheckCircle size={24} color="var(--color-primary)" fill="white" />
                            <div>
                                <h4 className="feature-title">Holistic Health Sync</h4>
                                <p className="feature-desc">Easily connect your preferred wearables for an integrated view.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <CheckCircle size={24} color="var(--color-primary)" fill="white" />
                            <div>
                                <h4 className="feature-title">Positivity Reports</h4>
                                <p className="feature-desc">Focus on growth with personalized insights that celebrate progress.</p>
                            </div>
                        </div>
                    </div>

                    <Link to="/register" className="explore-link">
                        Explore Dashboard <ChevronRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GentleInsights;
