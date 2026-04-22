import React, { useState, useEffect } from 'react';
import { Search, Download, UploadCloud, Brain, FileText, Smile, Image as ImageIcon, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { getRecentAssessment } from '../api/assessmentApi';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import CounsellorLayout from '../components/CounsellorDashboard/CounsellorLayout';
import './Assessments.css';

const Assessments = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';
  const Layout = isStudent ? DashboardLayout : CounsellorLayout;

  const [activeTab, setActiveTab] = useState('All Tests');
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(isStudent);

  useEffect(() => {
    if (isStudent) {
      setLoading(true);
      getRecentAssessment()
        .then(res => {
          if (res.data.data) {
            const assessment = res.data.data;
            // Map backend Assessment model to UI format
            setRecentResults([{
              id: assessment._id,
              name: user.name,
              test: 'Last Assessment',
              result: `${assessment.severity.toUpperCase()} (${assessment.score})`,
              time: new Date(assessment.createdAt).toLocaleDateString(),
              alert: assessment.severity === 'high'
            }]);
          } else {
            setRecentResults([]);
          }
        })
        .catch(err => {
          console.error('Failed to fetch assessments:', err);
          setRecentResults([]);
        })
        .finally(() => setLoading(false));
    } else {
      // Hardcoded data for counsellors (as in original)
      setRecentResults([
        { id: 1, name: 'David Bowie', test: 'EQ Profile', result: 'High Core', time: '2h ago', alert: false },
        { id: 2, name: 'Patti Smith', test: 'Cognitive Aptitude', result: '94th Percentile', time: 'Yesterday', alert: false },
        { id: 3, name: 'Iggy Pop', test: 'Anxiety Inventory', result: 'Action Required', time: 'Yesterday', alert: true }
      ]);
    }
  }, [isStudent, user?.name]);

  const INVENTORY = [
    {
      id: 1,
      icon: <Brain size={20} strokeWidth={2.5} color="#475569" />,
      tag: 'CLINICAL',
      title: 'GAD-7 (Generalized Anxiety Disorder)',
      desc: 'A 7-item self-report questionnaire designed to screen for generalized anxiety disorder.',
      time: '5 min'
    },
    {
      id: 2,
      icon: <Smile size={20} strokeWidth={2.5} color="#475569" />,
      tag: 'CLINICAL',
      title: 'PSS-10 (Perceived Stress Scale)',
      desc: 'A self report questionaire designed to measure the perception of stress.',
      time: '5 MINS'
    },
    {
      id: 3,
      icon: <Brain size={20} strokeWidth={2.5} color="#475569" />,
      tag: 'CLINICAL',
      title: 'PHQ-9 (Patient Health Questionnaire)',
      desc: 'A self administrated diagnostic tool used to screen, diagnose and measure the severenity of depression.',
      time: '7 min'
    },
    {
      id: 4,
      icon: <ImageIcon size={20} strokeWidth={2.5} color="#475569" />,
      tag: 'CLINICAL',
      title: 'DASS-21 (Depression, Anxiety and Stress Scale)',
      desc: 'Self reprt questionaire designed to measure the severenity of emotional distress.',
      time: '10 MINS'
    }
  ];


  return (
    <Layout>
      <div className="ca-container">
        {/* Navigation Row */}
        <div className="ca-top-nav">
          <div className="ca-nav-links">

            <button
              className={`ca-nav-btn ${activeTab === 'All Tests' ? 'active' : ''}`}
              onClick={() => setActiveTab('All Tests')}
            >
              All Tests
            </button>
            {!isStudent && (
              <button
                className={`ca-nav-btn ${activeTab === 'Assigned' ? 'active' : ''}`}
                onClick={() => setActiveTab('Assigned')}
              >
                Assigned
              </button>
            )}
            <button
              className={`ca-nav-btn ${activeTab === 'Results' ? 'active' : ''}`}
              onClick={() => setActiveTab('Results')}
            >
              Results
            </button>
          </div>
          <div className="ca-search-box">
            <Search size={16} className="ca-search-icon" />
            <input type="text" placeholder="Search assessments..." className="ca-search-input" />
          </div>
        </div>

        {/* Header Section */}
        <div className="ca-header">
          <div className="ca-header-text">
            <h1 className="ca-title">Psychometric Assessments</h1>
            <p className="ca-subtitle">Standardized inventory and aptitude testing suite.</p>
          </div>
          {!isStudent && (
            <div className="ca-header-actions">
              <button className="ca-btn ca-btn-secondary">Export Catalog</button>
              <button className="ca-btn ca-btn-primary">
                <FileText size={16} /> Import Protocol
              </button>
            </div>
          )}
        </div>

        {/* Main Grid Content */}
        <div className="ca-grid-layout">
          {/* Left Column - Inventory */}
          <div className="ca-inventory-section">
            <h3 className="ca-section-title">AVAILABLE INVENTORY</h3>
            <div className="ca-inventory-grid">
              {INVENTORY.map(item => (
                <div key={item.id} className="ca-card ca-inventory-card">
                  <div className="ca-card-top">
                    <div className="ca-icon-circle">{item.icon}</div>
                    <span className="ca-tag">{item.tag}</span>
                  </div>
                  <h4 className="ca-card-title">{item.title}</h4>
                  <p className="ca-card-desc">{item.desc}</p>
                  <div className="ca-card-bottom">
                    <span className="ca-time-label">⏱ {item.time}</span>
                    <button className="ca-action-link">
                      {isStudent ? 'Take Assessment' : 'Assign to Student'} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Assigned & Results */}
          <div className="ca-sidebar-section">
            {!isStudent && (
              <div className="ca-assigned-wrapper">
                <div className="ca-section-header">
                  <h3 className="ca-section-title">ASSIGNED</h3>
                  <span className="ca-section-count">3 ACTIVE</span>
                </div>
                <div className="ca-assigned-list">
                  {ASSIGNED.map(item => (
                    <div key={item.id} className="ca-assigned-item">
                      <div className="ca-assigned-top">
                        <span className="ca-assigned-name">{item.name}</span>
                        <span className="ca-assigned-id">ID: {item.patientId}</span>
                      </div>
                      <div className="ca-assigned-test">{item.test}</div>
                      <div className="ca-progress-container">
                        <div className="ca-progress-bar" style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <div className="ca-assigned-bottom">
                        <span className="ca-progress-text">{item.progress}% COMPLETE</span>
                        <span className="ca-status-text">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ca-results-wrapper">
              <div className="ca-section-header">
                <h3 className="ca-section-title">RECENT RESULTS</h3>
                <button className="ca-view-all">VIEW ALL</button>
              </div>
              <div className="ca-results-list ca-card">
                {loading ? (
                  <div className="ca-loading-state" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                    <Loader2 className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                    Fetching records...
                  </div>
                ) : recentResults.length === 0 ? (
                  <div className="ca-empty-state" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                    No assessments taken yet.
                  </div>
                ) : (
                  recentResults.map((item, index) => (
                    <div key={item.id} className={`ca-result-item ${index !== recentResults.length - 1 ? 'ca-border-bottom' : ''}`}>
                      <div className="ca-result-left">
                        <span className="ca-result-name">{item.name}</span>
                        <span className="ca-result-test">{item.test}</span>
                      </div>
                      <div className="ca-result-right">
                        <span className={`ca-result-score ${item.alert ? 'ca-text-red' : ''}`}>{item.result}</span>
                        <span className="ca-result-time">{item.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        {!isStudent && (
          <div className="ca-bottom-banner">
            <div className="ca-banner-content">
              <span className="ca-banner-tag">INSTITUTIONAL SUMMARY</span>
              <h2 className="ca-banner-title">Diagnostic Trend Analysis</h2>
              <p className="ca-banner-text">
                System-wide anxiety markers have shown a 12% stabilization following the implementation of the new cognitive behavioral protocol. View the full synthesis report for institutional oversight.
              </p>
            </div>
            <button className="ca-banner-btn">View Data Synthesis</button>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Assessments;
