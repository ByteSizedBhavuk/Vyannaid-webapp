// import React from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import CoreConnections from './components/CoreConnections';
// import GentleInsights from './components/GentleInsights';
// import CTA from './components/CTA';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <div className="app-container">
//       <Navbar />
//       <Hero />
//       <CoreConnections />
//       <GentleInsights />
//       <CTA />
//       <Footer />
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// existing components (homepage)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GentleInsights from "./components/GentleInsights";
import CoreConnections from "./components/CoreConnections";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

// auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const Home = () => (
  <>
    <Hero />
    <GentleInsights />
    <CoreConnections />
    <CTA />
  </>
);

const RedirectIfLoggedIn = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* PUBLIC HOME */}
          <Route path="/" element={<Home />} />

          {/* AUTH */}
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

          {/* PROTECTED */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
