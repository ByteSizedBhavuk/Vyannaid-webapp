import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import { getMoodStats } from '../api/moodApi';
import './Analytics.css';

// Reusable Metric Card with SVG Circular Progress
const MetricCard = ({ label, value, description, percentage }) => (
    <div className="metric-card">
        <div className="metric-header">
            <span className="metric-label">{label}</span>
            <div className="metric-circle-wrapper">
                <svg viewBox="0 0 100 100" className="metric-svg">
                    <circle cx="50" cy="50" r="46" stroke="#F1F5F9" strokeWidth="6" fill="none" />
                    <circle
                        cx="50" cy="50" r="46"
                        stroke="#1A2234"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="289.02"
                        strokeDashoffset={289.02 - (289.02 * percentage) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />
                </svg>
            </div>
        </div>
        <div className="metric-value">{value}</div>
        <div className="metric-desc">{description}</div>
    </div>
);

// Bar Chart Column Component
const ChartBar = ({ day, heightPercentage }) => (
    <div className="chart-column">
        <div className="bar-container">
            <div className="bar-bg" />
            <div className="bar-fill" style={{ height: `${heightPercentage}%` }} />
        </div>
        <span className="chart-day">{day}</span>
    </div>
);

// PC-Specific SVG Line Chart Component
const LineChart = () => (
    <div className="pc-line-chart-container">
        <svg viewBox="0 0 500 150" className="wave-svg" preserveAspectRatio="none">
            <path
                d="M 50 120 C 150 120, 150 40, 250 80 C 350 120, 350 40, 450 40"
                fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round"
            />
            <path
                d="M 50 130 C 200 100, 250 140, 350 60 C 400 30, 425 80, 450 70"
                fill="none" stroke="#1A2234" strokeWidth="4" strokeLinecap="round"
            />
        </svg>
        <div className="pc-chart-labels">
            <span>START</span><span>ASCEND</span><span>PEAK</span><span>HORIZON</span>
        </div>
    </div>
);

// Convert a 1–10 mood score to a 0–100 percentage for the ring
const toPercent = (score) => Math.round((score / 10) * 100);

// Describe mood score in words
const moodLabel = (score) => {
    if (!score) return "No data yet.";
    if (score >= 8) return "Radiating positivity.";
    if (score >= 6) return "Doing well.";
    if (score >= 4) return "Moderate — keep going.";
    return "Needs attention.";
};

const Analytics = () => {
    const [stats, setStats] = useState({ weekly: 0, monthly: 0, yearly: 0 });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        getMoodStats()
            .then((res) => setStats(res.data.data))
            .catch(() => {/* keep default zeros on error */})
            .finally(() => setLoadingStats(false));
    }, []);

    const weeklyPct  = toPercent(stats.weekly);
    const monthlyPct = toPercent(stats.monthly);
    const yearlyPct  = toPercent(stats.yearly);

    const trendsData = [
        { day: 'M', height: 40 }, { day: 'T', height: 35 },
        { day: 'W', height: 60 }, { day: 'T', height: 35 },
        { day: 'F', height: 35 }, { day: 'S', height: 30 },
        { day: 'S', height: 30 },
    ];

    return (
        <DashboardLayout>
            <div className="analytics-page">
                {/* 1. Header */}
                <div className="analytics-header">
                    <h1 className="analytics-title">Mindful Reflection</h1>
                    <p className="analytics-subtitle">Your comprehensive wellbeing metrics</p>
                </div>

                {/* 2. Metrics Grid — top 3 are live from backend */}
                <div className="analytics-grid">
                    <MetricCard
                        label="MOOD (WEEK)"
                        value={loadingStats ? "…" : stats.weekly.toFixed(1)}
                        percentage={weeklyPct}
                        description={moodLabel(stats.weekly)}
                    />
                    <MetricCard
                        label="MOOD (MONTH)"
                        value={loadingStats ? "…" : stats.monthly.toFixed(1)}
                        percentage={monthlyPct}
                        description={moodLabel(stats.monthly)}
                    />
                    <MetricCard
                        label="MOOD (YEAR)"
                        value={loadingStats ? "…" : stats.yearly.toFixed(1)}
                        percentage={yearlyPct}
                        description={moodLabel(stats.yearly)}
                    />
                    <MetricCard label="FOCUS"      value="76" percentage={76} description="Sharp mental clarity." />
                    <MetricCard label="ENERGY"     value="68" percentage={68} description="Sustained vitality." />
                    <MetricCard label="RESILIENCE" value="88" percentage={88} description="Strong adaptability." />
                </div>

                {/* 3. Vital Trends */}
                <div className="trends-card">
                    <div className="trends-header mobile-view">
                        <h2 className="trends-title">Vital Trends</h2>
                        <span className="trends-tag">7 DAY PERFORMANCE</span>
                    </div>
                    <div className="trends-header pc-view">
                        <h2 className="trends-title">The Ebb and Flow</h2>
                        <span className="trends-tag">CELESTIAL CYCLES</span>
                    </div>

                    <div className="trends-chart-area mobile-view">
                        {trendsData.map((data, index) => (
                            <ChartBar key={index} day={data.day} heightPercentage={data.height} />
                        ))}
                    </div>

                    <div className="pc-view"><LineChart /></div>
                    <div className="trends-divider" />

                    <div className="trends-footer mobile-view">
                        <div className="trends-state">
                            <span className="state-label">CURRENT STATE</span>
                            <h3 className="state-value">Inner Harmony<br />Achieved</h3>
                        </div>
                        <button className="history-btn">History</button>
                    </div>
                    <div className="trends-footer pc-view">
                        <div className="trends-state">
                            <span className="state-label">CURRENT ESSENCE</span>
                            <h3 className="state-value">A Symphony of<br />Serenity</h3>
                        </div>
                        <button className="history-btn pc-history-btn">SCROLLS</button>
                    </div>
                </div>

                {/* 4. Deep Dive CTA */}
                <div className="deep-dive-card">
                    <div className="deep-dive-content">
                        <span className="deep-dive-tag">DEEP DIVE</span>
                        <h2 className="deep-dive-title">Understand your<br />internal landscape</h2>
                        <button className="start-assessment-btn">Start Assessment</button>
                    </div>
                </div>

                <div style={{ height: '5rem' }}></div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
