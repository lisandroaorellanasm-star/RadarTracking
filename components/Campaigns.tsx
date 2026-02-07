
import React from 'react';
import Navigation from './Navigation';
import { CampaignItem } from '../types';

const CAMPAIGNS: CampaignItem[] = [
  { id: '1', name: 'Downtown Coffee Promo', description: "Hey coffee lover! You're nearby. Pop in for 20% off your latte today!", status: 'active', zone: 'Main St. Zone', openRate: '42%', convRate: '12%' },
  { id: '2', name: 'Summer Sale Alert', description: "Sun's out! Check out our new summer collection while you're at the mall.", status: 'active', zone: 'Westfield Mall', openRate: '38%', convRate: '8%' },
  { id: '3', name: 'Weekend Brunch Special', description: "Hungry? Join us for bottomless mimosas this weekend!", status: 'scheduled', zone: 'All Locations', openRate: '0%', convRate: '0%', startTime: 'Starts in 2h' },
];

const CampaignCard: React.FC<{ campaign: CampaignItem }> = ({ campaign }) => (
  <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-100 dark:border-white/10 p-4 transition-all hover:shadow-md active:scale-[0.99] mb-4">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <div className={`rounded-full p-1.5 ${campaign.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'}`}>
          <span className="material-icons-round text-sm">{campaign.status === 'active' ? 'near_me' : 'schedule'}</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${campaign.status === 'active' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'}`}>
          {campaign.status === 'active' ? 'Active' : (campaign.startTime || 'Scheduled')}
        </span>
      </div>
      <button className="text-slate-400 hover:text-slate-600">
        <span className="material-icons-round text-lg">more_horiz</span>
      </button>
    </div>
    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{campaign.name}</h4>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{campaign.description}</p>
    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-3">
      <div className="flex items-center gap-1">
        <span className="material-icons-round text-sm">place</span>
        <span>{campaign.zone}</span>
      </div>
      <div className="flex items-center gap-1 ml-auto">
        <span className="material-icons-round text-sm text-blue-500">open_in_new</span>
        <span className="font-medium text-slate-700 dark:text-slate-300">{campaign.openRate} Open</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="material-icons-round text-sm text-primary">redeem</span>
        <span className="font-medium text-slate-700 dark:text-slate-300">{campaign.convRate} Conv.</span>
      </div>
    </div>
  </div>
);

const Campaigns: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark font-sans overflow-hidden">
      <header className="bg-gradient-to-br from-[#1e1b4b] to-[#3b0764] pt-12 pb-6 px-6 shadow-lg relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="relative z-10 flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-white text-2xl">radar</span>
            <h1 className="text-xl font-bold text-white tracking-tight">Radar Campaigns</h1>
          </div>
          <button className="text-white hover:bg-white/10 rounded-full p-2">
            <span className="material-icons-round">notifications</span>
          </button>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-1">Campaigns</h2>
          <p className="text-blue-100 text-sm">Manage your proximity notifications</p>
        </div>
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/10">
            <p className="text-xs text-blue-200 uppercase font-semibold">Active</p>
            <p className="text-xl font-bold text-white">12</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/10">
            <p className="text-xs text-blue-200 uppercase font-semibold">Reach</p>
            <p className="text-xl font-bold text-white">8.5k</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/10">
            <p className="text-xs text-blue-200 uppercase font-semibold">Conv.</p>
            <p className="text-xl font-bold text-primary">3.2%</p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 bg-slate-50 dark:bg-background-dark/50">
        <div className="flex gap-3 mb-4 sticky top-0 z-20 pt-2 pb-2 bg-slate-50 dark:bg-background-dark/95 backdrop-blur-sm -mx-4 px-4">
          <div className="relative flex-1">
            <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
            <input className="w-full bg-white dark:bg-card-dark border-none rounded-lg py-2.5 pl-9 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary text-slate-800 dark:text-slate-200 placeholder-slate-400" placeholder="Search campaigns..." type="text"/>
          </div>
          <button className="bg-white dark:bg-card-dark p-2.5 rounded-lg shadow-sm text-slate-600 dark:text-slate-300">
            <span className="material-icons-round text-xl">filter_list</span>
          </button>
        </div>
        
        <div className="px-1">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Active Now</h3>
          {CAMPAIGNS.filter(c => c.status === 'active').map(c => <CampaignCard key={c.id} campaign={c} />)}
          
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-3">Scheduled</h3>
          {CAMPAIGNS.filter(c => c.status === 'scheduled').map(c => <CampaignCard key={c.id} campaign={c} />)}
        </div>
      </main>

      <div className="fixed bottom-24 right-6 z-30">
        <button className="bg-primary hover:bg-pink-600 text-white rounded-full p-4 shadow-lg shadow-pink-500/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 group">
          <span className="material-icons-round">add</span>
          <span className="font-semibold pr-1 hidden group-hover:block whitespace-nowrap overflow-hidden transition-all duration-300">New Campaign</span>
        </button>
      </div>

      <Navigation />
    </div>
  );
};

export default Campaigns;
