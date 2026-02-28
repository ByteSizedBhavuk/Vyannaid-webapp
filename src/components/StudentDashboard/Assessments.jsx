import React from 'react';
import './Assessments.css';

const Assessments = () => {
    return (
        <section className="assessments-section">
            <h2 className="section-title">ASSESSMENTS</h2>
            <div className="assessment-card">
                <span className="assessment-text">Take an Assessment - Screen for mental health conditions</span>
                <button className="assessment-btn">Take an Assessment</button>
            </div>
        </section>
    );
};

export default Assessments;
