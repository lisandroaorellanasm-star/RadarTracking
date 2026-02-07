
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'es';

interface AppContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard_title: "Location solutions for your enterprise",
    active_zones: "Active Zones",
    visits_today: "Visits Today",
    triggers: "Triggers",
    recent_activity: "Recent Activity",
    ai_rec: "AI Recommendation",
    peak_detected: "New Peak Detected",
    optimize_now: "Optimize Now",
    home: "Home",
    map: "Map",
    campaigns: "Campaigns",
    rewards: "Rewards",
    ai_assistant: "AI Assistant",
    radar_monitor: "Radar Monitor",
    total_active: "Total Active",
    current_campaign: "Current Campaign",
    visitors: "Visitors",
    sent: "Sent",
    total_balance: "Total Points Balance",
    nearby_rewards: "Nearby Rewards",
    active_challenges: "Active Challenges",
    check_in: "Check-in",
    ai_welcome: "Hi! I am your Radar AI Assistant. Ask me anything about your store traffic, geofences, or campaign optimization.",
  },
  es: {
    dashboard_title: "Soluciones de ubicación para su empresa",
    active_zones: "Zonas Activas",
    visits_today: "Visitas Hoy",
    triggers: "Disparadores",
    recent_activity: "Actividad Reciente",
    ai_rec: "Recomendación IA",
    peak_detected: "Nuevo Pico Detectado",
    optimize_now: "Optimizar Ahora",
    home: "Inicio",
    map: "Mapa",
    campaigns: "Campañas",
    rewards: "Premios",
    ai_assistant: "Asistente IA",
    radar_monitor: "Monitor Radar",
    total_active: "Total Activos",
    current_campaign: "Campaña Actual",
    visitors: "Visitantes",
    sent: "Enviados",
    total_balance: "Saldo Total de Puntos",
    nearby_rewards: "Premios Cercanos",
    active_challenges: "Desafíos Activos",
    check_in: "Registrarse",
    ai_welcome: "¡Hola! Soy tu Asistente de IA de Radar. Pregúntame lo que quieras sobre el tráfico, geovallas u optimización de campañas.",
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'light');
  const [language, setLanguageState] = useState<Language>((localStorage.getItem('language') as Language) || 'en');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
