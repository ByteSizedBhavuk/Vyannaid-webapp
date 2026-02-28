import React from 'react';
import { Wind, Anchor, Headphones, Book, ChevronRight } from 'lucide-react';
import './DailyActivities.css';

const ActivityCard = ({ icon: Icon, title, meta }) => (
    <div className="activity-card">
        <div className="activity-icon-area">
            <div className="activity-icon-circle">
                <Icon size={20} strokeWidth={2} />
            </div>
        </div>
        <div className="activity-textual">
            <h3 className="activity-title">{title}</h3>
            <p className="activity-meta">{meta}</p>
        </div>
        <div className="activity-arrow">
            <ChevronRight size={16} color="#CBD5E1" />
        </div>
    </div>
);

const DailyActivities = () => {
    return (
        <section className="activities-section">
            <div className="activities-header">
                <h2 className="section-title">DAILY PRACTICES</h2>
            </div>

            <div className="activities-list">
                <ActivityCard
                    icon={Wind}
                    title="Controlled Respiration"
                    meta="5m • Calibrate response"
                />
                <ActivityCard
                    icon={Anchor}
                    title="Meditation"
                    meta="10m • Guided"
                />
                <ActivityCard
                    icon={Headphones}
                    title="Calm Music"
                    meta="e.g. • Playlist"
                />
                <ActivityCard
                    icon={Book}
                    title="Journaling"
                    meta="e.g. • Reflect"
                />
            </div>
        </section>
    );
};

export default DailyActivities;
