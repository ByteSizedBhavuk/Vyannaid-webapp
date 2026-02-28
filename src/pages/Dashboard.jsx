
import React from 'react';
import DashboardLayout from '../components/StudentDashboard/DashboardLayout';
import Vitals from '../components/StudentDashboard/Vitals';
import AarivBanner from '../components/StudentDashboard/AarivBanner';
import ConnectCare from '../components/StudentDashboard/ConnectCare';
import DailyActivities from '../components/StudentDashboard/DailyActivities';
import Assessments from '../components/StudentDashboard/Assessments';
import Volunteering from '../components/StudentDashboard/Volunteering';
import CrisisSupport from '../components/StudentDashboard/CrisisSupport';
import '../components/StudentDashboard/DashboardLayout.css'; // Ensure main styles are loaded

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-left-column">
        {/* Top Row: Vitals */}
        <Vitals />

        {/* Middle Row: AI Banner */}
        <AarivBanner />

        {/* Bottom Rows: Activities */}
        <DailyActivities />

        <Assessments />
        <Volunteering />
      </div>

      {/* Right Column */}
      <div className="dashboard-right-column">
        <ConnectCare />
        <CrisisSupport />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
