
import React from 'react';
import { ClipboardList, Users, HeartHandshake } from 'lucide-react';
import './RightPanel.css';

const Widget = ({ icon: Icon, title, desc, action, color, bg, isSpecial }) => (
    <div className={`right-widget ${isSpecial ? 'volunteer-widget' : ''}`}>
        <div className="right-widget-header">
            <div className="widget-icon" style={{ backgroundColor: bg, color: color }}>
                <Icon size={20} />
            </div>
            <div className="widget-content">
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
        </div>
        <div className="widget-action" style={{ color: isSpecial ? '' : color }}>{action}</div>
    </div>
);

const RightPanel = () => {
    return (
        <div className="dashboard-right-column">
            <div className="section-title">Connect with Care</div> {/* Reusing title style or handling separately */}

            <Widget
                icon={ClipboardList}
                title="Assessment"
                desc="Weekly screening"
                action="START NOW"
                color="#26A69A"
                bg="#E0F2F1"
            />

            <Widget
                icon={Users}
                title="Community"
                desc="Join Hub"
                action="EXPLORE"
                color="#FF7043"
                bg="#FFEBEE"
            />

            {/* Volunteer Widget - styled differently */}
            <Widget
                icon={HeartHandshake}
                title="Volunteer"
                desc="Join our peer network"
                action="APPLY"
                color="#00695C"
                bg="#B2DFDB"
                isSpecial={true}
            />
        </div>
    );
};

export default RightPanel;
