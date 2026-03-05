import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import { getMoodStats, getWeeklyBreakdown } from '../api/moodApi';
import './Analytics.css';

const MetricCard = ({ label, value, description, percentage }) => (
    <div className="metric-card">
        <div className="metric-header">
            <span className="metric-label">{label}</span>
            <div className="metric-circle-wrapper">
                <svg viewBox="0 0 100 100" className="metric-svg">
                    <circle cx="50" cy="50" r="46" stroke="#F1F5F9" strokeWidth="6" fill="none" />
                    <circle cx="50" cy="50" r="46" stroke="#1A2234" strokeWidth="6" fill="none"
                        strokeDasharray="289.02"
                        strokeDashoffset={289.02 - (289.02 * percentage) / 100}
                        strokeLinecap="round" transform="rotate(-90 50 50)" />
                </svg>
            </div>
        </div>
        <div className="metric-value">{value}</div>
        <div className="metric-desc">{description}</div>
    </div>
);

// SVG bar chart — no CSS height tricks, all pixel-exact
const MoodBarChart = ({ weeklyData, loading }) => {
    if (loading) return <p className="chart-status">Loading...</p>;
    if (!weeklyData.length) return <p className="chart-status">Log your mood daily to see your trend.</p>;

    const BAR_W = 18;
    const GAP   = 22;
    const H     = 110;
    const LABEL_H = 20;
    const N     = weeklyData.length;
    const W     = N * BAR_W + (N - 1) * GAP;
    const todayLabel = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];

    return (
        <svg viewBox={`0 0 ${W} ${H + LABEL_H}`} width="100%" style={{ display: 'block' }}>
            {weeklyData.map((d, i) => {
                const x       = i * (BAR_W + GAP);
                const fillH   = d.score > 0 ? Math.max((d.score / 10) * H, 6) : 0;
                const fillY   = H - fillH;
                const isToday = d.day === todayLabel;

                return (
                    <g key={i}>
                        {/* Track */}
                        <rect x={x} y={0} width={BAR_W} height={H} rx="5" fill="#E2E8F0" />
                        {/* Fill */}
                        {fillH > 0 && (
                            <rect x={x} y={fillY} width={BAR_W} height={fillH} rx="5"
                                fill={isToday ? '#1A2234' : '#94A3B8'} />
                        )}
                        {/* Score */}
                        {d.score > 0 && (
                            <text x={x + BAR_W / 2} y={fillY - 4}
                                textAnchor="middle" fontSize="9" fontWeight="700" fill="#1A2234">
                                {d.score}
                            </text>
                        )}
                        {/* Day */}
                        <text x={x + BAR_W / 2} y={H + LABEL_H - 3}
                            textAnchor="middle" fontSize="10"
                            fontWeight={isToday ? '700' : '500'}
                            fill={isToday ? '#1A2234' : '#94A3B8'}>
                            {d.day}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

// Fancy Ebb & Flow — smooth bezier, gradient fill, animated draw, hover tooltip
const EbbAndFlowChart = ({ weeklyData, loading }) => {
    const [tooltip, setTooltip] = React.useState(null);

    if (loading) return <p className="chart-status">Loading...</p>;

    const W = 560, H = 160, PX = 44, PY = 24, BOTTOM = 30;
    const cW = W - PX * 2, cH = H - PY - BOTTOM;
    const hasData = weeklyData.some(d => d.score > 0);
    const todayLabel = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];

    const toX = (i) => PX + (i / (weeklyData.length - 1)) * cW;
    const toY = (s) => PY + cH - (s / 10) * cH;

    // Smooth cubic bezier path through all points
    const makePath = (pts) => {
        if (pts.length < 2) return '';
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
            const prev = pts[i - 1], curr = pts[i];
            const cpX = (prev.x + curr.x) / 2;
            d += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
        }
        return d;
    };

    const points = weeklyData.map((d, i) => ({ x: toX(i), y: toY(d.score), score: d.score, day: d.day }));
    const linePath = makePath(points);
    const areaPath = hasData
        ? `${linePath} L ${toX(weeklyData.length - 1)} ${H - BOTTOM} L ${toX(0)} ${H - BOTTOM} Z`
        : '';
    const pathLen = cW * 1.4;

    return (
        <div className="ebb-chart-wrapper">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: 'visible' }}
                onMouseLeave={() => setTooltip(null)}>
                <defs>
                    <linearGradient id="ebb-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#1A2234" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#1A2234" stopOpacity="0.01" />
                    </linearGradient>
                    <clipPath id="ebb-clip">
                        <rect x={PX} y={PY} width={cW} height={cH + 2} />
                    </clipPath>
                    <filter id="ebb-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <style>{`
                        .ebb-line {
                            stroke-dasharray: ${pathLen};
                            stroke-dashoffset: ${pathLen};
                            animation: ebbDraw 1.6s cubic-bezier(0.4,0,0.2,1) forwards;
                        }
                        .ebb-area { opacity: 0; animation: ebbFade 0.6s ease 1s forwards; }
                        .ebb-dot  { opacity: 0; animation: ebbFade 0.4s ease forwards; }
                        @keyframes ebbDraw { to { stroke-dashoffset: 0; } }
                        @keyframes ebbFade { to { opacity: 1; } }
                    `}</style>
                </defs>

                {/* Grid lines + Y-axis labels */}
                {[2,4,6,8,10].map(v => (
                    <g key={v}>
                        <line x1={PX} y1={toY(v)} x2={W-PX} y2={toY(v)}
                            stroke={v === 10 ? '#E2E8F0' : '#F1F5F9'} strokeWidth="1"
                            strokeDasharray={v === 10 ? '0' : '3 5'} />
                        <text x={PX-8} y={toY(v)+4} textAnchor="end"
                            fontSize="9" fill="#CBD5E1" fontFamily="system-ui">{v}</text>
                    </g>
                ))}

                {/* Baseline */}
                <line x1={PX} y1={H-BOTTOM} x2={W-PX} y2={H-BOTTOM}
                    stroke="#E2E8F0" strokeWidth="1.5" />

                {hasData ? (
                    <>
                        {/* Gradient fill */}
                        <path d={areaPath} fill="url(#ebb-grad)" clipPath="url(#ebb-clip)" className="ebb-area" />

                        {/* Animated line */}
                        <path d={linePath} fill="none" stroke="#1A2234" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round" className="ebb-line" />

                        {/* Dots + hover targets */}
                        {points.map((p, i) => (
                            <g key={i} className="ebb-dot" style={{ animationDelay: `${0.9 + i * 0.07}s` }}
                                onMouseEnter={() => setTooltip(p)}>
                                <circle cx={p.x} cy={p.y} r="14" fill="transparent" style={{ cursor: 'pointer' }} />
                                <circle cx={p.x} cy={p.y} r="5" fill="white"
                                    stroke="#1A2234" strokeWidth="2.5"
                                    filter={tooltip?.day === p.day ? 'url(#ebb-glow)' : ''} />
                                {tooltip?.day === p.day && (
                                    <circle cx={p.x} cy={p.y} r="9" fill="none"
                                        stroke="#1A2234" strokeWidth="1" strokeOpacity="0.2" />
                                )}
                            </g>
                        ))}

                        {/* Tooltip pill */}
                        {tooltip && tooltip.score > 0 && (() => {
                            const tx = Math.min(Math.max(tooltip.x, PX + 24), W - PX - 24);
                            const ty = tooltip.y - 34;
                            return (
                                <g>
                                    <rect x={tx-24} y={ty-14} width="48" height="24" rx="7" fill="#1A2234" />
                                    <text x={tx} y={ty+4} textAnchor="middle"
                                        fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">
                                        {tooltip.score}
                                    </text>
                                </g>
                            );
                        })()}
                    </>
                ) : (
                    <text x={W/2} y={(H-BOTTOM)/2 + PY} textAnchor="middle"
                        fill="#CBD5E1" fontSize="13" fontFamily="system-ui">
                        No mood data yet — log your first check-in
                    </text>
                )}

                {/* Day labels */}
                {weeklyData.map((d, i) => (
                    <text key={i} x={toX(i)} y={H-8} textAnchor="middle"
                        fontSize="10" fontFamily="system-ui"
                        fontWeight={d.day === todayLabel ? '700' : '500'}
                        fill={d.day === todayLabel ? '#1A2234' : '#94A3B8'}>
                        {d.day}
                    </text>
                ))}
            </svg>
        </div>
    );
};

const toPercent = (s) => Math.round((s / 10) * 100);
const moodLabel = (s) => {
    if (!s)    return 'No data yet.';
    if (s >= 8) return 'Radiating positivity.';
    if (s >= 6) return 'Doing well.';
    if (s >= 4) return 'Moderate — keep going.';
    return 'Needs attention.';
};

const Analytics = () => {
    const [stats,        setStats]        = useState({ weekly: 0, monthly: 0, yearly: 0 });
    const [weeklyData,   setWeeklyData]   = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingChart, setLoadingChart] = useState(true);

    useEffect(() => {
        getMoodStats()
            .then(res => setStats(res.data.data))
            .catch(() => {})
            .finally(() => setLoadingStats(false));

        getWeeklyBreakdown()
            .then(res => setWeeklyData(res.data.data))
            .catch(() => {})
            .finally(() => setLoadingChart(false));
    }, []);

    return (
        <DashboardLayout>
            <div className="analytics-page">

                <div className="analytics-header">
                    <h1 className="analytics-title">Mindful Reflection</h1>
                    <p className="analytics-subtitle">Your comprehensive wellbeing metrics</p>
                </div>

                <div className="analytics-grid">
                    <MetricCard label="MOOD (WEEK)"  value={loadingStats ? '…' : stats.weekly.toFixed(1)}  percentage={toPercent(stats.weekly)}  description={moodLabel(stats.weekly)} />
                    <MetricCard label="MOOD (MONTH)" value={loadingStats ? '…' : stats.monthly.toFixed(1)} percentage={toPercent(stats.monthly)} description={moodLabel(stats.monthly)} />
                    <MetricCard label="MOOD (YEAR)"  value={loadingStats ? '…' : stats.yearly.toFixed(1)}  percentage={toPercent(stats.yearly)}  description={moodLabel(stats.yearly)} />
                    <MetricCard label="FOCUS"      value="76" percentage={76} description="Sharp mental clarity." />
                    <MetricCard label="ENERGY"     value="68" percentage={68} description="Sustained vitality." />
                    <MetricCard label="RESILIENCE" value="88" percentage={88} description="Strong adaptability." />
                </div>

                {/* Single trends card — bar on mobile, ebb & flow line on PC */}
                <div className="trends-card">
                    <div className="trends-header mobile-view">
                        <h2 className="trends-title">Vital Trends</h2>
                        <span className="trends-tag">7 DAY PERFORMANCE</span>
                    </div>
                    <div className="trends-header pc-view">
                        <h2 className="trends-title">The Ebb and Flow</h2>
                        <span className="trends-tag">CELESTIAL CYCLES</span>
                    </div>

                    {/* Mobile: bar chart */}
                    <div className="trends-chart-area mobile-view">
                        <MoodBarChart weeklyData={weeklyData} loading={loadingChart} />
                    </div>

                    {/* PC: fancy line chart */}
                    <div className="pc-view">
                        <EbbAndFlowChart weeklyData={weeklyData} loading={loadingChart} />
                    </div>

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

                <div className="deep-dive-card">
                    <div className="deep-dive-content">
                        <span className="deep-dive-tag">DEEP DIVE</span>
                        <h2 className="deep-dive-title">Understand your<br />internal landscape</h2>
                        <button className="start-assessment-btn">Start Assessment</button>
                    </div>
                </div>

                <div style={{ height: '5rem' }} />
            </div>
        </DashboardLayout>
    );
};

export default Analytics;