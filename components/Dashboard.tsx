
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import SettingsControls from './SettingsControls';
import { useApp } from '../context/AppContext';
import { StatCardProps, ActivityItem } from '../types';

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, color }) => (
  <div className="min-w-[160px] p-5 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden transition-all hover:scale-[1.02]">
    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${color} opacity-20 rounded-bl-3xl`}></div>
    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
      <span className="material-icons-round text-base" style={{ color: color.includes('primary') ? '#ec008c' : (color.includes('blue') ? '#3b82f6' : '#a855f7') }}>{icon}</span>
      {label}
    </div>
    <div>
      <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
      {trend && (
        <span className="text-xs text-green-500 font-bold ml-1 inline-flex bg-green-500/10 px-1.5 py-0.5 rounded items-center">
          <span className="material-icons-round text-[10px] mr-0.5">arrow_upward</span> {trend}
        </span>
      )}
    </div>
  </div>
);

const ActivityRow: React.FC<ActivityItem> = ({ title, subtitle, type, time, value }) => {
  const getIcon = () => {
    switch (type) {
      case 'store': return 'storefront';
      case 'logistics': return 'local_shipping';
      case 'cafe': return 'coffee';
      default: return 'place';
    }
  };

  const getBg = () => {
    switch (type) {
      case 'store': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600';
      case 'logistics': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600';
      case 'cafe': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm flex items-center gap-4 transition-all hover:bg-slate-50 dark:hover:bg-white/5">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBg()}`}>
        <span className="material-icons-round text-xl">{getIcon()}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle} • {time}</p>
      </div>
      <div className="text-right">
        <span className={`block text-xs font-bold ${value.includes('+') ? 'text-green-500' : 'text-slate-500'}`}>{value}</span>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { t, language } = useApp();

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-600 rounded-full blur-[120px] opacity-20 dark:opacity-40 pointer-events-none"></div>
      
      <header className="relative pt-12 pb-6 px-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="material-icons-round text-primary text-xl">radar</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Radar<span className="text-primary">.io</span></h1>
        </div>
        <div className="flex items-center gap-2">
          <SettingsControls />
          <button className="p-2 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition">
            <span className="material-icons-round text-slate-600 dark:text-slate-300">notifications</span>
          </button>
        </div>
      </header>
      
      <main className="px-6 pb-28 relative z-10 flex-1 overflow-y-auto hide-scroll">
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            {language === 'en' ? 'Good afternoon, Alex' : 'Buenas tardes, Alex'}
          </p>
          <h2 className="text-3xl font-extrabold leading-tight">{t('dashboard_title')}</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto hide-scroll pb-4 -mx-6 px-6 mb-6">
          <StatCard label={t('active_zones')} value="124" trend="12%" icon="place" color="from-primary" />
          <StatCard label={t('visits_today')} value="8.2k" trend="5%" icon="people" color="from-blue-500" />
          <StatCard label={t('triggers')} value="450" icon="notifications_active" color="from-purple-500" />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold">{t('recent_activity')}</h3>
            <Link to="/map" className="text-primary text-sm font-semibold hover:opacity-80">{language === 'en' ? 'View all' : 'Ver todo'}</Link>
          </div>
          <div className="space-y-3">
            <ActivityRow id="1" title="Downtown Flagship" subtitle={language === 'en' ? 'Entry event' : 'Evento de entrada'} type="store" time="2m ago" value="+1 Customer" />
            <ActivityRow id="2" title="Logistics Hub A" subtitle={language === 'en' ? 'Exit event' : 'Evento de salida'} type="logistics" time="14m ago" value="Fleet #42" />
            <ActivityRow id="3" title="Times Square Cafe" subtitle={language === 'en' ? 'Dwell event' : 'Evento de permanencia'} type="cafe" time="32m ago" value="> 5 mins" />
          </div>
        </div>

        <Link to="/campaigns" className="relative block mt-8 rounded-2xl overflow-hidden bg-gradient-to-r from-[#1e1b4b] to-[#3b0764] shadow-lg border border-white/10 group cursor-pointer transition-transform hover:scale-[1.02]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 transform rotate-45"></div>
            <div className="absolute bottom-[-20%] left-[10%] w-24 h-24 bg-primary/20 transform rotate-12 rounded-lg"></div>
          </div>
          <div className="relative p-6 z-10">
            <div className="flex justify-between items-start">
              <div className="w-2/3">
                <div className="inline-block px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-bold text-white mb-2 uppercase tracking-wide">{t('ai_rec')}</div>
                <h3 className="text-white font-bold text-xl mb-1">{t('peak_detected')}</h3>
                <p className="text-indigo-200 text-xs mb-4">
                  {language === 'en' 
                    ? 'Traffic at Soho is 20% higher than usual. Launch a flash campaign?' 
                    : 'El tráfico en Soho es un 20% mayor de lo habitual. ¿Lanzar una campaña relámpago?'}
                </p>
                <div className="bg-primary hover:bg-pink-600 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-lg shadow-primary/30 transition flex items-center gap-2 w-fit">
                  <span className="material-icons-round text-base">auto_awesome</span>
                  {t('optimize_now')}
                </div>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                <div className="relative w-20 h-20">
                  <span className="material-icons-round text-6xl text-primary drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] animate-bounce">location_on</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </main>

      <Navigation />
    </div>
  );
};

export default Dashboard;
