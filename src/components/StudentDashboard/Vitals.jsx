import React from 'react';
import './Vitals.css';

const VitalItem = ({ value, label, percentage }) => (
    <div className="vital-item">
        <div className="vital-circle">
            <svg viewBox="0 0 100 100" className="vital-svg">
                {/* Background circle */}
                <circle cx="50" cy="50" r="46" stroke="#F1F5F9" strokeWidth="4" fill="none" />
                {/* Progress circle */}
                <circle
                    cx="50" cy="50" r="46"
                    stroke="#1A2234"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="289.02" /* 2 * pi * 46 */
                    strokeDashoffset={289.02 - (289.02 * percentage) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className="vital-inner">
                <span className="vital-value">{value}</span>
                <span className="vital-label">{label}</span>
            </div>
        </div>
    </div>
);

const Vitals = () => {
    return (
        <section className="vitals-section">
            <div className="vitals-header">
                <h2 className="section-title">HEALTH VITALS</h2>
                <a href="#history" className="history-link">History</a>
            </div>

            <div className="vitals-grid">
                <VitalItem value="22" label="STRESS" percentage={22} />
                <VitalItem value="84" label="MOOD" percentage={84} />
                <VitalItem value="91" label="REST" percentage={91} />
            </div>
        </section>
    );
};

export default Vitals;
