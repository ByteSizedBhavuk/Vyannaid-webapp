import React from 'react';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import { ShieldCheck, Users, Heart, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './VolunteerApplication.css';

const VolunteerApplication = () => {
    const navigate = useNavigate();
    const steps = [
        {
            icon: <MessageSquare size={24} />,
            title: "Application",
            description: "Tell us about your background, interests, and why you want to support fellow students."
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Vetting & Training",
            description: "Participate in mandatory training sessions covering active listening, ethics, and boundaries."
        },
        {
            icon: <Heart size={24} />,
            title: "Start Supporting",
            description: "Join the community and begin making a real difference in others' mental well-being."
        }
    ];

    return (
        <DashboardLayout>
            <div className="va-container">
                {/* Hero Section */}
                <div className="va-hero">
                    <div className="va-hero-content">
                        <div className="va-badge">
                            <ShieldCheck size={14} />
                            <span>VOLLUNTEER PROGRAM</span>
                        </div>
                        <h1 className="va-title">Support. Listen. <span className="text-gradient">Empower.</span></h1>
                        <p className="va-subtitle">
                            Become a Peer Volunteer and help build a safer, more supportive space for mental health within our student community.
                        </p>
                        <button className="va-primary-btn" onClick={() => navigate("/dashboard/volunteer/apply")}>
                            Apply Now <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="va-grid">
                    <div className="va-info-card va-how-it-works">
                        <h2 className="va-section-title">How it Works</h2>
                        <div className="va-steps">
                            {steps.map((step, idx) => (
                                <div key={idx} className="va-step">
                                    <div className="va-step-icon">{step.icon}</div>
                                    <div className="va-step-text">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                    {idx < steps.length - 1 && <div className="va-step-divider" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="va-side-col">
                        <div className="va-info-card va-requirements">
                            <h2 className="va-section-title">Who can join?</h2>
                            <ul className="va-list">
                                <li>
                                    <CheckCircle2 size={18} className="va-check" />
                                    <span>Registered students of all levels</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={18} className="va-check" />
                                    <span>Empathetic and non-judgmental</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={18} className="va-check" />
                                    <span>Committed to confidentiality</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={18} className="va-check" />
                                    <span>Willing to learn and grow</span>
                                </li>
                            </ul>
                        </div>

                        <div className="va-info-card va-chat-cta">
                            <div className="va-cta-inner">
                                <Users size={32} />
                                <h3>Have Questions?</h3>
                                <p>Chat with our lead coordinators to learn more about the program.</p>
                                <button className="va-secondary-btn">Ask Coordinator</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VolunteerApplication;
