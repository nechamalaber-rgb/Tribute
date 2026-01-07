import React, { useState, useEffect } from 'react';
import { DailyGrowContent, BitachonBrick } from '../types';
import { Icons } from './Icon';

interface DailyGrowFlowProps {
  content: DailyGrowContent;
  onComplete: (brickLabel: string) => void;
  onClose: () => void;
}

type Step = 'INTRO' | 'RECOGNIZE' | 'YEARN' | 'TRUST' | 'GROW' | 'COMPLETE';

export const DailyGrowFlow: React.FC<DailyGrowFlowProps> = ({ content, onComplete, onClose }) => {
  const [step, setStep] = useState<Step>('INTRO');
  const [journalEntry, setJournalEntry] = useState('');

  const nextStep = () => {
    switch (step) {
      case 'INTRO': setStep('RECOGNIZE'); break;
      case 'RECOGNIZE': setStep('YEARN'); break;
      case 'YEARN': setStep('TRUST'); break;
      case 'TRUST': setStep('GROW'); break;
      case 'GROW': setStep('COMPLETE'); break;
      case 'COMPLETE': 
        onComplete(journalEntry || "I chose connection");
        break;
    }
  };

  // Auto-advance intro for smoother feel? No, let user control pace.

  return (
    <div className="fixed inset-0 z-50 bg-peach-50 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-2">
        <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600">
          <Icons.Close size={24} />
        </button>
        <div className="flex gap-1">
          {['RECOGNIZE', 'YEARN', 'TRUST', 'GROW'].map((s, i) => {
             const active = ['RECOGNIZE', 'YEARN', 'TRUST', 'GROW', 'COMPLETE'].indexOf(step) >= i;
             return (
               <div key={s} className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${active ? 'bg-emerald-500' : 'bg-stone-200'}`} />
             );
          })}
        </div>
        <div className="w-8" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-8 pb-12 max-w-2xl mx-auto w-full text-center">
        
        {step === 'INTRO' && (
          <div className="animate-fade-in space-y-6">
            <div className="inline-block p-4 bg-white rounded-full shadow-sm mb-4">
              <Icons.Sun className="text-orange-400 w-8 h-8" />
            </div>
            <h2 className="text-3xl font-serif text-stone-800">{content.theme}</h2>
            {content.source && <p className="text-stone-500 italic">{content.source}</p>}
            <p className="text-stone-600 mt-4 leading-relaxed max-w-md mx-auto">
              Take a deep breath. Let's find the sea before we step onto dry land.
            </p>
          </div>
        )}

        {step === 'RECOGNIZE' && (
          <div className="animate-slide-up space-y-6">
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Step 1: Recognize</span>
            <h3 className="text-2xl font-serif text-stone-800">What is holding you up?</h3>
            <p className="text-lg text-stone-600 leading-relaxed bg-white/50 p-6 rounded-2xl border border-white/60 shadow-sm">
              {content.recognize}
            </p>
          </div>
        )}

        {step === 'YEARN' && (
          <div className="animate-slide-up space-y-6">
            <span className="text-xs font-bold tracking-widest text-purple-600 uppercase">Step 2: Yearn</span>
            <h3 className="text-2xl font-serif text-stone-800">What does your soul ask for?</h3>
            <p className="text-lg text-stone-600 leading-relaxed bg-white/50 p-6 rounded-2xl border border-white/60 shadow-sm">
              {content.yearn}
            </p>
          </div>
        )}

        {step === 'TRUST' && (
          <div className="animate-slide-up space-y-6">
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Step 3: Trust</span>
            <div className="py-8">
              <h3 className="text-3xl font-serif text-sky-800 mb-4">"I trust You, Hashem."</h3>
              <p className="text-stone-600 leading-relaxed">{content.trust}</p>
            </div>
          </div>
        )}

        {step === 'GROW' && (
          <div className="animate-slide-up space-y-6 w-full">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Step 4: Grow</span>
            <h3 className="text-2xl font-serif text-stone-800">Taking it into dry land</h3>
            <p className="text-lg text-stone-600 mb-8">{content.grow}</p>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 w-full">
              <label className="block text-sm text-stone-500 mb-2">What brick are you adding today? (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g., I paused before reacting..." 
                className="w-full text-lg border-b border-stone-200 pb-2 focus:outline-none focus:border-emerald-500 text-stone-800 placeholder:text-stone-300 bg-transparent transition-all"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 'COMPLETE' && (
           <div className="animate-scale-in text-center space-y-6">
             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
               <Icons.Check size={40} />
             </div>
             <h2 className="text-2xl font-serif text-stone-800">Brick Added</h2>
             <p className="text-stone-600">You have added a moment of trust to your home.</p>
           </div>
        )}

      </div>

      {/* Footer / Action */}
      <div className="p-8 pb-12 flex justify-center bg-gradient-to-t from-peach-50 to-transparent">
        {step !== 'COMPLETE' ? (
          <button 
            onClick={nextStep}
            className="w-full max-w-sm bg-stone-800 text-white py-4 rounded-xl font-medium shadow-lg hover:bg-stone-700 transition-all flex items-center justify-center gap-2"
          >
            {step === 'INTRO' ? 'Begin' : 'Continue'} <Icons.ChevronRight size={18} />
          </button>
        ) : (
          <button 
            onClick={nextStep}
            className="w-full max-w-sm bg-emerald-600 text-white py-4 rounded-xl font-medium shadow-lg hover:bg-emerald-700 transition-all"
          >
            Return Home
          </button>
        )}
      </div>
    </div>
  );
};