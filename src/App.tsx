import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Jobs from './pages/Jobs';
import CookieConsent from './components/CookieConsent';
import { useAnalytics } from './hooks/useAnalytics';
import { useFeature } from './hooks/useFeature';

const AppContent: React.FC = () => {
  const isJobTrackingEnabled = useFeature('jobTrackingCRM');
  useAnalytics();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        {isJobTrackingEnabled && <Route path="/jobs/*" element={<Jobs />} />}
      </Routes>
      <CookieConsent />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;