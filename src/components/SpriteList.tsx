import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { Plus, Image as ImageIcon, X, Brush, Upload, Wand2, Layers, Globe } from 'lucide-react';
import { SpriteRenderer } from './SpriteRenderer';

export interface Sprite { 
  id: string;
  name: string;
  emoji?: string;
  iconName?: string;
  color?: string;
  isAzuro?: boolean;
  xml?: string;
  customImage?: string;
}

interface SpriteListProps {
  sprites: Sprite[];
  activeSpriteId: string;
  onSelect: (id: string) => void;
  onAction: (action: string) => void;
  onDelete?: (id: string) => void;
}

export const SpriteList: React.FC<SpriteListProps> = ({ sprites, activeSpriteId, onSelect, onAction, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const toggleDropdown = () => {
    if (buttonRef.current && !isDropdownOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.top, // We will translate this upwards in CSS
        left: rect.left
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col flex-grow overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sprite</span>
        <div className="flex gap-2 text-gray-400">
          <button className="hover:text-blue-500 transition p-1" title={t("ui.background")}>
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-3 flex flex-wrap gap-3 overflow-y-auto bg-gray-50 dark:bg-gray-900 flex-grow content-start">
        {sprites.map((sprite, idx) => (
          <div key={sprite.id} onClick={() => onSelect(sprite.id)} className={`group w-20 h-24 border-2 ${activeSpriteId === sprite.id ? "border-blue-500 bg-white dark:bg-gray-800" : "border-transparent bg-gray-100 dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-500"} rounded-xl flex flex-col items-center justify-center cursor-pointer shadow-sm relative transition-colors`}>
            <div className={`absolute top-1 left-1 ${activeSpriteId === sprite.id ? "bg-blue-500" : "bg-gray-400 dark:bg-gray-600"} text-white text-[10px] font-bold px-1.5 rounded`}>{idx + 1}</div>
            
            {onDelete && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (sprites.length > 1) {
                    onDelete(sprite.id);
                  }
                }}
                className={`absolute top-1 right-1 rounded-full p-0.5 transition-opacity ${sprites.length > 1 ? 'bg-red-500 text-white hover:bg-red-600 opacity-60 hover:opacity-100' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'}`}
                title={sprites.length > 1 ? "Elimina sprite" : "Non puoi eliminare l'unico sprite"}
                disabled={sprites.length <= 1}
              >
                <X className="w-3 h-3" />
              </button>
            )}

            <SpriteRenderer 
              isAzuro={sprite.isAzuro} 
              iconName={sprite.iconName} 
              color={sprite.color}
              emoji={sprite.emoji} 
              customImage={sprite.customImage}
              size={36} 
              className="mb-1"
            />
            
            <span className={`text-xs font-medium ${activeSpriteId === sprite.id ? "text-blue-700 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"} truncate w-full text-center px-1`}>{sprite.name}</span>
          </div>
        ))}
        
        {/* Aggiungi nuovo Sprite con menu a tendina */}
        <div className="relative" ref={buttonRef}>
          {isDropdownOpen && createPortal(
            <>
              <div className="fixed inset-0 z-[90]" onClick={() => setIsDropdownOpen(false)} />
              <div 
                className="fixed z-[100] w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col py-1"
                style={{ bottom: window.innerHeight - dropdownPos.top + 8, left: dropdownPos.left - 48 }}
              >
                <div className="text-[10px] font-bold px-3 py-1 text-gray-400 uppercase tracking-wider">Sprite</div>
                <button onClick={() => { onAction('select-sprite'); setIsDropdownOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors">
                  <Wand2 className="w-4 h-4" /> {t("ui.selectSprite")}
                </button>
                <button onClick={() => { onAction('draw-sprite'); setIsDropdownOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors">
                  <Brush className="w-4 h-4" /> {t("ui.drawSprite")}
                </button>
                <button onClick={() => { onAction('import-sprite'); setIsDropdownOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors">
                  <Upload className="w-4 h-4" /> {t("ui.importSprite")}
                </button>
                <button onClick={() => { onAction('import-sprite-url'); setIsDropdownOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors text-blue-600 dark:text-blue-400 font-medium">
                  <Globe className="w-4 h-4" /> {t("ui.importSpriteUrl")}
                </button>

                <div className="text-[10px] font-bold px-3 py-1 text-gray-400 uppercase tracking-wider border-t border-gray-100 dark:border-gray-700 mt-1 pt-2">Costumi</div>
                <button onClick={() => { onAction('new-costume'); setIsDropdownOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors">
                  <Layers className="w-4 h-4" /> {t("ui.newCostume")}
                </button>

                <div className="text-[10px] font-bold px-3 py-1 text-gray-400 uppercase tracking-wider border-t border-gray-100 dark:border-gray-700 mt-1 pt-2">Sfondo</div>
                <button onClick={() => { onAction('select-bg'); setIsDropdownOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors">
                  <ImageIcon className="w-4 h-4" /> {t("ui.selectBg")}
                </button>
                <button onClick={() => { onAction('draw-bg'); setIsDropdownOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors">
                  <Brush className="w-4 h-4" /> {t("ui.drawBg")}
                </button>
                <button onClick={() => { onAction('import-bg'); setIsDropdownOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors">
                  <Upload className="w-4 h-4" /> {t("ui.importBg")}
                </button>
              </div>
            </>,
            document.body
          )}
          <div 
            onClick={toggleDropdown} 
            className="w-20 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-blue-500 transition"
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{t("ui.new")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
