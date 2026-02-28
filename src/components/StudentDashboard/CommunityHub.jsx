import React from 'react';
import { ArrowRight } from 'lucide-react';
import './CommunityHub.css';

const CommunityHub = () => {
    return (
        <section className="community-hub-section">
            <h2 className="section-title">COMMUNITY HUB</h2>
            <div className="community-card">
                <div className="hub-item">
                    <h3>Announcements</h3>
                    <p>Summary: Join the Vyannaid community connections and resources information around your environment.</p>
                    <a href="#" className="hub-link">
                        Learn more about Announcements <ArrowRight size={14} />
                    </a>
                </div>
                <div className="hub-divider"></div>
                <div className="hub-item">
                    <h3>FAQs</h3>
                    <p>What are the roots and common recurring questions about our program?</p>
                    <a href="#" className="hub-link">
                        Learn more about community FAQs <ArrowRight size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CommunityHub;
