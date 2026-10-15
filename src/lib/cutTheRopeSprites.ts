// Dati e Web URL per Cut the Rope, Om Nelle, Nibble Nom & Nommies
export interface WebSpritePreset {
  name: string;
  category: 'Om Nom & Famiglia' | 'Nommies' | 'Oggetti di Gioco';
  url: string;
  preview: string;
  desc: string;
  tag?: string;
}

export const CUT_THE_ROPE_PRESETS: WebSpritePreset[] = [
  // --- OM NOM & FAMIGLIA ---
  {
    name: 'Om Nom (Classico)',
    category: 'Om Nom & Famiglia',
    url: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/fun-omnom.png',
    preview: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/fun-omnom.png',
    desc: 'Om Nom felice originale Cut the Rope HD',
    tag: 'Web HD'
  },
  {
    name: 'Om Nom (Scatola)',
    category: 'Om Nom & Famiglia',
    url: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/box_omnom.png',
    preview: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/box_omnom.png',
    desc: 'Om Nom che fa capolino dalla scatola di cartone',
    tag: 'Web HD'
  },
  {
    name: 'Om Nom (Icona Pin)',
    category: 'Om Nom & Famiglia',
    url: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/pin-omnom.png',
    preview: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/ui/pin-omnom.png',
    desc: 'Om Nom primo piano iconico ufficiale',
    tag: 'Web HD'
  },
  {
    name: 'Om Nelle',
    category: 'Om Nom & Famiglia',
    url: '/sprites/cuttherope/om_nelle.svg',
    preview: '/sprites/cuttherope/om_nelle.svg',
    desc: 'La compagna di Om Nom con fiocco viola e ciglia',
    tag: 'Web SVG'
  },
  {
    name: 'Om Nom & Om Nelle (Run)',
    category: 'Om Nom & Famiglia',
    url: 'https://raw.githubusercontent.com/sogful/candies.monster/main/versions/icons/com.momzikov.omnomrun.google/icon.png',
    preview: 'https://raw.githubusercontent.com/sogful/candies.monster/main/versions/icons/com.momzikov.omnomrun.google/icon.png',
    desc: 'Om Nom e Om Nelle supereroi dal web game ufficiale',
    tag: 'Web HD'
  },
  {
    name: 'Nibble Nom',
    category: 'Om Nom & Famiglia',
    url: '/sprites/cuttherope/nibble_nom.svg',
    preview: '/sprites/cuttherope/nibble_nom.svg',
    desc: 'Il cucciolo verde brillante figlio di Om Nom e Om Nelle',
    tag: 'Web SVG'
  },
  {
    name: 'Nibble Nom (Avventura)',
    category: 'Om Nom & Famiglia',
    url: 'https://raw.githubusercontent.com/sogful/candies.monster/main/versions/icons/com.zeptodev.nibblenombigadventure/icon-3.png',
    preview: 'https://raw.githubusercontent.com/sogful/candies.monster/main/versions/icons/com.zeptodev.nibblenombigadventure/icon-3.png',
    desc: 'Nibble Nom icona web dal gioco ufficiale ZeptoLab',
    tag: 'Web HD'
  },

  // --- I NOMMIES ---
  {
    name: 'Roto',
    category: 'Nommies',
    url: '/sprites/cuttherope/roto.svg',
    preview: '/sprites/cuttherope/roto.svg',
    desc: 'Il Nommie volante con elicottero in testa per trasportare oggetti',
    tag: 'Web SVG'
  },
  {
    name: 'Toss',
    category: 'Nommies',
    url: '/sprites/cuttherope/toss.svg',
    preview: '/sprites/cuttherope/toss.svg',
    desc: 'Il Nommie arancione a molla con piattino lanciatore',
    tag: 'Web SVG'
  },
  {
    name: 'Boo',
    category: 'Nommies',
    url: '/sprites/cuttherope/boo.svg',
    preview: '/sprites/cuttherope/boo.svg',
    desc: 'Il Nommie fantasma birichino che fa fare salti giganti',
    tag: 'Web SVG'
  },
  {
    name: 'Lick',
    category: 'Nommies',
    url: '/sprites/cuttherope/lick.svg',
    preview: '/sprites/cuttherope/lick.svg',
    desc: 'Il Nommie marrone con la lingua lunghissima da usare come ponte',
    tag: 'Web SVG'
  },
  {
    name: 'Blue',
    category: 'Nommies',
    url: '/sprites/cuttherope/blue.svg',
    preview: '/sprites/cuttherope/blue.svg',
    desc: 'Il Nommie azzurro moltiplicatore che crea torri',
    tag: 'Web SVG'
  },
  {
    name: 'Blue (Arte Web)',
    category: 'Nommies',
    url: 'https://raw.githubusercontent.com/sogful/candies.monster/main/levels/assets/images/ads/blue.png',
    preview: 'https://raw.githubusercontent.com/sogful/candies.monster/main/levels/assets/images/ads/blue.png',
    desc: 'Artwork promozionale web di Blue Nommie da ZeptoLab',
    tag: 'Web HD'
  },
  {
    name: 'Snailbrow',
    category: 'Nommies',
    url: '/sprites/cuttherope/snailbrow.svg',
    preview: '/sprites/cuttherope/snailbrow.svg',
    desc: 'La simpatica lumachina con baffi che rotola sulle pareti',
    tag: 'Web SVG'
  },
  {
    name: 'Ginger',
    category: 'Nommies',
    url: '/sprites/cuttherope/ginger.svg',
    preview: '/sprites/cuttherope/ginger.svg',
    desc: 'Il vivace Nommie fiammella da Cut the Rope: Magic',
    tag: 'Web SVG'
  },

  // --- OGGETTI DI GIOCO ---
  {
    name: 'Caramella Gommosa',
    category: 'Oggetti di Gioco',
    url: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_candy_01.png',
    preview: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_candy_01.png',
    desc: 'La famosa caramella a strisce rosse e gialle di Cut the Rope',
    tag: 'Web HD'
  },
  {
    name: 'Ragnetto Dispettoso',
    category: 'Oggetti di Gioco',
    url: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_spider.png',
    preview: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_spider.png',
    desc: 'Il ragno nero dispettoso che scala il filo per rubare la caramella',
    tag: 'Web HD'
  },
  {
    name: 'Stella Dorata',
    category: 'Oggetti di Gioco',
    url: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/hud_star.png',
    preview: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/hud_star.png',
    desc: 'Stella dorata luminosa da collezionare in ogni livello',
    tag: 'Web HD'
  },
  {
    name: 'Bolla d\'Aria',
    category: 'Oggetti di Gioco',
    url: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_bubble_flight.png',
    preview: 'https://raw.githubusercontent.com/yell0wsuit/CutTheRope/master/images/1024/game/obj_bubble_flight.png',
    desc: 'Bolla di sapone per far fluttuare la caramella verso l\'alto',
    tag: 'Web HD'
  }
];
