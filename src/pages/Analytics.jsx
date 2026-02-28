import React from 'react';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
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
                        strokeDasharray="289.02" // 2 * pi * 46
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
            {/* Background Light Gray Wave */}
            <path
                d="M 50 120 C 150 120, 150 40, 250 80 C 350 120, 350 40, 450 40"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="4"
                strokeLinecap="round"
            />
            {/* Foreground Dark Navy Wave */}
            <path
                d="M 50 130 C 200 100, 250 140, 350 60 C 400 30, 425 80, 450 70"
                fill="none"
                stroke="#1A2234"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </svg>
        <div className="pc-chart-labels">
            <span>START</span>
            <span>ASCEND</span>
            <span>PEAK</span>
            <span>HORIZON</span>
        </div>
    </div>
);

const Analytics = () => {
    // Note: In a real app this would come from state/props
    const trendsData = [
        { day: 'M', height: 40 },
        { day: 'T', height: 35 },
        { day: 'W', height: 60 },
        { day: 'T', height: 35 },
        { day: 'F', height: 35 },
        { day: 'S', height: 30 },
        { day: 'S', height: 30 },
    ];

    return (
        <DashboardLayout>
            <div className="analytics-page">
                {/* 1. Header Section */}
                <div className="analytics-header">
                    <h1 className="analytics-title">Mindful Reflection</h1>
                    <p className="analytics-subtitle">Your comprehensive wellbeing metrics</p>
                </div>

                {/* 2. 2x3 Metrics Grid */}
                <div className="analytics-grid">
                    <MetricCard
                        label="STRESS"
                        value="22"
                        percentage={22}
                        description="Stable baseline today."
                    />
                    <MetricCard
                        label="MOOD"
                        value="84"
                        percentage={84}
                        description="Radiating positivity."
                    />
                    <MetricCard
                        label="REST"
                        value="91"
                        percentage={91}
                        description="Fully rejuvenated."
                    />
                    <MetricCard
                        label="FOCUS"
                        value="76"
                        percentage={76}
                        description="Sharp mental clarity."
                    />
                    <MetricCard
                        label="ENERGY"
                        value="68"
                        percentage={68}
                        description="Sustained vitality."
                    />
                    <MetricCard
                        label="RESILIENCE"
                        value="88"
                        percentage={88}
                        description="Strong adaptability."
                    />
                </div>

                {/* 3. Vital Trends / Ebb and Flow Chart */}
                <div className="trends-card">
                    {/* MOBILE/TABLET HEADER */}
                    <div className="trends-header mobile-view">
                        <h2 className="trends-title">Vital Trends</h2>
                        <span className="trends-tag">7 DAY PERFORMANCE</span>
                    </div>
                    {/* PC HEADER */}
                    <div className="trends-header pc-view">
                        <h2 className="trends-title">The Ebb and Flow</h2>
                        <span className="trends-tag">CELESTIAL CYCLES</span>
                    </div>

                    {/* MOBILE/TABLET BAR CHART */}
                    <div className="trends-chart-area mobile-view">
                        {trendsData.map((data, index) => (
                            <ChartBar key={index} day={data.day} heightPercentage={data.height} />
                        ))}
                    </div>

                    {/* PC LINE CHART */}
                    <div className="pc-view">
                        <LineChart />
                    </div>

                    <div className="trends-divider" />

                    {/* MOBILE/TABLET FOOTER */}
                    <div className="trends-footer mobile-view">
                        <div className="trends-state">
                            <span className="state-label">CURRENT STATE</span>
                            <h3 className="state-value">Inner Harmony<br />Achieved</h3>
                        </div>
                        <button className="history-btn">History</button>
                    </div>

                    {/* PC FOOTER */}
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
                        <button className="start-assessment-btn">
                            Start Assessment
                        </button>
                    </div>
                </div>

                <div style={{ height: '5rem' }}></div> {/* Spacing for MobileBottomNav padding */}
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
