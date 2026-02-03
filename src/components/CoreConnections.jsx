import React from 'react';
import { Briefcase, Users, Diamond, ArrowUpRight } from 'lucide-react';

const Card = ({ icon: Icon, title, desc, linkText, color }) => (
    <div style={{
        backgroundColor: 'white',
        padding: '2.5rem 2rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)', /* Subtle shadow */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        height: '100%'
    }}
        onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
    >
        <div style={{
            width: '56px', height: '56px',
            borderRadius: '50%',
            backgroundColor: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1rem'
        }}>
            <Icon size={24} color="#FF8C32" />
        </div>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.7', flex: 1 }}>{desc}</p>
        <a href="#" style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#FF8C32',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            marginTop: '1.5rem'
        }}>
            {linkText} <ArrowUpRight size={16} />
        </a>
    </div>
);

const CoreConnections = () => {
    return (
        <section style={{ padding: '6rem 5%', backgroundColor: 'var(--color-bg-cream)' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.5px' }}>Core Connections</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Three pillars of support designed to foster growth and positivity.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem'
            }}>
                <Card
                    icon={Briefcase}
                    title="Professional Care"
                    desc="Instant, confidential access to campus counselors for professional guidance when you need it."
                    linkText="Learn more"
                    color="#FFF0E6"
                />
                <Card
                    icon={Users}
                    title="Peer Support"
                    desc="Safe, moderated spaces to share experiences with fellow students who walk the same paths."
                    linkText="Explore communities"
                    color="#FFFBEB"
                />
                <Card
                    icon={Diamond}
                    title="Campus Harmony"
                    desc="Collaborating with university admin to evolve campus policies for a healthier student body."
                    linkText="Admin portal"
                    color="#FFFBEB"
                />
            </div>
        </section>
    );
};

export default CoreConnections;


// import React, { useState } from 'react';
// import { Briefcase, Users, Diamond, ArrowUpRight } from 'lucide-react';
// import './CoreConnections.css';

// const Card = ({ icon: Icon, title, desc, linkText, color, onClick }) => {
//     const [isHovered, setIsHovered] = useState(false);
    
//     return (
//         <div 
//             className={`core-card ${isHovered ? 'hovered' : ''}`}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             onClick={onClick}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
//         >
//             <div className="icon-container" style={{ backgroundColor: color }}>
//                 <Icon size={24} className="icon" />
//             </div>
//             <h3>{title}</h3>
//             <p>{desc}</p>
//             <a 
//                 className="card-link"
//                 aria-label={`Learn more about ${title}`}
//             >
//                 {linkText} <ArrowUpRight size={16} />
//             </a>
//         </div>
//     );
// };

// const CoreConnections = () => {
//     const cards = [
//         {
//             icon: Briefcase,
//             title: "Professional Care",
//             desc: "Instant, confidential access to campus counselors for professional guidance when you need it.",
//             linkText: "Learn more",
//             color: "#FFF0E6"
//         },
//         // ... other cards
//     ];
    
//     const handleCardClick = (cardTitle) => {
//         console.log(`Card clicked: ${cardTitle}`);
//         // Add navigation logic
//     };
    
//     return (
//         <section className="core-connections-section">
//             <div className="section-header">
//                 <h2>Core Connections</h2>
//                 <p>Three pillars of support designed to foster growth and positivity.</p>
//             </div>
            
//             <div className="cards-grid">
//                 {cards.map((card, index) => (
//                     <Card
//                         key={index}
//                         {...card}
//                         onClick={() => handleCardClick(card.title)}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default CoreConnections;