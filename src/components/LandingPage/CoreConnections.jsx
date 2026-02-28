import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Diamond, ArrowUpRight } from 'lucide-react';
import './CoreConnections.css';

const Card = ({ icon: Icon, title, desc, linkText, to, color }) => (
    <div className="core-card">
        <div className="core-icon-container" style={{ backgroundColor: color }}>
            <Icon size={24} color="var(--color-primary)" />
        </div>
        <h3 className="core-card-title">{title}</h3>
        <p className="core-card-desc">{desc}</p>
        <Link to={to} className="core-link">
            {linkText} <ArrowUpRight size={16} />
        </Link>
    </div>
);

const CoreConnections = () => {
    return (
        <section className="core-connections-section">
            <div className="core-header">
                <h2 className="core-title">Core Connections</h2>
                <p className="core-desc">Three pillars of support designed to foster growth and positivity.</p>
            </div>

            <div className="cards-grid">
                <Card
                    icon={Briefcase}
                    title="Professional Care"
                    desc="Instant, confidential access to campus counselors for professional guidance when you need it."
                    linkText="Learn more"
                    to="#"
                    color="#F1F5F9"
                />
                <Card
                    icon={Users}
                    title="Peer Support"
                    desc="Safe, moderated spaces to share experiences with fellow students who walk the same paths."
                    linkText="Explore communities"
                    to="#"
                    color="#F8FAFC"
                />
                <Card
                    icon={Diamond}
                    title="Campus Harmony"
                    desc="Collaborating with university admin to evolve campus policies for a healthier student body."
                    linkText="Admin portal"
                    to="#"
                    color="#F8FAFC"
                />
            </div>
        </section>
    );
};

export default CoreConnections;