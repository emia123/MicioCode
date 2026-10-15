import React from 'react';
import { Play, Square, Fullscreen } from 'lucide-react';
import { SpriteRenderer } from './SpriteRenderer';
import { Sprite } from './SpriteList';

export interface SpriteState {
  x: number;
  y: number;
  direction: number;
  size: number;
  visible: boolean;
  message: string | null;
  messageType?: "say" | "think" | "shout";
  effects: {
    grayscale: number;
    colore: number;
    pixel: number;
    luminosita: number;
    fantasma: number;
  };
  costume: number;
  speed: number;
}

export interface StageProps {
  sprites: Sprite[];
  spriteStates: Record<string, SpriteState>;
  isRunning: boolean;
  onPlay: () => void;
  onStop: () => void;
  onSpriteClick?: (id: string) => void;
  backgroundImage?: string | null;
  onEditBackground?: () => void;
}

export const Stage: React.FC<StageProps> = ({ sprites, spriteStates, isRunning, onPlay, onStop, onSpriteClick, backgroundImage, onEditBackground }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden flex flex-col h-[400px]">
      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={onPlay}
            className={`p-1.5 rounded-full transition ${isRunning ? 'bg-green-100 text-green-500 ring-2 ring-green-400 dark:bg-green-900/40 dark:text-green-400' : 'hover:bg-green-100 text-green-600 dark:hover:bg-green-900/40 dark:text-green-500'}`}
            title="Avvia Script (🚩 All'avvio)"
          >
            <Play className="w-5 h-5 fill-current" />
          </button>
          <button 
            onClick={onStop}
            className="p-1.5 rounded-full hover:bg-red-100 text-red-500 dark:hover:bg-red-900/40 dark:text-red-400 transition"
            title="Ferma Tutto (🟥 Ferma)"
          >
            <Square className="w-5 h-5 fill-current" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Stage (480 x 360)</span>
          <button onClick={onEditBackground} className="p-1.5 rounded-md text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition" title="Disegna Sfondo">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition" title="Schermo intero">
            <Fullscreen className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div 
        className="flex-grow relative overflow-hidden flex items-center justify-center select-none"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: backgroundImage ? `url("${backgroundImage}")` : 'none',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Stage Center Crosshair Marker (Subtle) */}
        <div className="absolute w-4 h-4 border border-dashed border-gray-300 rounded-full opacity-40 pointer-events-none"></div>

        {sprites.map(sprite => {
          const state: SpriteState = spriteStates[sprite.id] || {
            x: 0,
            y: 0,
            direction: 90,
            size: 100,
            visible: true,
            message: null,
            effects: { grayscale: 0, colore: 0, pixel: 0, luminosita: 100, fantasma: 0 },
            costume: 1,
            speed: 10
          };

          if (!state.visible) return null;

          const scale = Math.max(0.1, (state.size || 100) / 100);
          const filterStyles = [
            state.effects?.grayscale ? `grayscale(${state.effects.grayscale}%)` : '',
            state.effects?.colore ? `hue-rotate(${state.effects.colore}deg)` : '',
            state.effects?.pixel ? `blur(${state.effects.pixel / 10}px)` : '',
            state.effects?.luminosita && state.effects.luminosita !== 100 ? `brightness(${state.effects.luminosita}%)` : '',
          ].filter(Boolean).join(' ');

          const ghostOpacity = 1 - (Math.min(100, Math.max(0, state.effects?.fantasma || 0)) / 100);

          return (
            <div 
              key={sprite.id}
              className="absolute transition-transform duration-75 origin-center"
              style={{
                transform: `translate(${state.x}px, ${-state.y}px) rotate(${state.direction - 90}deg) scale(${scale})`,
                filter: filterStyles || undefined,
                opacity: ghostOpacity,
              }}
            >
              {state.message && (
                <div 
                  className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white border-2 shadow-md whitespace-nowrap z-20 font-bold text-sm pointer-events-none ${
                    state.messageType === 'shout' 
                      ? 'border-red-500 rounded-sm text-red-600 uppercase font-extrabold px-4 py-2' 
                      : state.messageType === 'think'
                      ? 'border-blue-300 rounded-[2rem] text-gray-700 italic px-4 py-2'
                      : 'border-gray-300 rounded-2xl text-gray-800 px-3 py-1.5'
                  }`}
                  style={{ transform: `rotate(${-(state.direction - 90)}deg)` }}
                >
                  {state.message}
                  {state.messageType === 'think' ? (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 mt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white border-2 border-blue-300 ml-2"></div>
                    </div>
                  ) : state.messageType === 'shout' ? (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-4 h-4 bg-white border-b-2 border-r-2 border-red-500 transform rotate-45 skew-x-12 skew-y-12"></div>
                  ) : (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-3 h-3 bg-white border-b-2 border-r-2 border-gray-300 transform rotate-45"></div>
                  )}
                </div>
              )}
              
              <div 
                onClick={(e) => { e.stopPropagation(); if (onSpriteClick) onSpriteClick(sprite.id); }} 
                className="cursor-pointer pointer-events-auto hover:opacity-95 transition"
              >
                {sprite.isAzuro ? (
                  <SpriteRenderer isAzuro={true} customImage={sprite.customImage} size={96} costume={state.costume || 1} />
                ) : (
                  <SpriteRenderer 
                    iconName={sprite.iconName}
                    color={sprite.color}
                    emoji={sprite.emoji}
                    customImage={sprite.customImage}
                    size={96} 
                    costume={state.costume || 1}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
