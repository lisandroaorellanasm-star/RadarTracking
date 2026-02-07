
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { t } = useApp();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-white/5 pb-6 pt-3 px-6 z-50 flex justify-between items-center text-xs font-medium">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-icons-round text-2xl">dashboard</span>
        <span>{t('home')}</span>
      </Link>
      <Link to="/map" className={`flex flex-col items-center gap-1 ${isActive('/map') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-icons-round text-2xl">map</span>
        <span>{t('map')}</span>
      </Link>
      <div className="relative -top-6">
        <Link to="/ai-assistant" className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-full shadow-xl shadow-primary/40 flex items-center justify-center text-white transform hover:scale-105 transition ring-4 ring-white dark:ring-background-dark">
          <span className="material-icons-round text-3xl">psychology</span>
        </Link>
      </div>
      <Link to="/campaigns" className={`flex flex-col items-center gap-1 ${isActive('/campaigns') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-icons-round text-2xl">campaign</span>
        <span>{t('campaigns')}</span>
      </Link>
      <Link to="/rewards" className={`flex flex-col items-center gap-1 ${isActive('/rewards') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-icons-round text-2xl">stars</span>
        <span>{t('rewards')}</span>
      </Link>
    </nav>
  );
};

export default Navigation;
