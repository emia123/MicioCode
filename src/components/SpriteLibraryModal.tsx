import React from 'react';
import { X, Search } from 'lucide-react';
import { SpriteRenderer } from './SpriteRenderer';

export interface LibrarySpriteItem {
  name: string;
  iconName?: string;
  color?: string;
  category: string;
  customImage?: string;
  emoji?: string;
}

interface SpriteLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSprite: (sprite: LibrarySpriteItem) => void;
}

const SPRITES: LibrarySpriteItem[] = [
  // Angry Birds
  { name: 'Red', iconName: 'AngryRed', color: '#E53935', category: 'Angry Birds' },
  { name: 'Chuck', iconName: 'AngryChuck', color: '#FACC15', category: 'Angry Birds' },
  { name: 'Bomb', iconName: 'AngryBomb', color: '#1F2937', category: 'Angry Birds' },
  { name: 'Matilda', iconName: 'AngryMatilda', color: '#F9FAFB', category: 'Angry Birds' },
  { name: 'I Blues', iconName: 'AngryBlues', color: '#38BDF8', category: 'Angry Birds' },
  { name: 'Terence', iconName: 'AngryTerence', color: '#991B1B', category: 'Angry Birds' },
  { name: 'Stella', iconName: 'AngryStella', color: '#F472B6', category: 'Angry Birds' },
  { name: 'Silver', iconName: 'AngrySilver', color: '#94A3B8', category: 'Angry Birds' },
  { name: 'Bubbles', iconName: 'AngryBubbles', color: '#F97316', category: 'Angry Birds' },
  { name: 'Re Maiale', iconName: 'AngryKingPig', color: '#84CC16', category: 'Angry Birds' },
  { name: 'Maialino', iconName: 'AngryPig', color: '#84CC16', category: 'Angry Birds' },
  { name: 'Maiale Elmetto', iconName: 'AngryHelmetPig', color: '#84CC16', category: 'Angry Birds' },

  // Om Nom (Cut the Rope - Da Internet / URL Web)
  { 
    name: 'Om Nom (Web)', 
    customImage: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/fun-omnom.png', 
    color: '#65A30D', 
    category: 'Om Nom' 
  },
  { 
    name: 'Om Nom Scatola', 
    customImage: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/box_omnom.png', 
    color: '#65A30D', 
    category: 'Om Nom' 
  },
  { 
    name: 'Om Nom Icona', 
    customImage: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/pin-omnom.png', 
    color: '#65A30D', 
    category: 'Om Nom' 
  },
  { 
    name: 'Caramella (Web)', 
    customImage: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_candy_01.png', 
    color: '#EF4444', 
    category: 'Om Nom' 
  },
  { 
    name: 'Ragnetto (Web)', 
    customImage: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_spider.png', 
    color: '#1F2937', 
    category: 'Om Nom' 
  },
  { 
    name: 'Stella Dorata (Web)', 
    customImage: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/hud_star.png', 
    color: '#FACC15', 
    category: 'Om Nom' 
  },
  { 
    name: 'Bolla (Web)', 
    customImage: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_bubble_flight.png', 
    color: '#38BDF8', 
    category: 'Om Nom' 
  },
  // Nommies & personaggi vector aggiuntivi
  { name: 'Om Nelle', customImage: '/sprites/cuttherope/om_nelle.svg', iconName: 'OmNelle', color: '#F472B6', category: 'Om Nom' },
  { name: 'Nibble Nom', customImage: '/sprites/cuttherope/nibble_nom.svg', iconName: 'NibbleNom', color: '#4ADE80', category: 'Om Nom' },
  { name: 'Roto', customImage: '/sprites/cuttherope/roto.svg', iconName: 'OmNomRoto', color: '#FACC15', category: 'Om Nom' },
  { name: 'Toss', customImage: '/sprites/cuttherope/toss.svg', iconName: 'OmNomToss', color: '#F97316', category: 'Om Nom' },
  { name: 'Boo', customImage: '/sprites/cuttherope/boo.svg', iconName: 'OmNomBoo', color: '#818CF8', category: 'Om Nom' },
  { name: 'Lick', customImage: '/sprites/cuttherope/lick.svg', iconName: 'OmNomLick', color: '#A16207', category: 'Om Nom' },
  { name: 'Blue', customImage: '/sprites/cuttherope/blue.svg', iconName: 'OmNomBlue', color: '#38BDF8', category: 'Om Nom' },
  { name: 'Lumachina (Snailbrow)', customImage: '/sprites/cuttherope/snailbrow.svg', iconName: 'OmNomSnail', color: '#FBBF24', category: 'Om Nom' },
  { name: 'Ginger', customImage: '/sprites/cuttherope/ginger.svg', iconName: 'OmNomGinger', color: '#FB923C', category: 'Om Nom' },

  // Altri
  { name: 'Gatto', iconName: 'Cat', color: '#F59E0B', category: 'Animali' },
  { name: 'Cane', iconName: 'Dog', color: '#8B5CF6', category: 'Animali' },
  { name: 'Uccellino', iconName: 'Bird', color: '#3B82F6', category: 'Animali' },
  { name: 'Lumaca', iconName: 'Snail', color: '#10B981', category: 'Animali' },
  { name: 'Coniglio', iconName: 'Rabbit', color: '#EC4899', category: 'Animali' },
  { name: 'Tartaruga', iconName: 'Turtle', color: '#059669', category: 'Animali' },
  { name: 'Macchina', iconName: 'Car', color: '#EF4444', category: 'Veicoli' },
  { name: 'Razzo', iconName: 'Rocket', color: '#6366F1', category: 'Veicoli' },
  { name: 'Aereo', iconName: 'Plane', color: '#0EA5E9', category: 'Veicoli' },
  { name: 'Fantasmino', iconName: 'Ghost', color: '#9CA3AF', category: 'Fantasia' },
  { name: 'Stella', iconName: 'Star', color: '#EAB308', category: 'Natura' },
  { name: 'Cuore', iconName: 'Heart', color: '#F43F5E', category: 'Fantasia' },
  { name: 'Mela', iconName: 'Apple', color: '#EF4444', category: 'Cibo' },
  { name: 'Banana', iconName: 'Banana', color: '#FBBF24', category: 'Cibo' },
  { name: 'Ciliegia', iconName: 'Cherry', color: '#BE123C', category: 'Cibo' },
  { name: 'Pizza', iconName: 'Pizza', color: '#F59E0B', category: 'Cibo' },
  { name: 'Sole', iconName: 'Sun', color: '#F59E0B', category: 'Natura' },
  { name: 'Luna', iconName: 'Moon', color: '#6366F1', category: 'Natura' },
  { name: 'Nuvola', iconName: 'Cloud', color: '#9CA3AF', category: 'Natura' },
];

export const SpriteLibraryModal: React.FC<SpriteLibraryModalProps> = ({ isOpen, onClose, onSelectSprite }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('Tutti');

  if (!isOpen) return null;

  const filteredSprites = SPRITES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'Tutti' || s.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Scegli uno Sprite</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="border-b px-6 py-3 flex gap-4 items-center bg-gray-50">
          <div className="relative flex-grow max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cerca..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['Tutti', 'Angry Birds', 'Om Nom', 'Animali', 'Fantasia', 'Veicoli', 'Cibo', 'Natura'].map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  category === cat 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-grow p-6 overflow-y-auto bg-gray-50">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {filteredSprites.map((sprite, idx) => (
              <div 
                key={idx}
                onClick={() => onSelectSprite(sprite)}
                className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 hover:shadow-md transition aspect-square"
              >
                <SpriteRenderer 
                  iconName={sprite.iconName} 
                  color={sprite.color} 
                  customImage={sprite.customImage}
                  emoji={sprite.emoji}
                  size={48} 
                  className="mb-2" 
                />
                <span className="text-xs font-medium text-gray-700 truncate w-full text-center">{sprite.name}</span>
              </div>
            ))}
            {filteredSprites.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500">
                Nessuno sprite trovato
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
