import React from 'react';
import { UserStreak } from '../types';
import { STREAK_MESSAGES } from '../constants';

interface StreakVisualizerProps {
  streak: UserStreak;
}

export const StreakVisualizer: React.FC<StreakVisualizerProps> = ({ streak }) => {
  const days = [];
  for (let i = 4; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }

  const getMessage = () => {
    if (streak.currentStreak === 0 && streak.totalCheckins > 0) return STREAK_MESSAGES.PAUSED;
    if (streak.currentStreak <= 1) return STREAK_MESSAGES.START;
    if (streak.currentStreak < 5) return STREAK_MESSAGES.BUILDING;
    return STREAK_MESSAGES.STRONG;
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Continuity</h3>
          <p className="text-xs text-stone-500 font-serif italic leading-tight">{getMessage()}</p>
        </div>
        <div className="text-right">
           <span className="text-3xl font-serif text-emerald-500 font-bold">{streak.totalCheckins}</span>
           <span className="text-[8px] font-bold text-stone-400 block uppercase tracking-tighter">Returns</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 relative px-1">
        <div className="absolute top-[11px] left-4 right-4 h-[1px] bg-stone-50 -z-0" />
        
        {days.map((dateStr, index) => {
          const isActive = streak.history.includes(dateStr);
          const isToday = dateStr === new Date().toISOString().split('T')[0];
          
          return (
            <div key={dateStr} className="flex flex-col items-center gap-2 relative z-10">
              <div 
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-700
                  ${isActive 
                    ? 'bg-emerald-50 border-emerald-300 scale-110 shadow-sm' 
                    : 'bg-white border-stone-100'}
                  ${isToday && !isActive ? 'animate-pulse border-orange-200' : ''}
                `}
              >
                {isActive && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-scale-in" />}
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-tighter ${isActive ? 'text-emerald-500' : 'text-stone-300'}`}>
                {index === 4 ? 'Today' : new Date(dateStr).toLocaleDateString('en-US', { weekday: 'narrow' })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
