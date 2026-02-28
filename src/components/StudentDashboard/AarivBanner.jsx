import React from 'react';
import './AarivBanner.css';

const AarivBanner = () => {
    return (
        <section className="aariv-banner">
            <div className="aariv-content">
                <div className="aariv-pill">AI COMPANION</div>
                <h2 className="aariv-title">Talk to Aariv</h2>
                <p className="aariv-desc">
                    Secure, high-fidelity therapeutic dialogue tailored to your current biometric state and mental well-being goals.
                </p>
            </div>

            {/* Visual background lines */}
            <div className="aariv-bg-decor">
                <div className="decor-circle decor-1"></div>
                <div className="decor-circle decor-2"></div>
            </div>
        </section>
    );
};

export default AarivBanner;
