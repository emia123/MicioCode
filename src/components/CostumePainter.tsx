import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Eraser, Pen, PaintBucket, Check, X } from 'lucide-react';

interface CostumePainterProps {
  initialImage?: string | null;
  onSave: (dataUrl: string) => void;
  onClear: () => void;
}

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b, a: 255 };
};

export const CostumePainter: React.FC<CostumePainterProps> = ({ onSave, onClear, initialImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3B82F6');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'fill'>('pen');

  const [isReady, setIsReady] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Transparent background
        
        if (initialImage) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
            setIsReady(true);
          };
          img.src = initialImage;
        } else {
          setIsReady(true);
        }
      }
    }
  }, [initialImage]);

  const floodFill = (ctx: CanvasRenderingContext2D, startX: number, startY: number, hexColor: string) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    const x = Math.floor(startX);
    const y = Math.floor(startY);
    
    if (x < 0 || x >= width || y < 0 || y >= height) return;

    const fillColor = hexToRgb(hexColor);
    const startPos = (y * width + x) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    const startA = data[startPos + 3];

    if (startR === fillColor.r && startG === fillColor.g && startB === fillColor.b && startA === fillColor.a) {
      return;
    }

    const matchStartColor = (pos: number) => {
      return data[pos] === startR && data[pos + 1] === startG && data[pos + 2] === startB && data[pos + 3] === startA;
    };

    const colorPixel = (pos: number) => {
      data[pos] = fillColor.r;
      data[pos + 1] = fillColor.g;
      data[pos + 2] = fillColor.b;
      data[pos + 3] = fillColor.a;
    };

    const pixelStack: [number, number][] = [[x, y]];

    while (pixelStack.length > 0) {
      const newPos = pixelStack.pop()!;
      const currX = newPos[0];
      let currY = newPos[1];

      let pixelPos = (currY * width + currX) * 4;
      
      while (currY >= 0 && matchStartColor(pixelPos)) {
        currY--;
        pixelPos -= width * 4;
      }
      
      pixelPos += width * 4;
      currY++;
      
      let reachLeft = false;
      let reachRight = false;
      
      while (currY < height && matchStartColor(pixelPos)) {
        colorPixel(pixelPos);
        
        if (currX > 0) {
          if (matchStartColor(pixelPos - 4)) {
            if (!reachLeft) {
              pixelStack.push([currX - 1, currY]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }
        
        if (currX < width - 1) {
          if (matchStartColor(pixelPos + 4)) {
            if (!reachRight) {
              pixelStack.push([currX + 1, currY]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }
        
        currY++;
        pixelPos += width * 4;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    if (tool === 'fill') {
      floodFill(ctx, x, y, color);
      return;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === 'fill') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineTo(x, y);
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    // Reset global composite operation
    ctx.globalCompositeOperation = 'source-over';
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.closePath();
      }
      setIsDrawing(false);
    }
  };

  const handleSave = () => {
    if (canvasRef.current && isReady) {
      onSave(canvasRef.current.toDataURL('image/png'));
    }
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row gap-6 p-4">
      {/* Tools Panel */}
      <div className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t("ui.tool")}</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setTool('pen')}
              className={`flex-1 flex justify-center py-2 rounded-lg border transition ${tool === 'pen' ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'}`}
              title={t("ui.pen")}
            >
              <Pen className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setTool('eraser')}
              className={`flex-1 flex justify-center py-2 rounded-lg border transition ${tool === 'eraser' ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'}`}
              title={t("ui.eraser")}
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setTool('fill')}
              className={`flex-1 flex justify-center py-2 rounded-lg border transition ${tool === 'fill' ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'}`}
              title={t("ui.bucket")}
            >
              <PaintBucket className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t("ui.color")}</label>
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === 'eraser'}
            className={`w-full h-12 rounded-lg cursor-pointer border-0 p-1 ${tool === 'eraser' ? 'opacity-50 grayscale' : ''}`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t("ui.size")}: {brushSize}px</label>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
          <button 
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold shadow-sm transition"
          >
            <Check className="w-5 h-5" /> {t("ui.saveCostume")}
          </button>
          
          <button 
            onClick={onClear}
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 py-3 rounded-xl font-bold shadow-sm transition mt-2"
          >
            <X className="w-5 h-5" /> {t("ui.removeCostume")}
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-grow flex justify-center items-center bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700">
        <div className="bg-transparent shadow-md rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600" style={{ width: 480, height: 360, backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYNgfQMgm0J9B8A8GM1A6kEANo2EUjIJRMArQoRBG05FBwGg6MggYSQcA5B8mE8q7GZQAAAAASUVORK5CYII=")' }}>
          <canvas
            ref={canvasRef}
            width={480}
            height={360}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            className="cursor-crosshair touch-none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};
