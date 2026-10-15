import React, { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 100);
    const t2 = setTimeout(() => setShowExplosion(true), 1100); // 1s delay
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-950">
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes explosion {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(2) rotate(360deg); opacity: 0; }
        }
        .animate-progress { animation: progress 3s linear forwards; }
        .animate-explosion { animation: explosion 2s ease-out forwards; }
        .logo-box { @apply w-20 h-20 rounded-2xl flex items-center justify-center font-black text-white shadow-2xl text-2xl border-4 border-white/20 backdrop-blur-sm; }
      `}</style>
      
      {/* Detailed Progress Bar */}
      <div className="absolute bottom-10 left-10 right-10 h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700 shadow-inner">
        <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-progress shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
      </div>

      {/* MicioCode Text */}
      <h1 className={`text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 transition-opacity duration-1000 ${showLogo ? 'opacity-100' : 'opacity-0'} tracking-tighter drop-shadow-2xl`}>
        MicioCode
      </h1>

      {/* Explosion */}
      {showExplosion && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-explosion flex gap-10">
             <div className="logo-box bg-gradient-to-br from-yellow-400 to-yellow-600">JS</div>
             <div className="logo-box bg-gradient-to-br from-blue-500 to-blue-700">TS</div>
             <div className="logo-box bg-gradient-to-br from-orange-500 to-orange-700">HTML</div>
             <div className="logo-box bg-gradient-to-br from-blue-300 to-blue-500">CSS</div>
             <div className="logo-box bg-gradient-to-br from-purple-500 to-purple-700">React</div>
          </div>
        </div>
      )}
    </div>
  );
};
