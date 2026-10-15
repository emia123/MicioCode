import React, { useState, useRef, useEffect } from 'react';
import * as Blockly from 'blockly/core';
import { BlocklyEditor } from './components/BlocklyEditor';
import { ExtensionsModal } from './components/ExtensionsModal';
import { AuthModal } from './components/AuthModal';
import { PublishModal } from './components/PublishModal';
import { ExploreProjects } from './components/ExploreProjects';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { MyProjects } from './components/MyProjects';
import { LoadingScreen } from './components/LoadingScreen';
import { AzuroIcon } from './components/AzuroIcon';
import { Stage } from './components/Stage';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SpriteList } from './components/SpriteList';
import { SpriteLibraryModal } from './components/SpriteLibraryModal';
import { ImportUrlModal } from './components/ImportUrlModal';
import { Package, Save, FolderOpen, UploadCloud, Compass, LogIn, LogOut, Code, Sun, Moon, Palette, Lightbulb, Globe, Maximize2 } from 'lucide-react';
import { setupGenerators, generateCodeForStart, generateCodeForWhenTriggers, generateCodeForBlock, generateCodeForSpriteClicked } from './lib/engine';
import { soundEngine } from './lib/sound';
import { BackgroundPainter } from './components/BackgroundPainter';
import { CostumePainter } from './components/CostumePainter';
import { useTranslation } from 'react-i18next';
import { updateBlocklyLanguage } from './lib/blocklyI18n';
import './lib/i18n';

// Initialize custom blocks generator
setupGenerators();

export default function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    if (workspace) {
      const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      setSprites(prev => prev.map(s => s.id === activeSpriteId ? { ...s, xml } : s));
    }
    i18n.changeLanguage(lng);
    updateBlocklyLanguage(lng as any);
  };
  
  useEffect(() => {
    updateBlocklyLanguage(i18n.language as any);
  }, []);
  const [view, setView] = useState<'editor' | 'explore' | 'privacy' | 'my-projects'>('editor');
  const [editorTab, setEditorTab] = useState<'codice' | 'costumi'>('codice');
  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg | null>(null);
  const [activeExtensions, setActiveExtensions] = useState<string[]>([]);
  const [isExtensionsModalOpen, setIsExtensionsModalOpen] = useState(false);

  const [projectData, setProjectData] = useState<object | null>(null);
  const [currentProjectTitle, setCurrentProjectTitle] = useState('Nuovo Progetto');
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  
  const [token, setToken] = useState<string | null>(localStorage.getItem('miciocode_token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('miciocode_user'));
  const [isSpriteLibraryOpen, setIsSpriteLibraryOpen] = useState(false);
  const [isImportUrlModalOpen, setIsImportUrlModalOpen] = useState(false);
  const [isBackgroundPainterOpen, setIsBackgroundPainterOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadingStartTime = useRef(0);
  
  const startLoading = () => {
    loadingStartTime.current = Date.now();
    setIsLoading(true);
  };

  const stopLoading = () => {
    const elapsed = Date.now() - loadingStartTime.current;
    const minTime = 2500;
    const delay = Math.max(0, minTime - elapsed);
    setTimeout(() => setIsLoading(false), delay);
  };
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('miciocode_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('miciocode_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('miciocode_theme', 'light');
    }
  }, [darkMode]);
  const [sprites, setSprites] = useState([{ id: '1', name: 'Azuro', isAzuro: true, xml: '' }]);
  const [activeSpriteId, setActiveSpriteId] = useState('1');
  const [spriteToDelete, setSpriteToDelete] = useState<string | null>(null);

  const confirmDeleteSprite = () => {
    if (!spriteToDelete) return;
    
    if (activeSpriteId === spriteToDelete) {
       const newSprites = sprites.filter(s => s.id !== spriteToDelete);
       setSprites(newSprites);
       if (newSprites.length > 0) {
         setActiveSpriteId(newSprites[0].id);
         workspace?.clear();
         if (newSprites[0].xml) {
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(newSprites[0].xml), workspace!);
         }
       }
    } else {
       setSprites(sprites.filter(s => s.id !== spriteToDelete));
    }
    setSpriteToDelete(null);
  };

  useEffect(() => {
    // Listen for auth state changes to keep the UI in sync
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const name = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Utente';
        
        try {
          // Sync with our backend to establish a session
          await fetch('/api/auth/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              userId: firebaseUser.uid, 
              username: name, 
              email: firebaseUser.email 
            })
          });

          setToken(firebaseUser.uid);
          setUsername(name);
          localStorage.setItem('miciocode_token', firebaseUser.uid);
          localStorage.setItem('miciocode_user', name);
        } catch (error) {
          console.error("Auth sync error:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectSprite = (id: string) => {
    if (id === activeSpriteId) return;
    if (workspace) {
      const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      setSprites(prev => prev.map(s => s.id === activeSpriteId ? { ...s, xml } : s));
      
      const newSprite = sprites.find(s => s.id === id);
      workspace.clear();
      if (newSprite && newSprite.xml) {
        try {
          Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(newSprite.xml), workspace);
        } catch (e) {
          console.error("Error loading sprite XML:", e);
        }
      }
    }
    setActiveSpriteId(id);
  };

  const defaultInitialState = {
    x: 0,
    y: 0,
    direction: 90,
    size: 100,
    visible: true,
    message: null,
    messageType: null as 'say' | 'think' | 'shout' | null,
    effects: { grayscale: 0, colore: 0, pixel: 0, luminosita: 100, fantasma: 0 },
    costume: 1,
    speed: 10
  };

  // Engine state
  const [spriteStates, setSpriteStates] = useState<Record<string, {
    x: number;
    y: number;
    direction: number;
    size: number;
    visible: boolean;
    message: string | null;
    messageType: 'say' | 'think' | 'shout' | null;
    effects: { grayscale: number; colore: number; pixel: number; luminosita: number; fantasma: number };
    costume: number;
    speed: number;
  }>>({
    '1': { ...defaultInitialState }
  });

  const spriteStatesRef = useRef<Record<string, any>>({
    '1': { ...defaultInitialState }
  });

  const [isRunning, setIsRunning] = useState(false);
  const stopFlag = useRef(false);
  const activeKeys = useRef<Set<string>>(new Set());
  const isMouseDownRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      if (e.code === 'Space') key = 'SPACE';
      else if (e.key === 'ArrowUp') key = 'UP';
      else if (e.key === 'ArrowDown') key = 'DOWN';
      else if (e.key === 'ArrowRight') key = 'RIGHT';
      else if (e.key === 'ArrowLeft') key = 'LEFT';
      activeKeys.current.add(key);
      activeKeys.current.add('ANY');
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      if (e.code === 'Space') key = 'SPACE';
      else if (e.key === 'ArrowUp') key = 'UP';
      else if (e.key === 'ArrowDown') key = 'DOWN';
      else if (e.key === 'ArrowRight') key = 'RIGHT';
      else if (e.key === 'ArrowLeft') key = 'LEFT';
      activeKeys.current.delete(key);
      if (activeKeys.current.size <= 1) {
        activeKeys.current.delete('ANY');
      }
    };

    const handleMouseDown = () => { isMouseDownRef.current = true; };
    const handleMouseUp = () => { isMouseDownRef.current = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const compileAllSprites = () => {
    const scriptsToRun: { spriteId: string, scripts: string[], triggers: { conditionCode: string, bodyCode: string }[] }[] = [];
    
    let currentSprites = [...sprites];
    if (workspace) {
      const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      currentSprites = currentSprites.map(s => s.id === activeSpriteId ? { ...s, xml } : s);
      setSprites(currentSprites);
    }
    
    const tempWorkspace = new Blockly.Workspace();
    for (const s of currentSprites) {
      if (s.id === activeSpriteId && workspace) {
        const scripts = generateCodeForStart(workspace);
        const triggers = generateCodeForWhenTriggers(workspace);
        if (scripts.length > 0 || triggers.length > 0) {
          scriptsToRun.push({ spriteId: s.id, scripts, triggers });
        }
      } else {
        tempWorkspace.clear();
        if (s.xml) {
          try {
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(s.xml), tempWorkspace);
          } catch (e) {
            console.error("Error reading XML for sprite:", e);
          }
        }
        
        const scripts = generateCodeForStart(tempWorkspace as any);
        const triggers = generateCodeForWhenTriggers(tempWorkspace as any);
        
        if (scripts.length > 0 || triggers.length > 0) {
          scriptsToRun.push({ spriteId: s.id, scripts, triggers });
        }
      }
    }
    tempWorkspace.dispose();
    return scriptsToRun;
  };

  const runScripts = async (spriteId: string, scripts: string[]) => {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const promises = scripts.map(code => {
      try {
        const fn = new AsyncFunction('sprite', code);
        return Promise.resolve(fn(getSpriteAPI(spriteId))).catch((err: any) => {
          console.warn(`Avviso durante l'esecuzione dello script (${spriteId}):`, err);
          return Promise.resolve();
        });
      } catch (err) {
        console.error("Errore di sintassi nel codice generato:", err);
        return Promise.resolve();
      }
    });
    try {
      await Promise.all(promises);
    } catch (err) {
      console.warn("Avviso durante l'esecuzione:", err);
    }
  };

  const getSpriteAPI = (spriteId: string) => {
    const getFreshState = () => {
      if (!spriteStatesRef.current[spriteId]) {
        spriteStatesRef.current[spriteId] = { ...defaultInitialState };
      }
      return spriteStatesRef.current[spriteId];
    };

    const update = (updater: (s: any) => any) => {
      const current = getFreshState();
      const updated = updater({ ...current });
      spriteStatesRef.current[spriteId] = updated;
      setSpriteStates(prev => ({
        ...prev,
        [spriteId]: updated
      }));
    };

    const isSafeUrl = (url: any) => {
      try {
        const s = String(url || '').trim();
        if (!s) return false;
        if (/^(about|chrome|javascript|file|data):/i.test(s)) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    };

    return {

      // --- Web Requests ---
      webGet: async (url: string) => {
        try {
          if (!isSafeUrl(url)) {
            console.warn("Richiesta bloccata verso protocollo riservato o non sicuro:", url);
            update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
            (window as any).__web_last_status = 0;
            (window as any).__web_last_ok = false;
            return '';
          }
          const res = await fetch(url, { headers: getFreshState().webHeaders });
          update(s => ({ ...s, webLastStatus: res.status, webLastOk: res.ok, webLastHeaders: Object.fromEntries(res.headers.entries()) }));
          (window as any).__web_last_status = res.status;
          (window as any).__web_last_ok = res.ok;
          (window as any).__web_last_headers = res.headers;
          return await res.text();
        } catch (e) {
          update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
          (window as any).__web_last_status = 0;
          (window as any).__web_last_ok = false;
          return '';
        }
      },
      webGetJson: async (url: string) => {
        try {
          if (!isSafeUrl(url)) {
            console.warn("Richiesta bloccata verso protocollo riservato o non sicuro:", url);
            update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
            (window as any).__web_last_status = 0;
            (window as any).__web_last_ok = false;
            return null;
          }
          const res = await fetch(url, { headers: getFreshState().webHeaders });
          update(s => ({ ...s, webLastStatus: res.status, webLastOk: res.ok, webLastHeaders: Object.fromEntries(res.headers.entries()) }));
          (window as any).__web_last_status = res.status;
          (window as any).__web_last_ok = res.ok;
          (window as any).__web_last_headers = res.headers;
          return await res.json();
        } catch (e) {
          update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
          (window as any).__web_last_status = 0;
          (window as any).__web_last_ok = false;
          return null;
        }
      },
      webPost: async (url: string, body: any) => {
        try {
          if (!isSafeUrl(url)) {
            console.warn("Richiesta bloccata verso protocollo riservato o non sicuro:", url);
            update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
            (window as any).__web_last_status = 0;
            (window as any).__web_last_ok = false;
            return '';
          }
          const headers = { ...getFreshState().webHeaders };
          let bodyStr = body;
          if (typeof body === 'object') {
             bodyStr = JSON.stringify(body);
             if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
          }
          const res = await fetch(url, { method: 'POST', body: bodyStr, headers });
          update(s => ({ ...s, webLastStatus: res.status, webLastOk: res.ok, webLastHeaders: Object.fromEntries(res.headers.entries()) }));
          (window as any).__web_last_status = res.status;
          (window as any).__web_last_ok = res.ok;
          (window as any).__web_last_headers = res.headers;
          return await res.text();
        } catch (e) {
          update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
          (window as any).__web_last_status = 0;
          (window as any).__web_last_ok = false;
          return '';
        }
      },
      webPut: async (url: string, body: any) => {
        try {
          if (!isSafeUrl(url)) {
            console.warn("Richiesta bloccata verso protocollo riservato o non sicuro:", url);
            update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
            (window as any).__web_last_status = 0;
            (window as any).__web_last_ok = false;
            return '';
          }
          const headers = { ...getFreshState().webHeaders };
          let bodyStr = body;
          if (typeof body === 'object') {
             bodyStr = JSON.stringify(body);
             if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
          }
          const res = await fetch(url, { method: 'PUT', body: bodyStr, headers });
          update(s => ({ ...s, webLastStatus: res.status, webLastOk: res.ok, webLastHeaders: Object.fromEntries(res.headers.entries()) }));
          (window as any).__web_last_status = res.status;
          (window as any).__web_last_ok = res.ok;
          (window as any).__web_last_headers = res.headers;
          return await res.text();
        } catch (e) {
          update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
          (window as any).__web_last_status = 0;
          (window as any).__web_last_ok = false;
          return '';
        }
      },
      webDelete: async (url: string) => {
        try {
          if (!isSafeUrl(url)) {
            console.warn("Richiesta bloccata verso protocollo riservato o non sicuro:", url);
            update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
            (window as any).__web_last_status = 0;
            (window as any).__web_last_ok = false;
            return '';
          }
          const res = await fetch(url, { method: 'DELETE', headers: getFreshState().webHeaders });
          update(s => ({ ...s, webLastStatus: res.status, webLastOk: res.ok, webLastHeaders: Object.fromEntries(res.headers.entries()) }));
          (window as any).__web_last_status = res.status;
          (window as any).__web_last_ok = res.ok;
          (window as any).__web_last_headers = res.headers;
          return await res.text();
        } catch (e) {
          update(s => ({ ...s, webLastStatus: 0, webLastOk: false }));
          (window as any).__web_last_status = 0;
          (window as any).__web_last_ok = false;
          return '';
        }
      },
      webSetHeader: (key: string, value: string) => {
        const keyStr = String(key || '');
        const valStr = String(value || '');
        (window as any).__web_headers = { ...((window as any).__web_headers || {}), [keyStr]: valStr };
        update(s => ({ ...s, webHeaders: { ...(s.webHeaders || {}), [keyStr]: valStr } }));
      },
      webClearHeaders: () => {
        (window as any).__web_headers = {};
        update(s => ({ ...s, webHeaders: {} }));
      },
      webLastStatus: () => getFreshState().webLastStatus || (window as any).__web_last_status || 0,
      webLastOk: () => getFreshState().webLastOk || (window as any).__web_last_ok || false,
      webLastHeader: (key: string) => (getFreshState().webLastHeaders || {})[String(key || '').toLowerCase()] || '',
      webFetchImage: async (url: string) => {
        try {
          if (!isSafeUrl(url)) {
            return '';
          }
          const res = await fetch(url);
          const blob = await res.blob();
          return URL.createObjectURL(blob);
        } catch (e) {
          return '';
        }
      },
      webParseJson: (json: any, key: string) => {
        try {
          const obj = typeof json === 'string' ? JSON.parse(json) : json;
          return obj && typeof obj === 'object' ? obj[key] : null;
        } catch (e) {
          return null;
        }
      },
      webRedirect: async (url: string) => {
        try {
          const s = String(url || '').trim();
          if (!isSafeUrl(s)) {
            console.warn("Reindirizzamento bloccato per URL non sicuro o riservato:", s);
            return;
          }
          try {
            window.open(s, '_blank', 'noopener,noreferrer');
          } catch (e) {
            console.warn("Impossibile aprire la finestra:", e);
          }
        } catch (e) {
          console.warn("Errore webRedirect:", e);
        }
      },

      isStopped: () => stopFlag.current,
      yield: () => new Promise(resolve => setTimeout(resolve, 0)),
      
      // Logica
      waitMs: async (ms: number) => {
        const startTime = Date.now();
        const duration = Math.max(0, Number(ms) || 0);
        while (Date.now() - startTime < duration) {
          if (stopFlag.current) return;
          await new Promise(resolve => setTimeout(resolve, Math.min(30, duration)));
        }
      },
      sendScript: async (targetSpriteName: string, scriptCallback: (targetApi: any) => Promise<void>) => {
        const targetList = sprites.filter(s => targetSpriteName === 'all' || s.name === targetSpriteName || s.id === targetSpriteName || (targetSpriteName === 'Azuro' && s.isAzuro));
        await Promise.all(targetList.map(target => {
          const targetApi = getSpriteAPI(target.id);
          return scriptCallback(targetApi);
        }));
      },
      controlScript: async (action: string, scriptCallback: () => Promise<void>) => {
        if (action === 'STOP' || stopFlag.current) {
          return;
        }
        if (action === 'PAUSE') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return;
        }
        // START
        await scriptCallback();
      },

      // Animazioni
      moveSteps: async (steps: number) => {
        const numSteps = Number(steps) || 0;
        const state = getFreshState();
        const speed = state?.speed || 10;
        update(s => {
          const rad = s.direction * (Math.PI / 180);
          return {
            ...s,
            x: Math.round((s.x + Math.sin(rad) * numSteps) * 10) / 10,
            y: Math.round((s.y + Math.cos(rad) * numSteps) * 10) / 10
          };
        });
        await new Promise(resolve => setTimeout(resolve, Math.max(10, Math.round(250 / Math.max(1, speed)))));
      },
      rotate: async (degrees: number) => {
        const numDeg = Number(degrees) || 0;
        update(s => ({ ...s, direction: (s.direction + numDeg + 360) % 360 }));
        await new Promise(resolve => setTimeout(resolve, 30));
      },
      goToXY: async (x: number, y: number) => {
        update(s => ({ ...s, x: Number(x) || 0, y: Number(y) || 0 }));
        await new Promise(resolve => setTimeout(resolve, 30));
      },
      glideSecsToXY: async (targetX: number, targetY: number, secs: number) => {
        const currentState = getFreshState();
        const startX = currentState?.x || 0;
        const startY = currentState?.y || 0;
        const startTime = Date.now();
        const duration = Math.max(50, Number(secs) * 1000);
        
        while (Date.now() - startTime < duration) {
          if (stopFlag.current) return;
          const elapsed = Date.now() - startTime;
          const progress = Math.min(1, elapsed / duration);
          update(s => ({
            ...s,
            x: Math.round((startX + (targetX - startX) * progress) * 10) / 10,
            y: Math.round((startY + (targetY - startY) * progress) * 10) / 10
          }));
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        update(s => ({ ...s, x: Number(targetX), y: Number(targetY) }));
      },
      bounceOnEdge: async () => {
        update(s => {
          let dir = s.direction;
          if (s.x > 210) { dir = (360 - s.direction) % 360; }
          else if (s.x < -210) { dir = (360 - s.direction) % 360; }
          if (s.y > 140) { dir = (180 - s.direction + 360) % 360; }
          else if (s.y < -140) { dir = (180 - s.direction + 360) % 360; }
          return { ...s, direction: dir };
        });
        await new Promise(resolve => setTimeout(resolve, 20));
      },
      setSpeed: async (speed: number) => {
        update(s => ({ ...s, speed: Math.max(1, Number(speed) || 10) }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },

      // Aspetto
      show: async () => {
        update(s => ({ ...s, visible: true }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      hide: async () => {
        update(s => ({ ...s, visible: false }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      changeSizeBy: async (change: number) => {
        update(s => ({ ...s, size: Math.max(10, Math.min(500, (s.size || 100) + Number(change))) }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      resetSize: async () => {
        update(s => ({ ...s, size: 100 }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      changeEffect: async (effectName: string, change: number) => {
        const delta = Number(change) || 10;
        update(s => {
          const fx = { ...(s.effects || { grayscale: 0, colore: 0, pixel: 0, luminosita: 100, fantasma: 0 }) };
          if (effectName === 'grayscale') fx.grayscale = Math.max(0, Math.min(100, fx.grayscale + delta));
          else if (effectName === 'colore') fx.colore = (fx.colore + delta * 15) % 360;
          else if (effectName === 'pixel') fx.pixel = Math.max(0, Math.min(100, fx.pixel + delta));
          else if (effectName === 'luminosità') fx.luminosita = Math.max(0, Math.min(250, fx.luminosita + delta));
          else if (effectName === 'fantasma') fx.fantasma = Math.max(0, Math.min(100, fx.fantasma + delta));
          return { ...s, effects: fx };
        });
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      nextCostume: async () => {
        update(s => ({ ...s, costume: ((s.costume || 1) % 4) + 1 }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      gotoCostume: async (costume: number) => {
        update(s => ({ ...s, costume: Math.max(1, Number(costume) || 1) }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },

      // Suono
      startSound: async (soundName: string) => {
        soundEngine.playSound(soundName);
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      startSoundAtSecs: async (soundName: string, secs: number) => {
        await new Promise(resolve => setTimeout(resolve, Math.max(0, Number(secs) * 1000)));
        soundEngine.playSound(soundName);
      },
      changeVolume: async (change: number) => {
        soundEngine.changeVolumeBy(Number(change));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      setHz: async (hz: number) => {
        soundEngine.setHz(Number(hz));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      stopAllSounds: async () => {
        soundEngine.stopAllSounds();
        await new Promise(resolve => setTimeout(resolve, 10));
      },

      // Baloon
      say: async (message: string) => {
        update(s => ({ ...s, message: String(message), messageType: 'say' }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      think: async (message: string) => {
        update(s => ({ ...s, message: String(message), messageType: 'think' }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      shout: async (message: string) => {
        update(s => ({ ...s, message: String(message), messageType: 'shout' }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },
      stopTalking: async () => {
        update(s => ({ ...s, message: null, messageType: null }));
        await new Promise(resolve => setTimeout(resolve, 10));
      },

      // Condizioni e Sensori
      isTouchingEdge: () => {
        const s = getFreshState();
        return Math.abs(s?.x || 0) > 200 || Math.abs(s?.y || 0) > 130;
      },
      isTouchingMouse: () => {
        return false;
      },
      isKeyPressed: (key: string) => {
        return activeKeys.current.has(key.toUpperCase());
      },
      isMouseDown: () => {
        return isMouseDownRef.current;
      }
    };
  };

  const handlePlay = async () => {
    if (isRunning) return;
    stopFlag.current = false;
    setIsRunning(true);
    
    // Ensure all sprites are initialized in state
    setSpriteStates(prev => {
      const next = { ...prev };
      sprites.forEach(s => {
        if (!next[s.id]) {
          next[s.id] = { ...defaultInitialState };
          spriteStatesRef.current[s.id] = { ...defaultInitialState };
        }
      });
      return next;
    });

    const compiled = compileAllSprites();
    
    // Run start scripts
    const startPromises = compiled.map(item => runScripts(item.spriteId, item.scripts));

    // Run trigger watchers
    const triggerPromises = compiled.flatMap(item => {
      return item.triggers.map(async (trigger) => {
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        try {
          const condFn = new AsyncFunction('sprite', `return Boolean(${trigger.conditionCode});`);
          const bodyFn = new AsyncFunction('sprite', trigger.bodyCode);
          const spriteApi = getSpriteAPI(item.spriteId);

          while (!stopFlag.current) {
            try {
              const isMet = await condFn(spriteApi);
              if (isMet) {
                await bodyFn(spriteApi);
              }
            } catch (e) {
              console.error("Trigger error:", e);
            }
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        } catch (err) {
          console.error("Trigger syntax error:", err);
        }
      });
    });

    await Promise.all(startPromises);
    
    // If no recurring loops/triggers were running, mark as idle
    if (triggerPromises.length === 0) {
      setIsRunning(false);
      stopFlag.current = false;
    }
  };

  const handleBlockClick = async (block: Blockly.Block) => {
    const code = generateCodeForBlock(block);
    if (code && code.trim()) {
      stopFlag.current = false;
      await runScripts(activeSpriteId, [code]);
    }
  };

  const handleSpriteClick = async (clickedSpriteId: string) => {
    let currentSprites = [...sprites];
    if (workspace) {
      const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      currentSprites = currentSprites.map(s => s.id === activeSpriteId ? { ...s, xml } : s);
      setSprites(currentSprites);
    }
    
    const targetSprite = currentSprites.find(s => s.id === clickedSpriteId);
    if (!targetSprite || !targetSprite.xml) return;
    
    const tempWorkspace = new Blockly.Workspace();
    try {
      Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(targetSprite.xml), tempWorkspace);
    } catch (e) {
      console.error(e);
      tempWorkspace.dispose();
      return;
    }
    const scripts = generateCodeForSpriteClicked(tempWorkspace as any);
    tempWorkspace.dispose();

    if (scripts.length > 0) {
      stopFlag.current = false;
      await runScripts(clickedSpriteId, scripts);
    }
  };

  const handleStop = () => {
    stopFlag.current = true;
    soundEngine.stopAllSounds();
    setIsRunning(false);
    setSpriteStates(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        next[k] = { ...next[k], message: null, messageType: null };
      });
      return next;
    });
  };

const handleLogin = (newToken: string, newUsername: string) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem('miciocode_token', newToken);
    localStorage.setItem('miciocode_user', newUsername);
    setAuthModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("SignOut error:", err);
    }
    setToken(null);
    setUsername(null);
    localStorage.removeItem('miciocode_token');
    localStorage.removeItem('miciocode_user');
  };

  const saveToLocalFile = () => {
    let currentSprites = [...sprites];
    if (workspace) {
      const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      currentSprites = currentSprites.map(s => s.id === activeSpriteId ? { ...s, xml } : s);
      setSprites(currentSprites);
    }
    const dataToSave = { sprites: currentSprites, backgroundImage };
    const jsonString = JSON.stringify(dataToSave, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProjectTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'progetto'}.code`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadFromLocalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.code')) {
      alert("Formato file non supportato. Per favore seleziona un file .code.");
      return;
    }

    const reader = new FileReader();
    startLoading();
    reader.onload = (event) => {
      try {
        setTimeout(() => {
          const json = JSON.parse(event.target?.result as string);
          if (json.sprites && Array.isArray(json.sprites)) {
            setSprites(json.sprites);
            if (json.backgroundImage !== undefined) {
              setBackgroundImage(json.backgroundImage);
            } else {
              setBackgroundImage(null);
            }
            if (json.sprites.length > 0) {
              setActiveSpriteId(json.sprites[0].id);
              if (workspace && json.sprites[0].xml) {
                workspace.clear();
                Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(json.sprites[0].xml), workspace);
              }
            }
          }
          setCurrentProjectTitle(file.name.replace('.code', ''));
          e.target.value = '';
        stopLoading();
        }, 800);
      } catch (err) {
        setIsLoading(false);
        alert("Errore durante la lettura del file. Il file potrebbe essere corrotto.");
      }
    };
    reader.readAsText(file);
  };

  const handlePublish = async (title: string, description: string, credits: string, tags: string[]) => {
    let currentSprites = [...sprites];
    if (workspace) {
      const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      currentSprites = currentSprites.map(s => s.id === activeSpriteId ? { ...s, xml } : s);
      setSprites(currentSprites);
    }
    const dataToSave = { sprites: currentSprites, backgroundImage };
    
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        title, 
        description, 
        credits, 
        tags,
        data: dataToSave 
      })
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Errore durante la pubblicazione.');
    }
    
    setCurrentProjectTitle(title);
    setPublishModalOpen(false);
    setView('explore');
  };

  const loadCloudProject = (data: any, title: string) => {
    startLoading();
    setTimeout(() => {
      if (data.sprites && Array.isArray(data.sprites)) {
        setSprites(data.sprites);
        if (data.backgroundImage !== undefined) {
          setBackgroundImage(data.backgroundImage);
        } else {
          setBackgroundImage(null);
        }
        if (data.sprites.length > 0) {
          setActiveSpriteId(data.sprites[0].id);
        }
      }
      setCurrentProjectTitle(title);
      setProjectData(data); // Store the full data
      setView('editor');
      stopLoading();
    }, 800);
  };

  const handleSpriteAction = (action: string) => {
    const triggerFileInput = (accept: string, callback: (dataUrl: string) => void) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            if (ev.target?.result) {
              callback(ev.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    };

    switch (action) {
      case 'select-sprite':
        setIsSpriteLibraryOpen(true);
        break;
      case 'draw-sprite': {
        const newId = Date.now().toString();
        const newSprite = {
          id: newId,
          name: `Sprite ${sprites.length + 1}`,
          customImage: '',
          xml: ''
        };
        setSprites([...sprites, newSprite]);
        setActiveSpriteId(newId);
        setEditorTab('costumi');
        break;
      }
      case 'import-sprite': {
        triggerFileInput('image/*', (dataUrl) => {
          const newId = Date.now().toString();
          const newSprite = {
            id: newId,
            name: `Sprite ${sprites.length + 1}`,
            customImage: dataUrl,
            xml: ''
          };
          setSprites([...sprites, newSprite]);
          setActiveSpriteId(newId);
        });
        break;
      }
      case 'import-sprite-url': {
        setIsImportUrlModalOpen(true);
        break;
      }
      case 'new-costume': {
        setEditorTab('costumi');
        // Currently, it just opens the costume editor for the active sprite
        break;
      }
      case 'select-bg':
        // Fallback to import for now as we don't have a background library
        triggerFileInput('image/*', (dataUrl) => {
          setBackgroundImage(dataUrl);
        });
        break;
      case 'draw-bg':
        setIsBackgroundPainterOpen(true);
        break;
      case 'import-bg':
        triggerFileInput('image/*', (dataUrl) => {
          setBackgroundImage(dataUrl);
        });
        break;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <header className={`border-b px-6 py-3 flex items-center justify-between sticky top-0 z-10 transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('editor')}>
            <AzuroIcon className="w-8 h-8" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
              MicioCode
            </span>
          </div>
          
          {view === 'editor' && (
            <div className={`hidden md:flex items-center gap-2 rounded-lg p-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <input
                type="text"
                value={currentProjectTitle}
                onChange={(e) => setCurrentProjectTitle(e.target.value)}
                className={`bg-transparent border-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 text-sm font-medium w-48 outline-none ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          
          <button 
            onClick={() => setIsExtensionsModalOpen(true)}
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition shadow-sm ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-900/50' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'}`}
            title={t('ui.add_extension', { defaultValue: 'Aggiungi estensione' })}
          >
            <Package className="w-4 h-4" />
            Estensioni
          </button>

          <button 
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
            className={`p-2 rounded-lg transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Schermo intero"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          <div className="relative group">
            <button className={`p-2 rounded-lg transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`} title="Lingua / Language">
              <Globe className="w-5 h-5" />
            </button>
            <div className={`absolute right-0 top-full w-32 rounded-lg shadow-xl border overflow-hidden hidden group-hover:block z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {["it", "en", "es", "fr", "zh", "ja"].map(lang => (
                <button key={lang} onClick={() => changeLanguage(lang)} className={`block w-full text-left px-4 py-2 text-sm uppercase font-bold ${i18n.language === lang ? 'text-blue-500' : (darkMode ? 'text-gray-300' : 'text-gray-700')} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  {lang === 'it' ? 'Italiano' : lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'fr' ? 'Français' : lang === 'zh' ? '中文' : '日本語'}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition hidden sm:block ${darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
            title={t('ui.theme', { defaultValue: "Cambia Tema" })}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {view === 'editor' ? (
            <>
              <div className={`flex items-center mr-4 gap-2 border-r pr-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <button 
                  onClick={() => alert("I tutorial arriveranno presto!")}
                  className={`p-2 rounded-lg transition ${darkMode ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:text-yellow-500 hover:bg-yellow-50'}`}
                  title={t("ui.tutorial")}
                >
                  <Lightbulb className="w-5 h-5" />
                </button>
                <button 
                  onClick={saveToLocalFile}
                  className={`p-2 rounded-lg transition ${darkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                  title={t("ui.saveToComputer")}
                >
                  <Save className="w-5 h-5" />
                </button>
                <label className={`p-2 rounded-lg transition cursor-pointer ${darkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} title={t("ui.loadFromComputer")}>
                  <FolderOpen className="w-5 h-5" />
                  <input type="file" accept=".code" className="hidden" onChange={loadFromLocalFile} />
                </label>
              </div>

              <button 
                onClick={() => setView('explore')}
                className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${darkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                <Compass className="w-5 h-5" /> {t("ui.explore")}
              </button>

              <button 
                onClick={() => {
                  if (!token) setAuthModalOpen(true);
                  else setPublishModalOpen(true);
                }}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
              >
                <UploadCloud className="w-5 h-5" /> {t("ui.publish") || "Pubblica"}
              </button>
            </>
          ) : (
            <button 
              onClick={() => setView('editor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${darkMode ? 'text-blue-400 bg-blue-900/30 hover:bg-blue-900/50' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'}`}
            >
              <Code className="w-5 h-5" /> Editor
            </button>
          )}

          <div className={`pl-4 ml-2 border-l ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            {token ? (
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium hidden sm:block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ciao, {username}</span>
                <button 
                  onClick={handleLogout}
                  className={`p-2 rounded-lg transition ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                  title="Esci"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setView('my-projects')}
                  className={`p-2 rounded-lg transition ${view === 'my-projects' ? (darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600') : (darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500')}`}
                  title="I Miei Progetti"
                >
                  <FolderOpen className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className={`flex items-center gap-2 font-medium px-3 py-2 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                <LogIn className="w-5 h-5" /> Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex overflow-hidden relative">
        {isLoading && <LoadingScreen />}
        {view === 'editor' ? (
          <div className={`flex-grow flex p-4 gap-4 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Editor Area (Code or Costumes) */}
            <div className={`flex-grow flex flex-col rounded-xl shadow-sm border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`flex px-2 pt-2 gap-2 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                <button 
                  onClick={() => setEditorTab('codice')} 
                  className={`px-4 py-2 rounded-t-lg font-bold flex items-center gap-2 ${editorTab === 'codice' ? (darkMode ? 'bg-gray-700 text-blue-400' : 'bg-white text-blue-600') : (darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200')} transition-colors`}
                >
                  <Code className="w-4 h-4" /> {t("ui.code")}
                </button>
                <button 
                  onClick={() => setEditorTab('costumi')} 
                  className={`px-4 py-2 rounded-t-lg font-bold flex items-center gap-2 ${editorTab === 'costumi' ? (darkMode ? 'bg-gray-700 text-blue-400' : 'bg-white text-blue-600') : (darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200')} transition-colors`}
                >
                  <Palette className="w-4 h-4" /> {t("ui.costumes")}
                </button>
              </div>

              {editorTab === 'codice' ? (
                <BlocklyEditor key={i18n.language}
                  activeExtensions={activeExtensions}
                  onAddExtension={(action) => {
                    if (action === 'OPEN_MODAL') setIsExtensionsModalOpen(true);
                  }} 
                  onWorkspaceChange={setWorkspace} 
                  onBlockClick={handleBlockClick}
                  initialXml={sprites.find(s => s.id === activeSpriteId)?.xml || null} 
                  darkMode={darkMode}
                  sprites={sprites}
                />
              ) : (
                <CostumePainter
                  initialImage={sprites.find(s => s.id === activeSpriteId)?.customImage || null}
                  onSave={(dataUrl) => {
                    setSprites(sprites.map(s => s.id === activeSpriteId ? { ...s, customImage: dataUrl } : s));
                  }}
                  onClear={() => {
                    setSprites(sprites.map(s => {
                      if (s.id === activeSpriteId) {
                        const { customImage, ...rest } = s;
                        return rest;
                      }
                      return s;
                    }));
                  }}
                />
              )}
            </div>
            
            {/* Pannello Destro: Stage e Lista Sprite */}
            <div className="w-72 xl:w-96 flex flex-col gap-4 flex-shrink-0 overflow-hidden">
              <Stage 
                sprites={sprites}
                spriteStates={spriteStates}
                isRunning={isRunning}
                onPlay={handlePlay}
                onStop={handleStop}
                onSpriteClick={handleSpriteClick}
                backgroundImage={backgroundImage}
                onEditBackground={() => setIsBackgroundPainterOpen(true)}
              />
              <SpriteList 
                sprites={sprites}
                activeSpriteId={activeSpriteId}
                onSelect={handleSelectSprite}
                onAction={handleSpriteAction}
                onDelete={(id) => setSpriteToDelete(id)}
              />
            </div>
          </div>
        ) : view === 'explore' ? (
          <div className="flex-grow overflow-y-auto bg-gray-50">
            <ExploreProjects 
              onLoadProject={loadCloudProject} 
              onBack={() => setView('editor')} 
            />
          </div>
        ) : view === 'my-projects' ? (
          <div className="flex-grow overflow-y-auto bg-gray-50">
            <MyProjects 
              token={token}
              onBack={() => setView('editor')}
              onLoadProject={(p) => {
                loadCloudProject(p.data, p.title);
                setView('editor');
              }}
            />
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto bg-gray-50">
            <PrivacyPolicy onBack={() => setView('editor')} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-100 text-gray-500'}`}>
        <div className="text-sm">
          © 2026 MicioCode - Impara a programmare giocando.
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('privacy')}
            className={`text-sm transition ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
          >
            Privacy Policy
          </button>
          <a href="#" className={`text-sm transition ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Supporto</a>
          <a href="#" className={`text-sm transition ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Comunità</a>
        </div>
      </footer>

      {/* Modals */}
      <BackgroundPainter 
        isOpen={isBackgroundPainterOpen}
        onClose={() => setIsBackgroundPainterOpen(false)}
        initialImage={backgroundImage}
        onSave={(dataUrl) => {
          setBackgroundImage(dataUrl);
          setIsBackgroundPainterOpen(false);
        }}
      />

      <SpriteLibraryModal 
        isOpen={isSpriteLibraryOpen}
        onClose={() => setIsSpriteLibraryOpen(false)}
        onSelectSprite={(s) => {
          let currentXml = '';
          if (workspace) {
            currentXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
            workspace.clear();
          }
          const newSprite = { 
            id: Date.now().toString(), 
            name: s.name, 
            iconName: (s as any).iconName, 
            color: (s as any).color, 
            emoji: (s as any).emoji,
            customImage: (s as any).customImage,
            xml: ''
          };
          setSprites(prev => {
            const updated = prev.map(sp => sp.id === activeSpriteId ? { ...sp, xml: currentXml } : sp);
            return [...updated, newSprite];
          });
          setActiveSpriteId(newSprite.id);
          setIsSpriteLibraryOpen(false);
        }}
      />

      <ImportUrlModal
        isOpen={isImportUrlModalOpen}
        onClose={() => setIsImportUrlModalOpen(false)}
        onImport={(spriteName, imageUrl) => {
          let currentXml = '';
          if (workspace) {
            currentXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
            workspace.clear();
          }
          const newSprite = {
            id: Date.now().toString(),
            name: spriteName,
            customImage: imageUrl,
            xml: ''
          };
          setSprites(prev => {
            const updated = prev.map(sp => sp.id === activeSpriteId ? { ...sp, xml: currentXml } : sp);
            return [...updated, newSprite];
          });
          setActiveSpriteId(newSprite.id);
        }}
      />

      
      <ExtensionsModal 
        isOpen={isExtensionsModalOpen} 
        onClose={() => setIsExtensionsModalOpen(false)} 
        onAddExtension={(extId) => {
          setActiveExtensions(prev => Array.from(new Set([...prev, extId])));
          setIsExtensionsModalOpen(false);
        }}
        activeExtensions={activeExtensions}
      />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLogin={handleLogin} 
      />
      
      <PublishModal 
        isOpen={publishModalOpen} 
        onClose={() => setPublishModalOpen(false)} 
        onPublish={handlePublish} 
      />

      {/* Delete Sprite Modal */}
      {spriteToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-sm rounded-2xl p-6 flex flex-col items-center text-center shadow-xl ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="w-24 h-24 mb-4">
              <AzuroIcon className="w-full h-full" mood="frown" />
            </div>
            <h3 className="text-xl font-bold mb-2">Elimina Sprite</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Vuoi eliminare lo sprite? Questo non può essere annullato!
            </p>
            <div className="flex w-full gap-3">
              <button 
                onClick={() => setSpriteToDelete(null)}
                className={`flex-1 py-2.5 rounded-xl font-medium transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Annulla
              </button>
              <button 
                onClick={confirmDeleteSprite}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium transition"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
