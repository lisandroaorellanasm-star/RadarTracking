
import React from 'react';
import Navigation from './Navigation';
import { RewardItem } from '../types';

const REWARDS: RewardItem[] = [
  { id: '1', brand: 'Blue Bottle Coffee', offer: 'Free Espresso after 5 visits', progress: 2, total: 5, icon: 'local_cafe', color: 'blue', distance: '0.2 mi' },
  { id: '2', brand: 'Urban Outfitters', offer: '10% off for 30 min browsing', progress: 15, total: 30, icon: 'storefront', color: 'orange', distance: '0.5 mi' },
];

const RewardsCard: React.FC<{ reward: RewardItem }> = ({ reward }) => (
  <div className="min-w-[280px] bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex flex-col transition-all hover:scale-[1.02]">
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2 rounded-xl bg-${reward.color}-100 dark:bg-${reward.color}-900/30`}>
        <span className={`material-icons-round text-${reward.color}-600 dark:text-${reward.color}-400 text-2xl`}>{reward.icon}</span>
      </div>
      <span className="bg-slate-100 dark:bg-slate-800 text-xs font-medium px-2 py-1 rounded-lg text-slate-500 dark:text-slate-400 flex items-center gap-1">
        <span className="material-icons-round text-[10px]">location_on</span> {reward.distance}
      </span>
    </div>
    <h3 className="font-bold text-lg mb-1 dark:text-white">{reward.brand}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{reward.offer}</p>
    <div className="mt-auto">
      <div className="flex justify-between text-xs font-medium mb-1.5">
        <span className="text-primary">{reward.total - reward.progress} {reward.total > 5 ? 'min' : 'visits'} left</span>
        <span className="text-slate-400">{reward.progress}/{reward.total}{reward.total > 5 ? 'm' : ''}</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${(reward.progress / reward.total) * 100}%` }}></div>
      </div>
    </div>
  </div>
);

const Rewards: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark transition-colors overflow-y-auto hide-scroll pb-28">
      <header className="px-5 pt-12 pb-6">
        <div className="flex justify-between items-center mb-6">
          <button className="p-2 rounded-full bg-white dark:bg-card-dark shadow-sm">
            <span className="material-icons-round text-primary text-xl">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-primary">near_me</span>
            <span className="font-bold text-lg tracking-tight dark:text-white">Radar Rewards</span>
          </div>
          <button className="p-2 rounded-full bg-white dark:bg-card-dark shadow-sm">
            <span className="material-icons-round text-primary text-xl">notifications</span>
          </button>
        </div>
        
        <div className="bg-primary text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -left-10 bottom-0 w-32 h-32 bg-indigo-600 opacity-20 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-1">Total Points Balance</p>
            <div className="flex items-baseline gap-2 mb-4">
              <h1 className="text-4xl font-bold">2,450</h1>
              <span className="text-sm font-medium opacity-80">pts</span>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-white/20 backdrop-blur-md hover:bg-white/30 transition py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <span className="material-icons-round text-sm">qr_code_scanner</span>
                Scan
              </button>
              <button className="flex-1 bg-white text-primary hover:bg-slate-100 transition py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <span className="material-icons-round text-sm">history</span>
                History
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="px-5">
        <section className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold dark:text-white">Nearby Rewards</h2>
            <button className="text-primary text-sm font-medium">See all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scroll pb-4 -mx-5 px-5">
            {REWARDS.map(r => <RewardsCard key={r.id} reward={r} />)}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 dark:text-white">Active Challenges</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-icons-round text-green-600 dark:text-green-400 text-3xl">check_circle</span>
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h3 className="font-bold text-base leading-tight mb-1 dark:text-white">Shake Shack</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Free Shake earned!</p>
                </div>
                <button className="mt-2 bg-primary text-white text-xs font-bold py-2 px-4 rounded-lg self-start shadow-md shadow-primary/30 active:scale-95 transition-transform">
                  Redeem Now
                </button>
              </div>
            </div>
            {/* Equinox Challenge */}
            <div className="bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-icons-round text-purple-600 dark:text-purple-400 text-3xl">fitness_center</span>
              </div>
              <div className="flex-1 py-0.5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-base leading-tight dark:text-white">Equinox</h3>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">+500 pts</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Check-in 3 times this week</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: '66%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">2/3</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-24 left-5 right-5 z-40 animate-bounce">
        <div className="bg-slate-900/90 backdrop-blur text-white p-3 rounded-xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium">You are at <strong>Starbucks</strong></span>
          </div>
          <button className="text-xs font-bold text-primary">Check-in</button>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Rewards;
