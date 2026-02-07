
import React, { useState } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

const MapView: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState('Union Square');

  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark font-sans text-white relative overflow-hidden">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 z-0 map-bg opacity-100 overflow-hidden">
        {/* Grids and subtle shapes to simulate map features */}
        <div className="absolute top-0 left-1/4 w-4 h-full bg-slate-800/30 transform -skew-x-12"></div>
        <div className="absolute top-1/3 left-0 w-full h-6 bg-slate-800/30 transform skew-y-6"></div>
        
        {/* Point 1: Union Square */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border border-primary/30 flex items-center justify-center relative bg-primary/5">
            <div className="absolute w-full h-full rounded-full border border-primary/20 animate-ping opacity-20"></div>
            <div className="relative z-10 cursor-pointer group" onClick={() => setSelectedPoint('Union Square')}>
              <div className={`w-4 h-4 rounded-full shadow-[0_0_15px_rgba(230,0,126,0.8)] transition-all ${selectedPoint === 'Union Square' ? 'bg-primary scale-150' : 'bg-primary/50'}`}></div>
              <div className="absolute -inset-4 bg-primary/20 rounded-full marker-pulse -z-10"></div>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-slate-900 px-2 py-1 rounded text-xs font-semibold shadow-lg border border-slate-700 text-white">
                Union Square
              </div>
            </div>
          </div>
        </div>

        {/* Point 2: Chelsea */}
        <div className="absolute bottom-1/3 left-10 transform flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-blue-500/30 bg-blue-500/5 flex items-center justify-center relative">
            <div className="relative z-10 cursor-pointer" onClick={() => setSelectedPoint('Chelsea Store')}>
              <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all ${selectedPoint === 'Chelsea Store' ? 'bg-blue-500 scale-150' : 'bg-blue-500/50'}`}></div>
            </div>
          </div>
        </div>
      </div>

      <header className="relative z-20 px-4 pt-12 pb-4 flex justify-between items-center bg-gradient-to-b from-background-dark/90 to-transparent">
        <div className="flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md p-1.5 pr-4 rounded-full border border-slate-700/50">
          <div className="bg-primary/20 p-1.5 rounded-full">
            <span className="material-icons-round text-primary text-sm">radar</span>
          </div>
          <span className="font-bold text-sm tracking-wide text-white">Radar Monitor</span>
        </div>
        <div className="flex space-x-2">
          <button className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 flex items-center justify-center text-white hover:bg-slate-700 transition">
            <span className="material-icons-round text-lg">layers</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 flex items-center justify-center text-white hover:bg-slate-700 transition relative">
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="material-icons-round text-lg">notifications</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col justify-end pb-28 px-4 pointer-events-none">
        <div className="absolute top-24 right-4 pointer-events-auto space-y-3 w-32">
          <div className="bg-slate-900/90 backdrop-blur-md rounded-xl p-3 border border-slate-700/50 shadow-lg">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Total Active</p>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold text-white">12.4k</span>
              <span className="text-[10px] text-green-400 mb-1">▲ 12%</span>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto w-full max-w-md mx-auto">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-slate-700 mb-4 transform transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center border border-slate-700 shadow-inner">
                  <span className="material-icons-round text-primary">storefront</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">{selectedPoint} Store</h2>
                  <p className="text-xs text-slate-400 flex items-center mt-0.5">
                    <span className="material-icons-round text-[10px] mr-1">location_on</span> 123 Main St, New York
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider rounded border border-green-500/20">Active</span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-400 uppercase">Current Campaign</span>
                <span className="text-xs text-primary font-semibold">Ends in 2h</span>
              </div>
              <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-3 rounded-lg border border-indigo-500/20 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Flash Sale: 20% Off</p>
                  <p className="text-xs text-indigo-200">Trigger: Entry (50m radius)</p>
                </div>
                <button className="bg-primary hover:bg-pink-600 text-white text-xs px-3 py-1.5 rounded shadow-lg shadow-pink-500/20 transition-colors">
                  Edit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700">
                <span className="material-icons-round text-slate-400 text-sm mb-1">people</span>
                <p className="text-lg font-bold text-white">128</p>
                <p className="text-[10px] text-slate-500">Visitors</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700">
                <span className="material-icons-round text-slate-400 text-sm mb-1">notifications_active</span>
                <p className="text-lg font-bold text-white">45</p>
                <p className="text-[10px] text-slate-500">Sent</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700">
                <span className="material-icons-round text-slate-400 text-sm mb-1">touch_app</span>
                <p className="text-lg font-bold text-white">12%</p>
                <p className="text-[10px] text-slate-500">CTR</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-50 animate-bounce cursor-pointer border border-slate-700">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-xs font-medium">New user entered "Downtown Zone"</span>
      </div>

      <Navigation />
    </div>
  );
};

export default MapView;
