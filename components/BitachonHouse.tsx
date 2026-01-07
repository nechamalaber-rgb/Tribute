import React from 'react';
import { BitachonBrick } from '../types';

interface BitachonHouseProps {
  bricks: BitachonBrick[];
}

export const BitachonHouse: React.FC<BitachonHouseProps> = ({ bricks }) => {
  const brickCount = bricks.length;
  const baseWidth = 6;
  
  const rows = [];
  let currentBrickIndex = 0;

  while (currentBrickIndex < brickCount) {
    const rowBricks = [];
    for (let i = 0; i < baseWidth && currentBrickIndex < brickCount; i++) {
      rowBricks.push(bricks[currentBrickIndex]);
      currentBrickIndex++;
    }
    rows.push(rowBricks);
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-sm rounded-[3rem] shadow-inner border border-white/40 min-h-[360px] w-full relative overflow-hidden transition-all duration-1000">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
           <circle cx="15%" cy="25%" r="60" fill="#bae6fd" />
           <circle cx="80%" cy="18%" r="45" fill="#bae6fd" />
           <circle cx="50%" cy="10%" r="30" fill="#bae6fd" />
        </svg>
      </div>
      
      <div className="relative z-10 transition-all duration-700 ease-in-out w-full flex flex-col items-center">
        {brickCount === 0 ? (
          <div className="text-center text-sky-800/40 p-8">
            <p className="mb-4 text-2xl font-serif italic">The foundation is waiting.</p>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Build your internal home</p>
          </div>
        ) : (
          <div className="flex flex-col-reverse items-center w-full">
            {/* Ground line */}
            <div className="w-full max-w-[280px] h-[1px] bg-stone-100 mt-4"></div>
            
            {/* Bricks Container */}
            <div className="flex flex-col-reverse gap-1 mb-2">
              {rows.map((row, rowIndex) => (
                <div 
                  key={rowIndex} 
                  className="flex gap-1 justify-center animate-slide-up" 
                  style={{animationDelay: `${rowIndex * 100}ms`}}
                >
                  {row.map((brick) => (
                    <div
                      key={brick.id}
                      className={`
                        h-7 w-12 rounded-sm shadow-sm border border-black/5 
                        transition-all duration-700 hover:scale-125 hover:z-20 cursor-help
                        ${brick.type === 'TRUST' ? 'bg-orange-200 shadow-orange-100' : 
                          brick.type === 'PAUSE' ? 'bg-emerald-200 shadow-emerald-100' : 
                          brick.type === 'CONNECTION' ? 'bg-sky-200 shadow-sky-100' : 'bg-stone-100'}
                      `}
                      title={`${brick.date}: ${brick.label}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Roof - Only shows when some progress is made */}
            {brickCount > 0 && (
              <div 
                className={`
                  w-0 h-0 border-l-[140px] border-r-[140px] border-b-[80px] 
                  border-l-transparent border-r-transparent border-b-orange-400/90 
                  drop-shadow-2xl mb-1 transition-all duration-1000 transform
                  ${brickCount > 12 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                `} 
              />
            )}
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 text-[9px] font-bold uppercase tracking-[0.4em] text-stone-300">
        Inner Sanctuary
      </div>
    </div>
  );
};
