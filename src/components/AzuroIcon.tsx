import React from 'react';

export const AzuroIcon = ({ 
  className = "w-8 h-8", 
  style, 
  costume = 1,
  mood = 'happy'
}: { 
  className?: string; 
  style?: React.CSSProperties; 
  costume?: number;
  mood?: 'happy' | 'frown';
}) => {
  const currentCostume = ((costume - 1) % 4) + 1;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
    >
      {/* Tail (Behind body) */}
      {currentCostume === 2 ? (
        <path d="M 60 70 Q 98 60 90 25" fill="none" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" />
      ) : currentCostume === 3 ? (
        <path d="M 60 70 Q 95 90 92 45" fill="none" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" />
      ) : (
        <path d="M 60 70 Q 95 85 85 40" fill="none" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
      )}

      {/* Back Legs */}
      <ellipse cx="32" cy="78" rx="9" ry="12" fill="#3B82F6" />
      <ellipse cx="68" cy="78" rx="9" ry="12" fill="#3B82F6" />
      <ellipse cx="32" cy="85" rx="6" ry="4" fill="#60A5FA" />
      <ellipse cx="68" cy="85" rx="6" ry="4" fill="#60A5FA" />

      {/* Body */}
      <ellipse cx="50" cy="65" rx="22" ry="26" fill="#3B82F6" />
      
      {/* Belly */}
      <ellipse cx="50" cy="68" rx="14" ry="18" fill="#60A5FA" />

      {/* Front Legs & Paws */}
      {currentCostume === 3 ? (
        <>
          {/* Right leg normal */}
          <rect x="55" y="60" width="8" height="30" rx="4" fill="#3B82F6" />
          <ellipse cx="59" cy="88" rx="4" ry="3" fill="#60A5FA" />
          {/* Left leg waving high! */}
          <path d="M 38 65 Q 20 45 22 35" fill="none" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
          <circle cx="22" cy="35" r="5" fill="#60A5FA" />
        </>
      ) : currentCostume === 2 ? (
        <>
          {/* Walking pose (staggered legs) */}
          <rect x="36" y="58" width="8" height="28" rx="4" fill="#3B82F6" transform="rotate(-15 40 60)" />
          <ellipse cx="33" cy="85" rx="4" ry="3" fill="#60A5FA" />
          <rect x="56" y="62" width="8" height="28" rx="4" fill="#3B82F6" transform="rotate(15 60 60)" />
          <ellipse cx="67" cy="87" rx="4" ry="3" fill="#60A5FA" />
        </>
      ) : (
        <>
          <rect x="39" y="60" width="8" height="30" rx="4" fill="#3B82F6" />
          <rect x="53" y="60" width="8" height="30" rx="4" fill="#3B82F6" />
          <ellipse cx="43" cy="88" rx="4" ry="3" fill="#60A5FA" />
          <ellipse cx="57" cy="88" rx="4" ry="3" fill="#60A5FA" />
        </>
      )}

      {/* Left Ear */}
      <polygon points="28,25 20,5 45,15" fill="#3B82F6" />
      <polygon points="30,22 24,10 42,16" fill="#60A5FA" />

      {/* Right Ear */}
      <polygon points="72,25 80,5 55,15" fill="#3B82F6" />
      <polygon points="70,22 76,10 58,16" fill="#60A5FA" />

      {/* Head */}
      <circle cx="50" cy="35" r="25" fill="#3B82F6" />

      {/* Eyes */}
      {currentCostume === 4 ? (
        <>
          {/* Winking eye */}
          <path d="M 35 34 Q 40 38 45 34" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="32" r="5" fill="white" />
          <circle cx="60" cy="32" r="2.5" fill="#1E3A8A" />
        </>
      ) : (
        <>
          <circle cx="40" cy="32" r="5" fill="white" />
          <circle cx="40" cy="32" r="2.5" fill="#1E3A8A" />
          <circle cx="60" cy="32" r="5" fill="white" />
          <circle cx="60" cy="32" r="2.5" fill="#1E3A8A" />
        </>
      )}

      {/* Nose & Mouth */}
      <polygon points="47,40 53,40 50,44" fill="#1E3A8A" />
      {mood === 'frown' ? (
        <path d="M 43 49 Q 50 45 57 49" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M 43 46 Q 50 54 57 46" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}

      {/* Whiskers */}
      <g stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round">
        <line x1="12" y1="30" x2="28" y2="33" />
        <line x1="10" y1="36" x2="28" y2="36" />
        <line x1="12" y1="42" x2="28" y2="39" />
        <line x1="88" y1="30" x2="72" y2="33" />
        <line x1="90" y1="36" x2="72" y2="36" />
        <line x1="88" y1="42" x2="72" y2="39" />
      </g>
    </svg>
  );
};

