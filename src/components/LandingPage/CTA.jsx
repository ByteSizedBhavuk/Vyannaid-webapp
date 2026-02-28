import React from 'react';
import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                {/* Background Sun Accent */}
                <Sun
                    size={200}
                    color="#FFC978"
                    className="cta-sun-accent"
                />

                <h2 className="cta-heading">
                    Ready to wake up to a <br /> healthier campus?
                </h2>

                <p className="cta-desc">
                    Join thousands of students who have started their journey towards mental brightness. Available now at 45 universities.
                </p>

                <div className="cta-buttons">
                    <Link to="/register" className="btn-cta-primary">
                        Create Free Account
                    </Link>

                    <button className="btn-cta-secondary">
                        For Universities
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
