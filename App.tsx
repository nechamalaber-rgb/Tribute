import React, { useState, useEffect } from 'react';
import { ViewState, UserState, BitachonBrick, DailyGrowContent } from './types';
import { DEFAULT_DAILY_GROW, APP_NAME } from './constants';
import { Icons } from './components/Icon';
import { BitachonHouse } from './components/BitachonHouse';
import { GrowMomentFlow } from './components/GrowMomentFlow';
import { CreateGrowFlow } from './components/CreateGrowFlow';
import { DailyGrowFlow } from './components/DailyGrowFlow';
import { TefillahView } from './components/TefillahView';
import { StreakVisualizer } from './components/StreakVisualizer';
import { generateDailyGrow } from './services/geminiService';

const App = () => {
  const [view, setView] = useState<ViewState>('ONBOARDING');
  const [user, setUser] = useState<UserState>({
    hasOnboarded: false,
    level: 'FOUNDATION',
    bricks: [],
    userGrows: [],
    streak: { currentStreak: 0, totalCheckins: 0, lastCheckinDate: null, history: [] },
    lastVisitDate: null
  });
  const [daily, setDaily] = useState<DailyGrowContent>(DEFAULT_DAILY_GROW);

  useEffect(() => {
    const saved = localStorage.getItem('grow_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        if (parsed.hasOnboarded) setView('DASHBOARD');
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grow_state', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (view === 'DASHBOARD' && process.env.API_KEY) {
      generateDailyGrow(process.env.API_KEY).then(res => {
        if (res) setDaily(res);
      });
    }
  }, [view]);

  const addBrick = (label: string, type: BitachonBrick['type'] = 'TRUST') => {
    const today = new Date().toISOString().split('T')[0];
    const newBrick: BitachonBrick = { 
      id: Date.now().toString(), 
      date: today, 
      label, 
      type 
    };
    
    setUser(prev => {
      const isNewDay = prev.streak.lastCheckinDate !== today;
      const newHistory = isNewDay ? [...prev.streak.history, today] : prev.streak.history;
      
      return {
        ...prev,
        bricks: [...prev.bricks, newBrick],
        streak: {
          ...prev.streak,
          totalCheckins: prev.streak.totalCheckins + 1,
          lastCheckinDate: today,
          history: newHistory,
          currentStreak: isNewDay ? prev.streak.currentStreak + 1 : prev.streak.currentStreak
        }
      };
    });
    setView('DASHBOARD');
  };

  if (view === 'ONBOARDING') {
    return (
      <div className="min-h-screen bg-peach-50 flex flex-col items-center justify-center p-12 text-center space-y-8 animate-fade-in">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-sky-600 shadow-xl shadow-orange-100/50 animate-pulse">
          <Icons.Sprout size={48} />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-serif text-gray-900 tracking-tight">GROW</h1>
          <p className="text-gray-400 text-lg font-serif italic max-w-xs mx-auto">
            Build your internal home, one brick of trust at a time.
          </p>
        </div>
        <button 
          onClick={() => { setUser(p => ({...p, hasOnboarded: true})); setView('DASHBOARD'); }}
          className="bg-gray-900 text-white px-12 py-5 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all font-medium text-lg tracking-wide"
        >
          Begin
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-peach-50/40 flex flex-col text-gray-800 font-sans">
      <header className="p-8 flex justify-between items-center bg-transparent max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2 opacity-50">
          <Icons.Sprout size={18} className="text-emerald-600" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">{APP_NAME}</span>
        </div>
        <button className="text-gray-300 hover:text-gray-600 transition-colors">
          <Icons.Menu size={24} />
        </button>
      </header>

      <main className="flex-1 px-6 space-y-10 max-w-lg mx-auto w-full pb-32">
        <section className="space-y-4">
          <BitachonHouse bricks={user.bricks} />
          <p className="text-center text-gray-400 text-[11px] uppercase tracking-widest font-medium opacity-60">
            Current Foundation: {user.bricks.length} Bricks
          </p>
        </section>

        <section className="flex justify-center">
          <button 
            onClick={() => setView('MOMENT_FLOW')}
            className="group relative w-full overflow-hidden bg-white rounded-[2rem] border border-orange-100 shadow-lg shadow-orange-200/20 flex items-center justify-between px-8 py-10 hover:border-sky-200 transition-all active:scale-[0.98]"
          >
            <div className="text-left relative z-10">
              <h3 className="text-3xl font-serif text-gray-900 mb-1">I'm in a moment</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Training the response</p>
            </div>
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 group-hover:scale-110 group-hover:bg-sky-100 transition-all relative z-10">
              <Icons.Anchor size={32} />
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-sky-50/30 rounded-full blur-3xl group-hover:bg-sky-100/40 transition-all"></div>
          </button>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <StreakVisualizer streak={user.streak} />
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setView('CREATE_GROW')} 
              className="flex-1 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-sky-600 hover:border-sky-100 transition-all"
            >
              <Icons.Create size={28} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Quiet Space</span>
            </button>
             <button 
               onClick={() => setView('TEFILLAH')} 
               className="p-5 bg-sky-600 text-white rounded-2xl shadow-md flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest hover:bg-sky-700 active:scale-95 transition-all"
             >
               <Icons.Heart size={18} fill="currentColor" /> Tefillah
             </button>
          </div>
        </section>

        <section 
          onClick={() => setView('DAILY_GROW')}
          className="bg-white p-8 rounded-[2.5rem] border border-orange-50 shadow-sm space-y-5 cursor-pointer hover:shadow-xl transition-all group relative overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Daily Spark</span>
            </div>
            <Icons.ChevronRight size={16} className="text-gray-200 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-2xl font-serif text-gray-800 italic leading-snug">"{daily.theme}"</h4>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 italic">
            {daily.recognize}
          </p>
          <div className="absolute bottom-0 right-0 -mb-8 -mr-8 w-32 h-32 bg-emerald-50/20 rounded-full blur-2xl"></div>
        </section>
      </main>

      {/* Nav Bar Blur / Bottom spacer */}
      <div className="fixed bottom-0 inset-x-0 h-16 bg-gradient-to-t from-peach-50 to-transparent pointer-events-none"></div>

      {/* Overlays */}
      {view === 'MOMENT_FLOW' && <GrowMomentFlow onComplete={addBrick} onClose={() => setView('DASHBOARD')} />}
      {view === 'CREATE_GROW' && <CreateGrowFlow onComplete={(g, l) => addBrick(l, 'CONNECTION')} onClose={() => setView('DASHBOARD')} />}
      {view === 'DAILY_GROW' && <DailyGrowFlow content={daily} onComplete={addBrick} onClose={() => setView('DASHBOARD')} />}
      {view === 'TEFILLAH' && <TefillahView onClose={() => setView('DASHBOARD')} />}
    </div>
  );
};

export default App;
