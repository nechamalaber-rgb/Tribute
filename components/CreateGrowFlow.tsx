
import React, { useState } from 'react';
import { UserCreatedGrow } from '../types';
import { Icons } from './Icon';

interface CreateGrowFlowProps {
  onComplete: (data: UserCreatedGrow, brickLabel: string) => void;
  onClose: () => void;
}

export const CreateGrowFlow: React.FC<CreateGrowFlowProps> = ({ onComplete, onClose }) => {
  const [isGuided, setIsGuided] = useState(false);
  const [text, setText] = useState('');

  const handleComplete = () => {
    onComplete({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      recognize: text,
      yearn: '',
      trust: 'Implicit',
      grow: ''
    }, text.substring(0, 20) || 'My Quiet Space');
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col h-full animate-fade-in text-gray-900">
      <header className="p-6 flex justify-between items-center border-b border-gray-100 bg-white">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <Icons.Close size={24} />
        </button>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setIsGuided(false)} 
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${!isGuided ? 'bg-white shadow text-gray-900' : 'text-gray-400'}`}
          >
            Quiet
          </button>
          <button 
            onClick={() => setIsGuided(true)} 
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${isGuided ? 'bg-white shadow text-gray-900' : 'text-gray-400'}`}
          >
            Guided
          </button>
        </div>
        <div className="w-6" />
      </header>
      
      <main className="flex-1 p-8 bg-white overflow-hidden flex flex-col">
        <textarea 
          autoFocus
          className="w-full flex-1 resize-none outline-none text-xl md:text-2xl font-serif text-gray-900 placeholder:text-gray-200 leading-relaxed bg-white border-none focus:ring-0"
          placeholder={isGuided ? "What is happening right now? Speak to Hashem..." : "Write freely in your quiet space..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </main>

      <footer className="p-8 bg-white border-t border-gray-50 flex justify-end">
        <button 
          onClick={handleComplete}
          disabled={!text.trim()}
          className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-medium disabled:opacity-30 transition-all shadow-xl active:scale-95"
        >
          Add to Foundation
        </button>
      </footer>
    </div>
  );
};
