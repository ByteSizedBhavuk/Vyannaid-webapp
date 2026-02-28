

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// existing components (homepage)
import Navbar from "./components/LandingPage/Navbar";
import LandingLayout from "./components/LandingPage/LandingLayout";
import Hero from "./components/LandingPage/Hero";
import GentleInsights from "./components/LandingPage/GentleInsights";
import CoreConnections from "./components/LandingPage/CoreConnections";
import CTA from "./components/LandingPage/CTA";
import Footer from "./components/LandingPage/Footer";

// auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Appointments from "./pages/Appointments";
import Activities from "./pages/Activities";
import Analytics from "./pages/Analytics"
import Chatbot from "./pages/Chatbot";
import { useEffect, useState } from "react";



const Home = () => (
  <>
    <Hero />
    <GentleInsights />
    <CoreConnections />
    <CTA />
  </>
);

const HomeRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? (
    <Navigate to="/dashboard/student" replace />
  ) : (
    <Home />
  );
};

const RedirectIfLoggedIn = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard/student" /> : children;
};

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(err => console.error("API error:", err));
  }, []);
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC PAGES (Wrapped in LandingLayout) */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<HomeRoute />} />
            <Route
              path="/login"
              element={
                <RedirectIfLoggedIn>
                  <Login />
                </RedirectIfLoggedIn>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfLoggedIn>
                  <Register />
                </RedirectIfLoggedIn>
              }
            />
          </Route>

          {/* PROTECTED DASHBOARD (No Landing Navbar/Footer) */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/activities"
            element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
