import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Globe } from 'lucide-react';

interface ExtensionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExtension: (extId: string) => void;
  activeExtensions: string[];
}

export const ExtensionsModal: React.FC<ExtensionsModalProps> = ({ isOpen, onClose, onAddExtension, activeExtensions }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-3xl flex flex-col overflow-hidden max-h-[80vh]">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {t("ui.extensionsTitle") || "Libreria Estensioni"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Richieste Web Extension */}
            <div 
              onClick={() => {
                if (!activeExtensions.includes('web_requests')) {
                  onAddExtension('web_requests');
                  onClose();
                }
              }}
              className={`border-2 rounded-xl overflow-hidden flex flex-col transition cursor-pointer ${
                activeExtensions.includes('web_requests') 
                  ? 'border-gray-300 dark:border-gray-600 opacity-60 cursor-default' 
                  : 'border-transparent bg-gray-100 dark:bg-gray-700 hover:border-green-500 hover:shadow-lg'
              }`}
            >
              <div className="h-24 bg-green-700 flex items-center justify-center relative overflow-hidden">
                <svg width="100" height="100" viewBox="0 0 100 100" className="absolute opacity-20 transform scale-150">
                  <path d="M10 50 A 40 40 0 1 0 90 50 A 40 40 0 1 0 10 50" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M50 10 C 20 10 20 90 50 90 C 80 90 80 10 50 10" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M10 50 L 90 50" fill="none" stroke="white" strokeWidth="2" />
                </svg>
                <Globe className="w-12 h-12 text-white z-10" />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 flex-grow">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-1">
                  {t("ui.webRequestsTitle") || "Richieste Web"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("ui.webRequestsDesc") || "Invia richieste HTTP GET, POST ed elabora API JSON."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
