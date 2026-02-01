import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreConnections from './components/CoreConnections';
import GentleInsights from './components/GentleInsights';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <CoreConnections />
      <GentleInsights />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
