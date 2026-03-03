// import React, { useEffect, useState } from 'react';
// import { getMoodStats } from '../../api/moodApi';
// import './Vitals.css';

// const VitalItem = ({ value, label, percentage }) => (
//     <div className="vital-item">
//         <div className="vital-circle">
//             <svg viewBox="0 0 100 100" className="vital-svg">
//                 <circle cx="50" cy="50" r="46" stroke="#F1F5F9" strokeWidth="4" fill="none" />
//                 <circle
//                     cx="50" cy="50" r="46"
//                     stroke="#1A2234"
//                     strokeWidth="4"
//                     fill="none"
//                     strokeDasharray="289.02"
//                     strokeDashoffset={289.02 - (289.02 * percentage) / 100}
//                     strokeLinecap="round"
//                     transform="rotate(-90 50 50)"
//                 />
//             </svg>
//             <div className="vital-inner">
//                 <span className="vital-value">{value}</span>
//                 <span className="vital-label">{label}</span>
//             </div>
//         </div>
//     </div>
// );

// const Vitals = () => {
//     const [stats, setStats]     = useState({ weekly: 0, monthly: 0, yearly: 0 });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         getMoodStats()
//             .then((res) => setStats(res.data.data))
//             .catch(() => {/* keep zeros */})
//             .finally(() => setLoading(false));
//     }, []);

//     const toPercent = (score) => Math.round((score / 10) * 100);
//     const fmt       = (v) => (loading ? "…" : v.toFixed(1));

//     return (
//         <section className="vitals-section">
//             <div className="vitals-header">
//                 <h2 className="section-title">HEALTH VITALS</h2>
//                 <a href="#history" className="history-link">History</a>
//             </div>

//             <div className="vitals-grid">
//                 <VitalItem
//                     value={fmt(stats.weekly)}
//                     label="MOOD/WK"
//                     percentage={toPercent(stats.weekly)}
//                 />
//                 <VitalItem
//                     value={fmt(stats.monthly)}
//                     label="MOOD/MO"
//                     percentage={toPercent(stats.monthly)}
//                 />
//                 <VitalItem
//                     value={fmt(stats.yearly)}
//                     label="MOOD/YR"
//                     percentage={toPercent(stats.yearly)}
//                 />
//             </div>
//         </section>
//     );
// };

// export default Vitals;



import React, { useEffect, useState } from 'react';
import { getMoodStats } from '../../api/moodApi';
import './Vitals.css';

const VitalItem = ({ value, label, percentage }) => (
    <div className="vital-item">
        <div className="vital-circle">
            <svg viewBox="0 0 100 100" className="vital-svg">
                <circle cx="50" cy="50" r="46" stroke="#F1F5F9" strokeWidth="4" fill="none" />
                <circle
                    cx="50" cy="50" r="46"
                    stroke="#1A2234"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="289.02"
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
    const [stats, setStats]     = useState({ weekly: 0, monthly: 0, yearly: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getMoodStats()
            .then((res) => setStats(res.data.data))
            .catch(() => {/* keep zeros on error */})
            .finally(() => setLoading(false));
    }, []); // key prop change from parent triggers remount → re-fetch

    // Backend returns 1–10. Convert to 0–100 for ring percentage.
    const toPercent = (score) => Math.round((score / 10) * 100);

    // Show raw score out of 10, or "–" when no data
    const fmt = (v) => {
        if (loading) return '…';
        if (!v) return '–';
        return v.toFixed(1);
    };

    return (
        <section className="vitals-section">
            <div className="vitals-header">
                <h2 className="section-title">HEALTH VITALS</h2>
                <a href="#history" className="history-link">History</a>
            </div>

            <div className="vitals-grid">
                <VitalItem
                    value={fmt(stats.weekly)}
                    label="MOOD/WK"
                    percentage={toPercent(stats.weekly)}
                />
                <VitalItem
                    value={fmt(stats.monthly)}
                    label="MOOD/MO"
                    percentage={toPercent(stats.monthly)}
                />
                <VitalItem
                    value={fmt(stats.yearly)}
                    label="MOOD/YR"
                    percentage={toPercent(stats.yearly)}
                />
            </div>
        </section>
    );
};

export default Vitals;