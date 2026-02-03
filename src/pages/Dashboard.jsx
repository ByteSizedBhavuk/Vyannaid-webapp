

import { useAuth } from "../auth/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>
      <p className="welcome">Welcome to your personalized space</p>

      <div className="dashboard-cards">
        <div className="card">📘 My Courses</div>
        <div className="card">🧠 Insights</div>
        <div className="card">🤝 Community</div>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
