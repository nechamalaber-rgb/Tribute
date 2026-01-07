
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icon';
import { MOMENT_TRIGGERS, MOMENT_ACTIONS } from '../constants';

interface GrowMomentFlowProps {
  onComplete: (brickLabel: string) => void;
  onClose: () => void;
}

export const GrowMomentFlow: React.FC<GrowMomentFlowProps> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState<'RECOGNIZE' | 'YEARN' | 'TRUST' | 'GROW'>('RECOGNIZE');
  const [trustProgress, setTrustProgress] = useState(0);
  const holdInterval = useRef<number | null>(null);

  const startHolding = () => {
    holdInterval.current = window.setInterval(() => {
      setTrustProgress(p => p >= 100 ? 100 : p + 2.5);
    }, 30);
  };

  const stopHolding = () => {
    if (holdInterval.current) clearInterval(holdInterval.current);
    if (trustProgress < 100) setTrustProgress(0);
  };

  useEffect(() => {
    if (trustProgress >= 100) {
      setTimeout(() => setStep('GROW'), 400);
    }
  }, [trustProgress]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-8 text-center animate-fade-in text-gray-900">
      <header className="w-full flex justify-start">
        <button onClick={onClose} className="text-gray-300 hover:text-gray-600 p-2 transition-colors">
          <Icons.Close size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center max-w-sm w-full gap-12">
        {step === 'RECOGNIZE' && (
          <div className="animate-slide-up space-y-6">
            <h2 className="text-4xl font-serif text-gray-900">Pause.</h2>
            <p className="text-gray-500 text-lg leading-relaxed">You are not alone. Notice what is happening without judgment.</p>
            <div className="grid grid-cols-2 gap-3 pt-4">
              {MOMENT_TRIGGERS.map(t => (
                <button key={t.id} onClick={() => setStep('YEARN')} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-left hover:border-sky-200 transition-all group">
                  <p className="font-bold text-gray-800 group-hover:text-sky-700">{t.label}</p>
                  <p className="text-xs text-gray-400">{t.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'YEARN' && (
          <div className="animate-slide-up space-y-8">
            <h2 className="text-2xl font-serif text-gray-900 italic">What do you wish was different right now?</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Peace', 'Clarity', 'Courage', 'Patience'].map(y => (
                <button key={y} onClick={() => setStep('TRUST')} className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-sky-50 transition-all">{y}</button>
              ))}
            </div>
            <input 
              type="text" 
              placeholder="Or name it here..." 
              className="w-full border-b border-gray-200 py-2 text-center text-xl outline-none focus:border-sky-500 text-gray-900"
              onKeyDown={(e) => e.key === 'Enter' && setStep('TRUST')}
            />
          </div>
        )}

        {step === 'TRUST' && (
          <div className="animate-slide-up space-y-12">
            <div>
              <h2 className="text-4xl font-serif text-sky-900 leading-tight">I trust You,<br/>Hashem.</h2>
            </div>
            <div 
              className="relative w-56 h-56 mx-auto cursor-pointer select-none touch-none"
              onMouseDown={startHolding} onMouseUp={stopHolding} onTouchStart={startHolding} onTouchEnd={stopHolding}
            >
              <svg className="w-full h-full -rotate-90">
                <circle cx="112" cy="112" r="100" fill="transparent" stroke="#f3f4f6" strokeWidth="8" />
                <circle cx="112" cy="112" r="100" fill="transparent" stroke="#0ea5e9" strokeWidth="8" 
                  strokeDasharray="628" strokeDashoffset={628 - (628 * trustProgress) / 100}
                  className="transition-all duration-75" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icons.Anchor size={48} className={trustProgress > 0 ? 'text-sky-600 scale-110 transition-transform' : 'text-gray-200'} />
                <span className="text-[10px] uppercase tracking-widest text-sky-400 mt-4">Hold Screen</span>
              </div>
            </div>
          </div>
        )}

        {step === 'GROW' && (
          <div className="animate-slide-up space-y-8">
            <h2 className="text-2xl font-serif text-gray-900">What does trust look like for the next 10 minutes?</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {MOMENT_ACTIONS.map(a => (
                <button key={a.id} onClick={() => onComplete(a.label)} className="px-6 py-4 bg-gray-900 text-white rounded-2xl shadow-lg hover:bg-sky-900 transition-all">
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="h-20" />
    </div>
  );
};
