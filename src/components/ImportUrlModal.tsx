import React, { useState, useMemo } from 'react';
import { X, Globe, Link, Sparkles, Check, AlertCircle, Search, Layers, Heart } from 'lucide-react';
import { CUT_THE_ROPE_PRESETS, WebSpritePreset } from '../lib/cutTheRopeSprites';

interface ImportUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (name: string, imageUrl: string) => void;
}

export const ImportUrlModal: React.FC<ImportUrlModalProps> = ({ isOpen, onClose, onImport }) => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [previewError, setPreviewError] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Tutti', 'Om Nom & Famiglia', 'Nommies', 'Oggetti di Gioco'];

  const filteredPresets = useMemo(() => {
    return CUT_THE_ROPE_PRESETS.filter(p => {
      const matchCategory = activeCategory === 'Tutti' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  const getFullWebUrl = (targetUrl: string) => {
    if (targetUrl.startsWith('/')) {
      return `${window.location.origin}${targetUrl}`;
    }
    return targetUrl;
  };

  const handleSelectPreset = (preset: WebSpritePreset) => {
    const resolvedUrl = getFullWebUrl(preset.url);
    setUrl(resolvedUrl);
    setName(preset.name);
    setPreviewError(false);
  };

  const handleQuickImport = (preset: WebSpritePreset) => {
    const resolvedUrl = getFullWebUrl(preset.url);
    onImport(preset.name, resolvedUrl);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://') && !trimmedUrl.startsWith('/') && !trimmedUrl.startsWith('data:image/')) {
      alert('Inserisci un URL valido che inizi con http://, https:// o /');
      return;
    }

    const spriteName = name.trim() || 'Sprite da URL';
    const finalUrl = getFullWebUrl(trimmedUrl);
    onImport(spriteName, finalUrl);
    setUrl('');
    setName('');
    setPreviewError(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Importa Sprite da URL Web & Personaggi</h2>
              <p className="text-xs text-blue-100">Om Nom, Om Nelle, Nibble Nom, Nommies e sprite personalizzati</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition"
            title="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-grow">
          
          {/* Quick Preset Characters Section */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Personaggi & Oggetti Web Pronti (Om Nom, Om Nelle, Nibble Nom...)
              </span>

              {/* Search bar inside presets */}
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca personaggio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 border-b border-gray-100 dark:border-gray-700 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {filteredPresets.length === 0 ? (
                <div className="col-span-full py-8 text-center text-xs text-gray-400">
                  Nessun personaggio trovato con "{searchQuery}"
                </div>
              ) : (
                filteredPresets.map((preset, idx) => {
                  const resolvedUrl = getFullWebUrl(preset.url);
                  const isSelected = url === resolvedUrl || url === preset.url;
                  return (
                    <div
                      key={idx}
                      className={`group relative p-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-400/40 shadow-sm'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-gray-50/70 dark:bg-gray-800/60 hover:shadow-sm'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className="flex items-center gap-3 flex-grow text-left overflow-hidden min-w-0"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-inner">
                          <img
                            src={preset.preview}
                            alt={preset.name}
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            className="max-h-full max-w-full object-contain pointer-events-none transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="min-w-0 flex-grow">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                              {preset.name}
                            </span>
                            {preset.tag && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800 shrink-0">
                                {preset.tag}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-1 line-clamp-1">
                            {preset.desc}
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickImport(preset)}
                        className="shrink-0 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[11px] font-semibold transition-all shadow-sm flex items-center gap-1"
                        title="Importa subito nello stage"
                      >
                        <span>+ Aggiungi</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Custom URL Form */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider block mb-3">
              Oppure Incolla un URL Personalizzato
            </span>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    URL Immagine (PNG, SVG, WebP, JPG)
                  </label>
                  <div className="relative">
                    <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="https://esempio.com/sprite.png"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setPreviewError(false);
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Nome dello Sprite
                  </label>
                  <input
                    type="text"
                    placeholder="Es. Nibble Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Live Preview Box */}
              {url.trim() && (
                <div className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1.5 overflow-hidden shadow-sm shrink-0">
                    {previewError ? (
                      <AlertCircle className="w-6 h-6 text-amber-500" />
                    ) : (
                      <img
                        src={url}
                        alt="Anteprima"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        className="max-h-full max-w-full object-contain pointer-events-none"
                        onError={() => setPreviewError(true)}
                      />
                    )}
                  </div>
                  <div className="text-xs flex-grow min-w-0">
                    {previewError ? (
                      <span className="text-red-500 font-medium">
                        Impossibile caricare l'anteprima. Verifica che l'URL sia valido e permetta l'incorporamento.
                      </span>
                    ) : (
                      <div>
                        <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                          <Check className="w-4 h-4" /> Anteprima caricata con successo!
                        </span>
                        <span className="text-[11px] text-gray-500 truncate block mt-0.5 max-w-md">
                          {name || 'Sprite'} pronto per essere inserito nello stage.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-sm transition"
                >
                  Importa nello Stage
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
