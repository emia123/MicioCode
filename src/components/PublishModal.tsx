import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (title: string, description: string, credits: string, tags: string[]) => Promise<void>;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onPublish }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [credits, setCredits] = useState('');
  const [tagsString, setTagsString] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tags = tagsString.split(',').map(t => t.trim()).filter(t => t !== '');
      await onPublish(title, description, credits, tags);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-500" />
            Pubblica Progetto
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titolo Progetto</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Il mio super gattino"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione e Istruzioni</label>
              <textarea
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Come si gioca? Cosa fa questo progetto?"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note e Crediti</label>
              <textarea
                value={credits}
                onChange={e => setCredits(e.target.value)}
                placeholder="Chi ti ha aiutato? Hai usato risorse di altri?"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tag (separati da virgola)</label>
              <input
                type="text"
                value={tagsString}
                onChange={e => setTagsString(e.target.value)}
                placeholder="giochi, animazione, musica"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <button
              type="submit"
              disabled={loading || !title.trim() || !description.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Pubblicazione...' : 'Pubblica in Esplora'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
