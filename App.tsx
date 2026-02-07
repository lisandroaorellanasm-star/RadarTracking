
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import Rewards from './components/Rewards';
import Campaigns from './components/Campaigns';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="max-w-md mx-auto h-screen relative bg-white dark:bg-background-dark shadow-2xl overflow-hidden flex flex-col transition-colors duration-500">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/ai-assistant" element={<AIChat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
