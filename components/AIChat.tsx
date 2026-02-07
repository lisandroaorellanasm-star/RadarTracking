
import React, { useState, useRef, useEffect } from 'react';
import Navigation from './Navigation';
import SettingsControls from './SettingsControls';
import { useApp } from '../context/AppContext';
import { getLocationInsights } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChat: React.FC = () => {
  const { t, language } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset or set initial message based on language
    setMessages([{ role: 'assistant', content: t('ai_welcome') }]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getLocationInsights(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: language === 'en' ? "I encountered an error. Please check your API configuration." : "He encontrado un error. Por favor verifica la configuración de tu API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark font-sans overflow-hidden">
      <header className="bg-primary pt-12 pb-6 px-6 shadow-lg shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
            <span className="material-icons-round text-white">psychology</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">Radar AI</h1>
            <p className="text-white/70 text-xs mt-1">{language === 'en' ? 'Smart Location Insights' : 'Información Inteligente'}</p>
          </div>
        </div>
        <SettingsControls />
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 hide-scroll bg-slate-50 dark:bg-background-dark/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/20' 
                : 'bg-white dark:bg-card-dark text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-white/5 shadow-sm rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-card-dark p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5 flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </main>

      <div className="p-4 bg-white dark:bg-card-dark border-t border-slate-200 dark:border-white/5 pb-28 transition-colors duration-500">
        <div className="flex gap-2 items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl">
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400"
            placeholder={language === 'en' ? "Ask about traffic patterns..." : "Pregunta sobre patrones de tráfico..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary text-white p-2 rounded-xl disabled:opacity-50 transition-all active:scale-90 shadow-lg shadow-primary/20"
          >
            <span className="material-icons-round">send</span>
          </button>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default AIChat;
