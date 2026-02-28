import React from 'react';
import { Video, ChevronRight } from 'lucide-react';
import './ConnectCare.css';

const ConnectCare = () => {
    return (
        <section className="connect-care-section">
            <h2 className="section-title">APPOINTMENTS</h2>
            <div className="connect-care-card">
                <h3 className="connect-care-heading">Connect with Care</h3>

                <div className="booking-card">
                    <div className="booking-main">
                        <div className="booking-icon">
                            <Video size={20} color="#3B82F6" strokeWidth={2.5} />
                        </div>
                        <div className="booking-info">
                            <h4>Book Video/Chat Session</h4>
                            <p>Available therapists / times available</p>
                        </div>
                        <div className="booking-arrow">
                            <ChevronRight size={16} color="#CBD5E1" />
                        </div>
                    </div>
                </div>

                <div className="booking-footer">
                    <div className="therapist-avatars">
                        <img src="https://i.pravatar.cc/150?img=32" alt="Therapist" className="avatar-img" />
                        <img src="https://i.pravatar.cc/150?img=12" alt="Therapist" className="avatar-img" />
                        <img src="https://i.pravatar.cc/150?img=47" alt="Therapist" className="avatar-img" />
                    </div>
                    <div className="time-pill">
                        Mon 14:00 - 14:00
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectCare;
