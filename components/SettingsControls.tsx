
import React from 'react';
import { useApp } from '../context/AppContext';

const SettingsControls: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage } = useApp();

  return (
    <div className="flex items-center gap-2">
      {/* Language Toggle */}
      <button 
        onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
        className="flex items-center gap-1 p-2 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition group"
        title="Cambiar Idioma"
      >
        <span className="material-icons-round text-sm text-slate-600 dark:text-slate-300">language</span>
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase">{language}</span>
      </button>

      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition"
        title="Cambiar Tema"
      >
        <span className="material-icons-round text-slate-600 dark:text-slate-300">
          {theme === 'light' ? 'dark_mode' : 'light_mode'}
        </span>
      </button>
    </div>
  );
};

export default SettingsControls;
