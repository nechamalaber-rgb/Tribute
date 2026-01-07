import React, { useState } from 'react';
import { TEFILLAH_STEPS } from '../constants';
import { Icons } from './Icon';

interface TefillahViewProps {
  onClose: () => void;
}

export const TefillahView: React.FC<TefillahViewProps> = ({ onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const step = TEFILLAH_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TEFILLAH_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-sky-50 flex flex-col h-full">
      <div className="p-6 flex justify-between items-center text-sky-900">
        <button onClick={onClose}><Icons.Close /></button>
        <span className="font-serif italic text-sm opacity-70">Guided Connection</span>
        <div className="w-6" /> 
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center max-w-lg mx-auto w-full animate-fade-in" key={currentStepIndex}>
        <div className="mb-6 opacity-60 text-sky-700">
            {step.mode === 'REFLECT' && <Icons.Wind size={32} />}
            {step.mode === 'JOURNAL' && <Icons.Tefillah size={32} />}
            {step.mode === 'READ' && <Icons.Heart size={32} />}
        </div>

        <h2 className="text-xl font-medium text-sky-900 mb-2 uppercase tracking-wide text-xs">{step.title}</h2>
        <p className="text-2xl md:text-3xl font-serif text-sky-950 leading-relaxed mb-8">
          {step.content}
        </p>

        {step.mode === 'JOURNAL' && (
          <div className="w-full bg-white/60 p-4 rounded-lg shadow-inner">
             <textarea 
               className="w-full bg-transparent border-none focus:ring-0 text-sky-900 placeholder:text-sky-900/40 text-lg resize-none text-center font-serif"
               rows={3}
               placeholder={step.prompt}
             />
          </div>
        )}
      </div>

      <div className="p-8 flex justify-between items-center w-full max-w-lg mx-auto">
        <button 
          onClick={handlePrev} 
          disabled={currentStepIndex === 0}
          className={`p-4 rounded-full transition-colors ${currentStepIndex === 0 ? 'opacity-0' : 'hover:bg-sky-100 text-sky-800'}`}
        >
          <Icons.ChevronRight className="rotate-180" />
        </button>
        
        <div className="flex gap-2">
            {TEFILLAH_STEPS.map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-full transition-all ${i === currentStepIndex ? 'bg-sky-600 scale-125' : 'bg-sky-200'}`} />
            ))}
        </div>

        <button 
          onClick={handleNext}
          className="p-4 rounded-full bg-sky-800 text-white shadow-lg hover:bg-sky-700 hover:scale-105 transition-all"
        >
          {currentStepIndex === TEFILLAH_STEPS.length - 1 ? <Icons.Check /> : <Icons.ChevronRight />}
        </button>
      </div>
    </div>
  );
};