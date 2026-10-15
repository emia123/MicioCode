import React from 'react';

type IconProps = { size?: number, color?: string, className?: string, style?: React.CSSProperties };

export const CatIcon = ({ size = 100, color = '#F59E0B', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <ellipse cx="50" cy="55" rx="35" ry="30" fill={color} />
    <polygon points="20,10 15,40 35,30" fill={color} />
    <polygon points="80,10 85,40 65,30" fill={color} />
    <circle cx="35" cy="45" r="5" fill="white" />
    <circle cx="35" cy="45" r="2" fill="black" />
    <circle cx="65" cy="45" r="5" fill="white" />
    <circle cx="65" cy="45" r="2" fill="black" />
    <polygon points="47,55 53,55 50,60" fill="black" />
    <path d="M 45 65 Q 50 70 55 65" stroke="black" strokeWidth="2" fill="none" />
    <path d="M 10 50 L 25 55 M 10 60 L 25 60 M 10 70 L 25 65" stroke="black" strokeWidth="1.5" />
    <path d="M 90 50 L 75 55 M 90 60 L 75 60 M 90 70 L 75 65" stroke="black" strokeWidth="1.5" />
  </svg>
);

export const DogIcon = ({ size = 100, color = '#8B5CF6', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <ellipse cx="50" cy="55" rx="35" ry="30" fill={color} />
    <ellipse cx="25" cy="40" rx="15" ry="25" fill={color} transform="rotate(-20 25 40)" />
    <ellipse cx="75" cy="40" rx="15" ry="25" fill={color} transform="rotate(20 75 40)" />
    <circle cx="35" cy="45" r="5" fill="white" />
    <circle cx="35" cy="45" r="2" fill="black" />
    <circle cx="65" cy="45" r="5" fill="white" />
    <circle cx="65" cy="45" r="2" fill="black" />
    <ellipse cx="50" cy="65" rx="15" ry="10" fill="white" opacity="0.8"/>
    <polygon points="45,58 55,58 50,64" fill="black" />
    <path d="M 45 68 Q 50 73 55 68" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

export const BirdIcon = ({ size = 100, color = '#3B82F6', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <ellipse cx="50" cy="50" rx="30" ry="25" fill={color} />
    <circle cx="65" cy="40" r="18" fill={color} />
    <polygon points="80,35 95,40 80,45" fill="#F59E0B" />
    <circle cx="70" cy="35" r="4" fill="white" />
    <circle cx="71" cy="35" r="1.5" fill="black" />
    <path d="M 25 45 Q 10 30 15 50 Q 5 60 25 55" fill={color} />
    <path d="M 45 75 L 45 90 M 55 75 L 55 90" stroke="black" strokeWidth="3" />
    <path d="M 40 90 L 45 90 M 50 90 L 55 90" stroke="black" strokeWidth="3" />
  </svg>
);

export const CarIcon = ({ size = 100, color = '#EF4444', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 20 45 L 30 25 L 70 25 L 80 45 L 90 45 L 90 70 L 10 70 L 10 45 Z" fill={color} />
    <rect x="35" y="30" width="12" height="15" fill="white" opacity="0.8" />
    <rect x="53" y="30" width="12" height="15" fill="white" opacity="0.8" />
    <circle cx="30" cy="70" r="12" fill="#333" />
    <circle cx="30" cy="70" r="5" fill="#ccc" />
    <circle cx="70" cy="70" r="12" fill="#333" />
    <circle cx="70" cy="70" r="5" fill="#ccc" />
    <rect x="15" y="55" width="8" height="4" fill="yellow" />
    <rect x="77" y="55" width="8" height="4" fill="red" />
  </svg>
);

export const RocketIcon = ({ size = 100, color = '#6366F1', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 50 10 Q 70 30 65 70 L 35 70 Q 30 30 50 10" fill={color} />
    <polygon points="35,50 20,70 35,70" fill={color} />
    <polygon points="65,50 80,70 65,70" fill={color} />
    <path d="M 40 70 L 60 70 L 55 85 L 45 85 Z" fill="#333" />
    <polygon points="45,85 55,85 50,100" fill="#F59E0B" />
    <circle cx="50" cy="40" r="8" fill="white" />
    <circle cx="50" cy="40" r="6" fill="#87CEEB" />
  </svg>
);

export const StarIcon = ({ size = 100, color = '#EAB308', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <polygon points="50,10 61,35 88,39 68,57 73,83 50,70 27,83 32,57 12,39 39,35" fill={color} stroke="#CA8A04" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="43" cy="50" r="4" fill="black" />
    <circle cx="57" cy="50" r="4" fill="black" />
    <path d="M 47 60 Q 50 65 53 60" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const HeartIcon = ({ size = 100, color = '#F43F5E', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 50 85 Q 10 50 15 25 A 15 15 0 0 1 50 35 A 15 15 0 0 1 85 25 Q 90 50 50 85" fill={color} stroke="#BE123C" strokeWidth="2" />
    <path d="M 25 30 A 8 8 0 0 1 40 25" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
  </svg>
);

export const AppleIcon = ({ size = 100, color = '#EF4444', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 50 25 Q 70 20 80 40 Q 90 70 65 85 Q 50 90 35 85 Q 10 70 20 40 Q 30 20 50 25" fill={color} />
    <path d="M 50 25 Q 45 10 60 5" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M 55 15 Q 75 5 80 20 Q 65 25 55 15" fill="#10B981" />
  </svg>
);

export const BananaIcon = ({ size = 100, color = '#FBBF24', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 20 80 Q 50 90 80 50 Q 85 40 75 35 Q 60 70 25 70 Q 15 70 20 80" fill={color} />
    <path d="M 75 35 Q 85 25 80 20" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M 20 80 Q 15 85 10 80" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export const PizzaIcon = ({ size = 100, color = '#F59E0B', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <polygon points="50,90 20,25 80,25" fill={color} />
    <path d="M 15 25 Q 50 15 85 25" stroke="#D97706" strokeWidth="8" fill="none" strokeLinecap="round" />
    <circle cx="40" cy="40" r="5" fill="#EF4444" />
    <circle cx="60" cy="45" r="4" fill="#EF4444" />
    <circle cx="50" cy="65" r="5" fill="#EF4444" />
    <circle cx="45" cy="52" r="3" fill="#10B981" />
    <circle cx="65" cy="60" r="3" fill="#10B981" />
  </svg>
);

export const SunIcon = ({ size = 100, color = '#F59E0B', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <circle cx="50" cy="50" r="25" fill={color} />
    <g stroke={color} strokeWidth="6" strokeLinecap="round">
      <line x1="50" y1="10" x2="50" y2="20" />
      <line x1="50" y1="80" x2="50" y2="90" />
      <line x1="10" y1="50" x2="20" y2="50" />
      <line x1="80" y1="50" x2="90" y2="50" />
      <line x1="22" y1="22" x2="29" y2="29" />
      <line x1="78" y1="78" x2="71" y2="71" />
      <line x1="22" y1="78" x2="29" y2="71" />
      <line x1="78" y1="22" x2="71" y2="29" />
    </g>
    <circle cx="42" cy="45" r="3" fill="black" />
    <circle cx="58" cy="45" r="3" fill="black" />
    <path d="M 45 55 Q 50 60 55 55" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const CloudIcon = ({ size = 100, color = '#9CA3AF', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 30 70 A 15 15 0 0 1 30 40 A 20 20 0 0 1 65 35 A 15 15 0 0 1 75 65 Z" fill={color} opacity="0.5"/>
    <path d="M 25 75 A 15 15 0 0 1 25 45 A 25 25 0 0 1 70 40 A 18 18 0 0 1 80 75 Z" fill={color} />
  </svg>
);

export const SnailIcon = ({ size = 100, color = '#10B981', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 20 75 L 80 75 A 10 10 0 0 0 80 55 L 75 55 A 10 10 0 0 0 20 75" fill="#FCD34D" />
    <circle cx="45" cy="55" r="20" fill={color} />
    <path d="M 45 35 A 20 20 0 0 1 65 55 A 10 10 0 0 1 55 65 A 5 5 0 0 1 50 60 A 2.5 2.5 0 0 1 52.5 57.5" stroke="#047857" strokeWidth="3" fill="none" />
    <path d="M 75 55 L 85 45 M 80 55 L 90 48" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
    <circle cx="85" cy="45" r="2" fill="black" />
    <circle cx="90" cy="48" r="2" fill="black" />
  </svg>
);

export const RabbitIcon = ({ size = 100, color = '#EC4899', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <ellipse cx="50" cy="65" rx="25" ry="20" fill={color} />
    <ellipse cx="70" cy="50" r="15" fill={color} />
    <ellipse cx="65" cy="25" rx="5" ry="20" fill={color} transform="rotate(15 65 25)" />
    <ellipse cx="75" cy="25" rx="5" ry="20" fill={color} transform="rotate(35 75 25)" />
    <circle cx="75" cy="45" r="3" fill="black" />
    <circle cx="85" cy="50" r="2" fill="black" />
    <ellipse cx="20" cy="65" rx="8" ry="8" fill="white" />
  </svg>
);

export const TurtleIcon = ({ size = 100, color = '#059669', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <ellipse cx="50" cy="60" rx="35" ry="20" fill={color} />
    <path d="M 15 60 Q 50 30 85 60" fill="#047857" />
    <circle cx="85" cy="65" r="12" fill={color} />
    <circle cx="88" cy="62" r="3" fill="black" />
    <ellipse cx="30" cy="80" rx="6" ry="10" fill={color} />
    <ellipse cx="70" cy="80" rx="6" ry="10" fill={color} />
    <path d="M 50 40 L 40 50 M 50 40 L 60 50 M 35 60 L 45 50 M 65 60 L 55 50" stroke="#064E3B" strokeWidth="2" />
  </svg>
);

export const PlaneIcon = ({ size = 100, color = '#0EA5E9', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 20 60 Q 50 60 85 40 Q 90 35 85 30 Q 50 40 20 40 Z" fill={color} />
    <polygon points="40,50 60,30 65,50" fill="#38BDF8" />
    <polygon points="20,40 10,25 25,45" fill="#0284C7" />
    <polygon points="20,60 10,75 25,55" fill="#0284C7" />
    <path d="M 70 35 L 75 35" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const GhostIcon = ({ size = 100, color = '#9CA3AF', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 25 80 L 25 40 A 25 25 0 0 1 75 40 L 75 80 L 65 70 L 50 80 L 35 70 Z" fill={color} />
    <circle cx="40" cy="45" r="5" fill="black" />
    <circle cx="60" cy="45" r="5" fill="black" />
    <ellipse cx="50" cy="60" rx="6" ry="8" fill="black" />
  </svg>
);

export const CherryIcon = ({ size = 100, color = '#BE123C', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <circle cx="35" cy="75" r="15" fill={color} />
    <circle cx="75" cy="65" r="15" fill={color} />
    <path d="M 35 60 Q 40 20 55 15" stroke="#047857" strokeWidth="4" fill="none" />
    <path d="M 75 50 Q 60 20 55 15" stroke="#047857" strokeWidth="4" fill="none" />
    <path d="M 55 15 Q 70 10 75 25 Q 60 20 55 15" fill="#10B981" />
    <circle cx="30" cy="70" r="4" fill="white" opacity="0.5" />
    <circle cx="70" cy="60" r="4" fill="white" opacity="0.5" />
  </svg>
);

export const MoonIcon = ({ size = 100, color = '#6366F1', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    <path d="M 50 15 A 35 35 0 0 0 50 85 A 40 40 0 0 1 50 15 Z" fill={color} />
    <circle cx="35" cy="40" r="3" fill="#312E81" />
    <circle cx="30" cy="60" r="4" fill="#312E81" />
    <circle cx="45" cy="70" r="2" fill="#312E81" />
  </svg>
);

export const AngryRedIcon = ({ size = 100, color = '#E53935', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Tail feathers */}
    <path d="M 18 54 L 4 48 L 7 57 L 2 62 L 9 66 L 5 72 L 18 64 Z" fill="#1F2937" />
    {/* Crest feathers */}
    <path d="M 45 22 Q 33 6 24 10 Q 28 22 41 26 Z" fill="#DC2626" />
    <path d="M 50 21 Q 44 2 34 4 Q 38 18 47 25 Z" fill="#EF4444" />
    {/* Body */}
    <circle cx="52" cy="56" r="36" fill={color} stroke="#B91C1C" strokeWidth="2" />
    {/* Belly patch */}
    <path d="M 32 72 Q 52 94 72 72 Q 52 64 32 72 Z" fill="#FDE68A" opacity="0.9" />
    {/* Spots */}
    <ellipse cx="26" cy="50" rx="3.5" ry="4.5" fill="#991B1B" opacity="0.6" />
    <ellipse cx="22" cy="58" rx="2.5" ry="3.5" fill="#991B1B" opacity="0.6" />
    <ellipse cx="78" cy="52" rx="3.5" ry="4.5" fill="#991B1B" opacity="0.6" />
    {/* Eyebrows */}
    <polygon points="26,38 52,49 78,38 76,44 52,55 28,44" fill="#111827" />
    {/* Eyes */}
    <circle cx="42" cy="52" r="7.5" fill="white" stroke="#111827" strokeWidth="1.5" />
    <circle cx="44" cy="52" r="3" fill="#111827" />
    <circle cx="45" cy="51" r="1" fill="white" />
    <circle cx="62" cy="52" r="7.5" fill="white" stroke="#111827" strokeWidth="1.5" />
    <circle cx="60" cy="52" r="3" fill="#111827" />
    <circle cx="59" cy="51" r="1" fill="white" />
    {/* Beak */}
    <polygon points="38,55 66,55 52,71" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
    <polygon points="40,55 64,55 52,63" fill="#FBBF24" />
    <path d="M 38 55 Q 52 60 66 55" stroke="#B45309" strokeWidth="1.5" fill="none" />
  </svg>
);

export const AngryChuckIcon = ({ size = 100, color = '#FACC15', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Tail feathers */}
    <path d="M 22 68 L 6 65 L 12 73 L 4 79 L 14 82 L 25 78 Z" fill="#1F2937" />
    {/* Top hair tuft */}
    <path d="M 50 16 L 42 2 L 48 18 L 36 6 L 44 22 L 32 14 L 42 26 Z" fill="#1F2937" />
    {/* Triangular Body */}
    <path d="M 50 18 Q 54 18 58 26 L 86 72 Q 90 80 80 84 L 24 84 Q 14 80 18 72 L 44 26 Q 47 18 50 18 Z" fill={color} stroke="#EAB308" strokeWidth="2" />
    {/* Belly */}
    <path d="M 30 84 Q 52 70 74 84 Z" fill="#FEF08A" />
    {/* Eyebrows */}
    <polygon points="26,42 48,50 47,45 27,37" fill="#92400E" />
    <polygon points="76,42 54,50 55,45 75,37" fill="#92400E" />
    {/* Eyes */}
    <circle cx="42" cy="52" r="7" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="44" cy="52" r="2.5" fill="#1F2937" />
    <circle cx="45" cy="51" r="0.8" fill="white" />
    <circle cx="60" cy="52" r="7" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="58" cy="52" r="2.5" fill="#1F2937" />
    <circle cx="57" cy="51" r="0.8" fill="white" />
    {/* Long Beak */}
    <polygon points="42,56 82,62 42,70" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M 42 56 L 82 62" stroke="#EA580C" strokeWidth="1.5" />
    <path d="M 42 63 L 72 62" stroke="#9A3412" strokeWidth="1.2" />
  </svg>
);

export const AngryBombIcon = ({ size = 100, color = '#1F2937', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Fuse with yellow tip */}
    <path d="M 50 20 Q 52 10 50 4" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" fill="none" />
    <polygon points="50,4 47,0 53,0" fill="#FACC15" />
    <circle cx="50" cy="2" r="3" fill="#EF4444" opacity="0.8" />
    {/* Body */}
    <circle cx="50" cy="56" r="35" fill={color} stroke="#111827" strokeWidth="2" />
    {/* Belly */}
    <ellipse cx="50" cy="74" rx="20" ry="14" fill="#374151" />
    {/* White forehead dot */}
    <circle cx="50" cy="38" r="3" fill="white" opacity="0.9" />
    {/* Fierce Red Eyebrows */}
    <polygon points="26,39 49,47 48,43 27,35" fill="#EF4444" />
    <polygon points="74,39 51,47 52,43 73,35" fill="#EF4444" />
    {/* Eye grey circles & Eyes */}
    <circle cx="41" cy="52" r="9" fill="#4B5563" />
    <circle cx="41" cy="52" r="7" fill="white" stroke="#111827" strokeWidth="1" />
    <circle cx="43" cy="52" r="2.5" fill="#111827" />
    <circle cx="59" cy="52" r="9" fill="#4B5563" />
    <circle cx="59" cy="52" r="7" fill="white" stroke="#111827" strokeWidth="1" />
    <circle cx="57" cy="52" r="2.5" fill="#111827" />
    {/* Beak */}
    <polygon points="38,55 62,55 50,71" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
    <polygon points="40,55 60,55 50,62" fill="#FBBF24" />
  </svg>
);

export const AngryMatildaIcon = ({ size = 100, color = '#F9FAFB', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Tail */}
    <path d="M 16 60 L 4 55 L 7 64 L 2 70 L 16 68 Z" fill="#1F2937" />
    {/* Head Crest (3 black feathers) */}
    <path d="M 48 20 Q 38 4 30 8 Q 36 18 46 22 Z" fill="#1F2937" />
    <path d="M 52 20 Q 50 2 40 4 Q 44 16 50 22 Z" fill="#1F2937" />
    <path d="M 55 20 Q 60 4 52 6 Q 52 16 54 22 Z" fill="#1F2937" />
    {/* Oval Egg Body */}
    <ellipse cx="52" cy="56" rx="33" ry="36" fill={color} stroke="#E5E7EB" strokeWidth="2" />
    {/* Pink Cheeks */}
    <circle cx="28" cy="58" r="6" fill="#FCA5A5" opacity="0.6" />
    <circle cx="74" cy="58" r="6" fill="#FCA5A5" opacity="0.6" />
    {/* Cheerful Eyebrows */}
    <path d="M 32 40 Q 42 35 48 43" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M 70 40 Q 60 35 54 43" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Eyes with eyelashes */}
    <circle cx="41" cy="49" r="6.5" fill="white" stroke="#1F2937" strokeWidth="1.2" />
    <circle cx="43" cy="49" r="2.5" fill="#1F2937" />
    <path d="M 35 44 L 32 41 M 38 43 L 36 39" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="61" cy="49" r="6.5" fill="white" stroke="#1F2937" strokeWidth="1.2" />
    <circle cx="59" cy="49" r="2.5" fill="#1F2937" />
    <path d="M 67 44 L 70 41 M 64 43 L 66 39" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
    {/* Cute Yellow Beak */}
    <polygon points="40,53 62,53 51,67" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M 40 53 Q 51 57 62 53" stroke="#B45309" strokeWidth="1.2" fill="none" />
  </svg>
);

export const AngryBluesIcon = ({ size = 100, color = '#38BDF8', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Tail */}
    <path d="M 22 58 L 10 54 L 14 62 L 8 68 L 22 66 Z" fill="#1F2937" />
    {/* Head tuft (2 tiny blue feathers) */}
    <path d="M 47 24 Q 40 12 34 16 Q 38 24 45 27 Z" fill="#0284C7" />
    <path d="M 52 24 Q 48 10 42 12 Q 45 22 50 26 Z" fill="#0EA5E9" />
    {/* Round Body */}
    <circle cx="52" cy="56" r="30" fill={color} stroke="#0284C7" strokeWidth="2" />
    {/* Orange eye ring patches */}
    <circle cx="41" cy="50" r="10" fill="#FB923C" opacity="0.8" />
    <circle cx="61" cy="50" r="10" fill="#FB923C" opacity="0.8" />
    {/* Small Angry Eyebrows */}
    <polygon points="31,41 48,46 47,43 32,39" fill="#1E293B" />
    <polygon points="71,41 54,46 55,43 70,39" fill="#1E293B" />
    {/* Big expressive eyes */}
    <circle cx="42" cy="51" r="6.5" fill="white" stroke="#1E293B" strokeWidth="1.2" />
    <circle cx="44" cy="51" r="2.5" fill="#1E293B" />
    <circle cx="45" cy="50" r="1" fill="white" />
    <circle cx="60" cy="51" r="6.5" fill="white" stroke="#1E293B" strokeWidth="1.2" />
    <circle cx="58" cy="51" r="2.5" fill="#1E293B" />
    <circle cx="57" cy="50" r="1" fill="white" />
    {/* Small Beak */}
    <polygon points="42,54 60,54 51,64" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

export const AngryTerenceIcon = ({ size = 100, color = '#991B1B', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Tail */}
    <path d="M 15 56 L 2 50 L 5 58 L 0 64 L 6 68 L 2 74 L 15 67 Z" fill="#111827" />
    {/* Heavy Crest */}
    <path d="M 44 20 Q 32 4 22 8 Q 26 20 40 24 Z" fill="#7F1D1D" />
    <path d="M 50 19 Q 42 0 32 2 Q 36 16 46 23 Z" fill="#991B1B" />
    {/* Giant Massive Body */}
    <circle cx="52" cy="56" r="37" fill={color} stroke="#7F1D1D" strokeWidth="2.5" />
    {/* Belly */}
    <path d="M 30 76 Q 52 96 74 76 Q 52 68 30 76 Z" fill="#FDE68A" opacity="0.8" />
    {/* Dark Maroon Spots */}
    <ellipse cx="24" cy="46" rx="5" ry="6" fill="#450A0A" opacity="0.6" />
    <ellipse cx="20" cy="58" rx="4" ry="5" fill="#450A0A" opacity="0.6" />
    <ellipse cx="80" cy="48" rx="5" ry="6" fill="#450A0A" opacity="0.6" />
    <ellipse cx="78" cy="62" rx="4" ry="4" fill="#450A0A" opacity="0.6" />
    {/* Forehead wrinkles */}
    <path d="M 38 28 Q 52 33 66 28" stroke="#450A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M 42 33 Q 52 37 62 33" stroke="#450A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Giant bushy unibrow / angry eyebrows */}
    <polygon points="20,36 52,48 84,36 80,44 52,56 24,44" fill="#111827" />
    {/* Tiny menacing eyes */}
    <circle cx="41" cy="53" r="5" fill="white" stroke="#111827" strokeWidth="1.5" />
    <circle cx="42" cy="53" r="2" fill="#111827" />
    <circle cx="61" cy="53" r="5" fill="white" stroke="#111827" strokeWidth="1.5" />
    <circle cx="60" cy="53" r="2" fill="#111827" />
    {/* Heavy Frown Beak */}
    <polygon points="36,56 66,56 51,70" fill="#D97706" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M 36 56 Q 51 61 66 56" stroke="#78350F" strokeWidth="1.5" fill="none" />
  </svg>
);

export const AngryStellaIcon = ({ size = 100, color = '#F472B6', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Crest feathers (pink with black tips) */}
    <path d="M 44 24 Q 32 8 24 14 Q 30 22 40 27 Z" fill="#EC4899" />
    <path d="M 28 11 Q 24 14 27 18 L 24 14 Z" fill="#1F2937" />
    <path d="M 50 22 Q 44 4 36 8 Q 40 18 46 25 Z" fill="#F472B6" />
    <path d="M 40 6 Q 36 8 38 12 L 36 8 Z" fill="#1F2937" />
    <path d="M 56 23 Q 58 6 50 8 Q 50 18 52 25 Z" fill="#F472B6" />
    <path d="M 54 7 Q 50 8 51 12 L 50 8 Z" fill="#1F2937" />
    {/* Body */}
    <circle cx="52" cy="56" r="32" fill={color} stroke="#DB2777" strokeWidth="2" />
    {/* Belly */}
    <path d="M 36 74 Q 52 90 68 74 Q 52 68 36 74 Z" fill="#FDF2F8" />
    {/* Pink Cheeks */}
    <circle cx="30" cy="60" r="5" fill="#F43F5E" opacity="0.4" />
    <circle cx="72" cy="60" r="5" fill="#F43F5E" opacity="0.4" />
    {/* Eyelashes & Big Blue Eyes */}
    <path d="M 32 42 L 28 38 M 36 40 L 34 35" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 70 42 L 74 38 M 66 40 L 68 35" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="41" cy="49" r="8" fill="white" stroke="#1F2937" strokeWidth="1.2" />
    <circle cx="42" cy="49" r="4.5" fill="#0284C7" />
    <circle cx="43" cy="49" r="2.5" fill="#0F172A" />
    <circle cx="44" cy="47" r="1.2" fill="white" />
    <circle cx="61" cy="49" r="8" fill="white" stroke="#1F2937" strokeWidth="1.2" />
    <circle cx="60" cy="49" r="4.5" fill="#0284C7" />
    <circle cx="59" cy="49" r="2.5" fill="#0F172A" />
    <circle cx="58" cy="47" r="1.2" fill="white" />
    {/* Cute Beak */}
    <polygon points="42,54 60,54 51,65" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

export const AngryKingPigIcon = ({ size = 100, color = '#84CC16', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Ears */}
    <circle cx="24" cy="36" r="8" fill={color} stroke="#65A30D" strokeWidth="2" />
    <circle cx="24" cy="36" r="4" fill="#4D7C0F" />
    <circle cx="78" cy="36" r="8" fill={color} stroke="#65A30D" strokeWidth="2" />
    <circle cx="78" cy="36" r="4" fill="#4D7C0F" />
    {/* Body */}
    <circle cx="51" cy="58" r="35" fill={color} stroke="#65A30D" strokeWidth="2" />
    {/* Golden Royal Crown */}
    <polygon points="36,26 38,10 45,18 51,8 57,18 64,10 66,26" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="36" y="24" width="30" height="4" fill="#EAB308" />
    {/* Crown Jewels */}
    <circle cx="45" cy="20" r="1.8" fill="#EF4444" />
    <circle cx="51" cy="17" r="2.2" fill="#3B82F6" />
    <circle cx="57" cy="20" r="1.8" fill="#10B981" />
    {/* Eyes */}
    <circle cx="38" cy="47" r="8" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="40" cy="47" r="2.8" fill="#1F2937" />
    <circle cx="41" cy="46" r="0.8" fill="white" />
    <circle cx="64" cy="47" r="8" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="62" cy="47" r="2.8" fill="#1F2937" />
    <circle cx="61" cy="46" r="0.8" fill="white" />
    {/* Snout */}
    <ellipse cx="51" cy="62" rx="16" ry="12" fill="#A3E635" stroke="#65A30D" strokeWidth="2" />
    <ellipse cx="44" cy="62" rx="3.5" ry="5.5" fill="#365314" />
    <ellipse cx="58" cy="62" rx="3.5" ry="5.5" fill="#365314" />
    {/* Cheerful Grin */}
    <path d="M 40 76 Q 51 84 62 76" stroke="#365314" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const AngryPigIcon = ({ size = 100, color = '#84CC16', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Ears */}
    <circle cx="25" cy="34" r="8" fill={color} stroke="#65A30D" strokeWidth="2" />
    <circle cx="25" cy="34" r="4" fill="#4D7C0F" />
    <circle cx="77" cy="34" r="8" fill={color} stroke="#65A30D" strokeWidth="2" />
    <circle cx="77" cy="34" r="4" fill="#4D7C0F" />
    {/* Body */}
    <circle cx="51" cy="56" r="34" fill={color} stroke="#65A30D" strokeWidth="2" />
    {/* Eyes */}
    <circle cx="37" cy="46" r="7.5" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="39" cy="46" r="2.8" fill="#1F2937" />
    <circle cx="40" cy="45" r="0.8" fill="white" />
    <circle cx="65" cy="46" r="7.5" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="63" cy="46" r="2.8" fill="#1F2937" />
    <circle cx="62" cy="45" r="0.8" fill="white" />
    {/* Snout */}
    <ellipse cx="51" cy="59" rx="15" ry="11" fill="#A3E635" stroke="#65A30D" strokeWidth="2" />
    <ellipse cx="45" cy="59" rx="3.2" ry="5" fill="#365314" />
    <ellipse cx="57" cy="59" rx="3.2" ry="5" fill="#365314" />
    {/* Grin & bottom tooth */}
    <path d="M 42 72 Q 51 80 60 72" stroke="#365314" strokeWidth="2" strokeLinecap="round" fill="none" />
    <polygon points="48,74 54,74 52,78" fill="white" stroke="#365314" strokeWidth="0.8" />
  </svg>
);

export const AngryHelmetPigIcon = ({ size = 100, color = '#84CC16', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Ears */}
    <circle cx="24" cy="38" r="7" fill={color} stroke="#65A30D" strokeWidth="2" />
    <circle cx="24" cy="38" r="3.5" fill="#4D7C0F" />
    <circle cx="78" cy="38" r="7" fill={color} stroke="#65A30D" strokeWidth="2" />
    <circle cx="78" cy="38" r="3.5" fill="#4D7C0F" />
    {/* Body */}
    <circle cx="51" cy="58" r="34" fill={color} stroke="#65A30D" strokeWidth="2" />
    {/* Helmet */}
    <path d="M 22 42 Q 20 18 51 16 Q 82 18 80 42 Q 51 36 22 42 Z" fill="#64748B" stroke="#334155" strokeWidth="2" />
    <path d="M 20 42 L 82 42" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    {/* Chin Strap */}
    <path d="M 24 43 Q 22 72 40 82" stroke="#475569" strokeWidth="2" fill="none" strokeDasharray="3 2" />
    <path d="M 78 43 Q 80 72 62 82" stroke="#475569" strokeWidth="2" fill="none" strokeDasharray="3 2" />
    {/* Eyes */}
    <circle cx="38" cy="50" r="7" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="40" cy="50" r="2.8" fill="#1F2937" />
    <circle cx="64" cy="50" r="7" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="62" cy="50" r="2.8" fill="#1F2937" />
    {/* Snout */}
    <ellipse cx="51" cy="63" rx="15" ry="11" fill="#A3E635" stroke="#65A30D" strokeWidth="2" />
    <ellipse cx="45" cy="63" rx="3.2" ry="5" fill="#365314" />
    <ellipse cx="57" cy="63" rx="3.2" ry="5" fill="#365314" />
    {/* Tough mouth line */}
    <path d="M 42 76 Q 51 74 60 77" stroke="#365314" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const AngrySilverIcon = ({ size = 100, color = '#94A3B8', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Tail feathers */}
    <path d="M 18 56 L 4 50 L 7 59 L 2 65 L 18 66 Z" fill="#1E293B" />
    {/* Silver's iconic curled head crest (curly swirl) */}
    <path d="M 46 25 C 40 8, 20 10, 24 24 C 27 34, 42 32, 48 26 Z" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
    <path d="M 50 24 C 48 4, 32 4, 36 18 C 40 26, 48 26, 52 25 Z" fill="#94A3B8" />
    {/* Body */}
    <ellipse cx="52" cy="56" rx="34" ry="35" fill={color} stroke="#64748B" strokeWidth="2" />
    {/* White Belly */}
    <path d="M 32 74 Q 52 92 72 74 Q 52 66 32 74 Z" fill="#F8FAFC" />
    {/* Silver's Cheek Marks */}
    <ellipse cx="26" cy="54" rx="4" ry="3" fill="#64748B" opacity="0.6" />
    <ellipse cx="78" cy="54" rx="4" ry="3" fill="#64748B" opacity="0.6" />
    {/* Eyebrows */}
    <path d="M 28 40 Q 40 36 48 44" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    <path d="M 74 40 Q 62 36 54 44" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    {/* Expressive big eyes with eyelashes */}
    <circle cx="41" cy="50" r="7.5" fill="white" stroke="#1E293B" strokeWidth="1.3" />
    <circle cx="42" cy="50" r="3.5" fill="#0284C7" />
    <circle cx="43" cy="50" r="1.8" fill="#0F172A" />
    <circle cx="44" cy="48" r="0.8" fill="white" />
    <path d="M 33 44 L 29 41 M 37 42 L 35 38" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    
    <circle cx="61" cy="50" r="7.5" fill="white" stroke="#1E293B" strokeWidth="1.3" />
    <circle cx="60" cy="50" r="3.5" fill="#0284C7" />
    <circle cx="59" cy="50" r="1.8" fill="#0F172A" />
    <circle cx="58" cy="48" r="0.8" fill="white" />
    <path d="M 69 44 L 73 41 M 65 42 L 67 38" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    {/* Golden/Yellow Beak with goofy tooth */}
    <polygon points="38,55 64,55 51,69" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M 38 55 Q 51 60 64 55" stroke="#B45309" strokeWidth="1.2" fill="none" />
    <polygon points="48,56 54,56 52,61" fill="white" stroke="#D97706" strokeWidth="0.8" />
  </svg>
);

export const AngryBubblesIcon = ({ size = 100, color = '#F97316', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Tail */}
    <path d="M 22 62 L 8 58 L 12 66 L 6 72 L 20 70 Z" fill="#1F2937" />
    {/* Top Tuft (two black feathers with orange base) */}
    <path d="M 46 22 Q 40 8 32 10 Q 36 20 44 25 Z" fill="#1F2937" />
    <path d="M 52 20 Q 50 4 42 6 Q 45 18 50 24 Z" fill="#1F2937" />
    {/* Chubby Round Orange Body */}
    <circle cx="51" cy="58" r="32" fill={color} stroke="#EA580C" strokeWidth="2" />
    {/* Black eye patch rings (raccoon-style patches) */}
    <ellipse cx="39" cy="50" rx="9" ry="8" fill="#1F2937" />
    <ellipse cx="63" cy="50" rx="9" ry="8" fill="#1F2937" />
    {/* Big happy cute eyes inside patches */}
    <circle cx="40" cy="50" r="5.5" fill="white" />
    <circle cx="41" cy="50" r="2.8" fill="#111827" />
    <circle cx="42" cy="49" r="1" fill="white" />
    <circle cx="62" cy="50" r="5.5" fill="white" />
    <circle cx="61" cy="50" r="2.8" fill="#111827" />
    <circle cx="60" cy="49" r="1" fill="white" />
    {/* Cute smiling beak */}
    <polygon points="42,54 60,54 51,64" fill="#FACC15" stroke="#EAB308" strokeWidth="1.2" strokeLinejoin="round" />
    {/* Rosy/Candy Cheeks */}
    <circle cx="28" cy="62" r="4.5" fill="#EF4444" opacity="0.6" />
    <circle cx="74" cy="62" r="4.5" fill="#EF4444" opacity="0.6" />
    {/* Tiny cute tongue under beak */}
    <path d="M 47 64 Q 51 70 55 64 Z" fill="#F43F5E" />
  </svg>
);

// --- OM NOM & FRIENDS (Cut the Rope) ---

// 1. Om Nom (Il piccolo mostriciattolo verde affamato di caramelle)
export const OmNomIcon = ({ size = 100, color = '#65A30D', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Feet / Paws */}
    <ellipse cx="32" cy="85" rx="11" ry="7" fill="#4D7C0F" />
    <ellipse cx="68" cy="85" rx="11" ry="7" fill="#4D7C0F" />
    {/* Little antenna / stalk on head */}
    <path d="M 50 36 Q 48 20 44 14 Q 40 8 46 8 Q 53 10 52 24 Q 52 34 50 36" fill="#4D7C0F" />
    <circle cx="45" cy="10" r="4.5" fill="#65A30D" />
    {/* Body / Head combined pear-shaped */}
    <path d="M 22 55 C 18 36 34 26 50 26 C 66 26 82 36 78 55 C 84 66 84 82 72 85 C 60 87 40 87 28 85 C 16 82 16 66 22 55 Z" fill={color} stroke="#3F6212" strokeWidth="2.5" />
    {/* Huge Iconic Big White Cartoon Eyes */}
    <ellipse cx="36" cy="38" rx="14" ry="16" fill="white" stroke="#1F2937" strokeWidth="2" />
    <ellipse cx="64" cy="38" rx="14" ry="16" fill="white" stroke="#1F2937" strokeWidth="2" />
    {/* Big glossy black pupils looking happily forward/up */}
    <circle cx="39" cy="38" r="7" fill="#111827" />
    <circle cx="61" cy="38" r="7" fill="#111827" />
    {/* Eye Sparkles / Reflections */}
    <circle cx="37" cy="35" r="2.8" fill="white" />
    <circle cx="41" cy="41" r="1.2" fill="white" />
    <circle cx="59" cy="35" r="2.8" fill="white" />
    <circle cx="63" cy="41" r="1.2" fill="white" />
    {/* Big Open Happy Mouth ready to eat candy */}
    <path d="M 27 58 Q 50 50 73 58 Q 78 80 50 82 Q 22 80 27 58 Z" fill="#881337" stroke="#3F6212" strokeWidth="2" />
    {/* Mouth interior & Tongue */}
    <path d="M 36 74 Q 50 63 64 74 Q 50 82 36 74 Z" fill="#F43F5E" />
    {/* 4 Iconic sharp triangular teeth */}
    {/* Upper 2 teeth */}
    <polygon points="34,56 42,57 38,65" fill="white" stroke="#1F2937" strokeWidth="0.8" />
    <polygon points="58,57 66,56 62,65" fill="white" stroke="#1F2937" strokeWidth="0.8" />
    {/* Lower 2 teeth */}
    <polygon points="38,76 45,77 41,69" fill="white" stroke="#1F2937" strokeWidth="0.8" />
    <polygon points="55,77 62,76 59,69" fill="white" stroke="#1F2937" strokeWidth="0.8" />
    {/* Cute tooth cheek curve */}
    <path d="M 23 58 Q 28 53 32 58" stroke="#3F6212" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 77 58 Q 72 53 68 58" stroke="#3F6212" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

// 2. Om Nelle (La compagna eroina rosa di Om Nom con fiocco viola)
export const OmNelleIcon = ({ size = 100, color = '#F472B6', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Feet */}
    <ellipse cx="32" cy="85" rx="10" ry="7" fill="#DB2777" />
    <ellipse cx="68" cy="85" rx="10" ry="7" fill="#DB2777" />
    {/* Purple Head Bow */}
    <path d="M 35 12 Q 50 20 40 28 Q 50 22 50 20 Z" fill="#9333EA" />
    <path d="M 65 12 Q 50 20 60 28 Q 50 22 50 20 Z" fill="#9333EA" />
    <circle cx="50" cy="20" r="4.5" fill="#C084FC" />
    {/* Pear-shaped Pink Body */}
    <path d="M 22 55 C 18 36 34 26 50 26 C 66 26 82 36 78 55 C 84 66 84 82 72 85 C 60 87 40 87 28 85 C 16 82 16 66 22 55 Z" fill={color} stroke="#BE185D" strokeWidth="2.5" />
    {/* Giant Eyes with cute long eyelashes */}
    <ellipse cx="36" cy="38" rx="14" ry="16" fill="white" stroke="#1F2937" strokeWidth="2" />
    <ellipse cx="64" cy="38" rx="14" ry="16" fill="white" stroke="#1F2937" strokeWidth="2" />
    {/* Eyelashes */}
    <path d="M 22 28 L 26 33 M 28 24 L 33 30 M 35 22 L 38 28" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    <path d="M 78 28 L 74 33 M 72 24 L 67 30 M 65 22 L 62 28" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    {/* Pupils */}
    <circle cx="40" cy="38" r="6.5" fill="#831843" />
    <circle cx="60" cy="38" r="6.5" fill="#831843" />
    <circle cx="38" cy="36" r="2.5" fill="white" />
    <circle cx="58" cy="36" r="2.5" fill="white" />
    {/* Cheerful mouth with 2 teeth */}
    <path d="M 30 60 Q 50 55 70 60 Q 73 78 50 80 Q 27 78 30 60 Z" fill="#9D174D" stroke="#BE185D" strokeWidth="2" />
    <path d="M 38 72 Q 50 64 62 72 Q 50 80 38 72 Z" fill="#FB7185" />
    <polygon points="38,58 45,59 41,66" fill="white" />
    <polygon points="55,59 62,58 59,66" fill="white" />
    {/* Rosy blush cheeks */}
    <ellipse cx="22" cy="56" rx="4" ry="3" fill="#F43F5E" opacity="0.6" />
    <ellipse cx="78" cy="56" rx="4" ry="3" fill="#F43F5E" opacity="0.6" />
  </svg>
);

// 3. Candy (La caramella a spirale iconica di Cut the Rope)
export const OmNomCandyIcon = ({ size = 100, color = '#EF4444', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Hanging Rope */}
    <path d="M 50 0 L 50 25" stroke="#92400E" strokeWidth="3" strokeDasharray="3,2" />
    {/* Candy Pin / Ring */}
    <circle cx="50" cy="27" r="4" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />
    {/* Outer Glow / Ring */}
    <circle cx="50" cy="58" r="32" fill="#FEE2E2" stroke="#DC2626" strokeWidth="3" />
    {/* Red and Yellow Striped Swirls */}
    <path d="M 50 26 A 32 32 0 0 1 82 58 L 50 58 Z" fill={color} />
    <path d="M 50 90 A 32 32 0 0 1 18 58 L 50 58 Z" fill={color} />
    <path d="M 82 58 A 32 32 0 0 1 50 90 L 50 58 Z" fill="#FACC15" />
    <path d="M 18 58 A 32 32 0 0 1 50 26 L 50 58 Z" fill="#FBBF24" />
    {/* Center swirl detail */}
    <circle cx="50" cy="58" r="14" fill="#FFFFFF" />
    <circle cx="50" cy="58" r="10" fill={color} />
    <circle cx="50" cy="58" r="5" fill="#FACC15" />
    {/* Delicious Gloss highlight */}
    <path d="M 32 40 Q 42 32 56 34" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
  </svg>
);

// 4. Spider (Il ragnetto nero dispettoso che ruba la caramella)
export const OmNomSpiderIcon = ({ size = 100, color = '#1F2937', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Spider silk thread */}
    <line x1="50" y1="0" x2="50" y2="40" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="2,2" />
    {/* 8 Legs */}
    <path d="M 36 50 Q 15 35 10 55" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M 34 56 Q 12 50 8 70" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M 36 62 Q 18 68 15 85" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M 40 68 Q 28 85 24 94" stroke="#111827" strokeWidth="3" strokeLinecap="round" fill="none" />
    
    <path d="M 64 50 Q 85 35 90 55" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M 66 56 Q 88 50 92 70" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M 64 62 Q 82 68 85 85" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M 60 68 Q 72 85 76 94" stroke="#111827" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Round Dark Spider Body */}
    <circle cx="50" cy="60" r="22" fill={color} stroke="#111827" strokeWidth="2" />
    <circle cx="50" cy="44" r="14" fill="#111827" />

    {/* Big Sneaky Eyes */}
    <circle cx="44" cy="43" r="6" fill="white" />
    <circle cx="56" cy="43" r="6" fill="white" />
    <circle cx="46" cy="44" r="2.8" fill="#DC2626" />
    <circle cx="54" cy="44" r="2.8" fill="#DC2626" />
    <circle cx="45" cy="42" r="1" fill="white" />
    <circle cx="53" cy="42" r="1" fill="white" />
    
    {/* Sneaky Grin */}
    <path d="M 42 62 Q 50 68 58 62" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* 2 fangs */}
    <polygon points="45,63 48,63 46.5,68" fill="white" />
    <polygon points="52,63 55,63 53.5,68" fill="white" />
  </svg>
);

// 5. Roto (Il Nommie elicottero volante giallo)
export const OmNomRotoIcon = ({ size = 100, color = '#FACC15', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Spinning Propeller */}
    <ellipse cx="50" cy="18" rx="35" ry="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" opacity="0.85" />
    <rect x="47" y="16" width="6" height="12" fill="#475569" rx="2" />
    <circle cx="50" cy="18" r="4" fill="#0F172A" />
    {/* Round Yellow Body */}
    <circle cx="50" cy="58" r="30" fill={color} stroke="#CA8A04" strokeWidth="2" />
    {/* Little wings/arms */}
    <ellipse cx="18" cy="62" rx="6" ry="10" fill="#EAB308" transform="rotate(-20 18 62)" />
    <ellipse cx="82" cy="62" rx="6" ry="10" fill="#EAB308" transform="rotate(20 82 62)" />
    {/* Big round goggles / eyes */}
    <circle cx="39" cy="52" r="12" fill="white" stroke="#1E293B" strokeWidth="2" />
    <circle cx="61" cy="52" r="12" fill="white" stroke="#1E293B" strokeWidth="2" />
    <circle cx="41" cy="52" r="5" fill="#0F172A" />
    <circle cx="59" cy="52" r="5" fill="#0F172A" />
    <circle cx="39" cy="50" r="2" fill="white" />
    <circle cx="57" cy="50" r="2" fill="white" />
    {/* Happy smiling beak/mouth */}
    <path d="M 40 68 Q 50 78 60 68 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
    <path d="M 45 72 Q 50 75 55 72 Z" fill="#FECDD3" />
  </svg>
);

// 6. Toss (Il Nommie a molla arancione che lancia oggetti)
export const OmNomTossIcon = ({ size = 100, color = '#F97316', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Head Spring Cup (dish on head) */}
    <path d="M 28 22 Q 50 32 72 22 Q 74 14 50 14 Q 26 14 28 22 Z" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
    <path d="M 46 25 L 46 38 L 54 38 L 54 25 Z" fill="#9A3412" />
    {/* Pear-shaped orange body */}
    <circle cx="50" cy="64" r="28" fill={color} stroke="#C2410C" strokeWidth="2" />
    {/* Big cute eyes */}
    <ellipse cx="40" cy="55" rx="10" ry="12" fill="white" stroke="#1F2937" strokeWidth="1.8" />
    <ellipse cx="60" cy="55" rx="10" ry="12" fill="white" stroke="#1F2937" strokeWidth="1.8" />
    <circle cx="42" cy="56" r="4.5" fill="#111827" />
    <circle cx="58" cy="56" r="4.5" fill="#111827" />
    <circle cx="40" cy="54" r="1.5" fill="white" />
    <circle cx="56" cy="54" r="1.5" fill="white" />
    {/* Big energetic mouth with teeth */}
    <path d="M 36 72 Q 50 84 64 72 Z" fill="#7C2D12" stroke="#9A3412" strokeWidth="1.5" />
    <polygon points="42,72 47,72 44.5,77" fill="white" />
    <polygon points="53,72 58,72 55.5,77" fill="white" />
    {/* Little bouncy feet */}
    <ellipse cx="36" cy="90" rx="9" ry="5" fill="#C2410C" />
    <ellipse cx="64" cy="90" rx="9" ry="5" fill="#C2410C" />
  </svg>
);

// 7. Boo (Il Nommie pauroso / fantasma che fa saltare Om Nom)
export const OmNomBooIcon = ({ size = 100, color = '#E0E7FF', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Spooky ghost tails */}
    <path d="M 24 72 Q 28 88 36 82 Q 44 88 50 80 Q 56 88 64 82 Q 72 88 76 72 C 86 52 82 24 50 24 C 18 24 14 52 24 72 Z" fill={color} stroke="#818CF8" strokeWidth="2.5" />
    {/* Little stubby ghost arms */}
    <path d="M 18 52 Q 6 48 12 40 Q 20 44 24 50" fill={color} stroke="#818CF8" strokeWidth="2" />
    <path d="M 82 52 Q 94 48 88 40 Q 80 44 76 50" fill={color} stroke="#818CF8" strokeWidth="2" />
    {/* Wobbly cheeky surprised eyes */}
    <ellipse cx="38" cy="46" rx="9" ry="12" fill="white" stroke="#1E1B4B" strokeWidth="2" />
    <ellipse cx="62" cy="46" rx="9" ry="12" fill="white" stroke="#1E1B4B" strokeWidth="2" />
    <circle cx="40" cy="46" r="4.5" fill="#312E81" />
    <circle cx="60" cy="46" r="4.5" fill="#312E81" />
    <circle cx="38" cy="44" r="1.8" fill="white" />
    <circle cx="58" cy="44" r="1.8" fill="white" />
    {/* "BOO!" mischievous mouth */}
    <ellipse cx="50" cy="65" rx="8" ry="10" fill="#312E81" stroke="#1E1B4B" strokeWidth="1.5" />
    <ellipse cx="50" cy="68" rx="5" ry="4" fill="#F43F5E" />
  </svg>
);

// 8. Lick (Il Nommie marrone con la lunghissima lingua)
export const OmNomLickIcon = ({ size = 100, color = '#A16207', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Little body */}
    <circle cx="35" cy="55" r="26" fill={color} stroke="#713F12" strokeWidth="2" />
    {/* Feet */}
    <ellipse cx="26" cy="80" rx="9" ry="6" fill="#713F12" />
    <ellipse cx="46" cy="80" rx="9" ry="6" fill="#713F12" />
    {/* Eyes looking sideways at the tongue bridge */}
    <ellipse cx="28" cy="44" rx="8" ry="10" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <ellipse cx="44" cy="44" rx="8" ry="10" fill="white" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="32" cy="44" r="3.5" fill="#111827" />
    <circle cx="48" cy="44" r="3.5" fill="#111827" />
    <circle cx="31" cy="42" r="1.2" fill="white" />
    <circle cx="47" cy="42" r="1.2" fill="white" />
    {/* Cute smiling mouth */}
    <path d="M 30 62 Q 38 68 46 62" stroke="#713F12" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* LONG Extensible Pink Tongue extending out as a bridge */}
    <path d="M 44 60 C 58 56 64 62 88 58 C 96 56 98 64 92 68 C 76 72 62 66 44 66 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="2" />
    <line x1="50" y1="62" x2="86" y2="62" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3,2" />
  </svg>
);

// 9. Blue (Il Nommie blu moltiplicatore)
export const OmNomBlueIcon = ({ size = 100, color = '#38BDF8', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Back smaller duplicate clone */}
    <circle cx="70" cy="46" r="18" fill="#0284C7" stroke="#0369A1" strokeWidth="1.8" />
    <circle cx="66" cy="42" r="4.5" fill="white" />
    <circle cx="74" cy="42" r="4.5" fill="white" />
    <circle cx="67" cy="42" r="2" fill="#0C4A6E" />
    <circle cx="75" cy="42" r="2" fill="#0C4A6E" />
    
    {/* Main Front Blue Nommie body */}
    <rect x="22" y="36" width="46" height="48" rx="20" fill={color} stroke="#0284C7" strokeWidth="2.5" />
    {/* Cute round feet */}
    <ellipse cx="32" cy="85" rx="8" ry="5" fill="#0284C7" />
    <ellipse cx="58" cy="85" rx="8" ry="5" fill="#0284C7" />
    {/* Big charming eyes */}
    <circle cx="36" cy="50" r="10" fill="white" stroke="#0C4A6E" strokeWidth="1.8" />
    <circle cx="54" cy="50" r="10" fill="white" stroke="#0C4A6E" strokeWidth="1.8" />
    <circle cx="38" cy="50" r="4" fill="#0C4A6E" />
    <circle cx="52" cy="50" r="4" fill="#0C4A6E" />
    <circle cx="36" cy="48" r="1.5" fill="white" />
    <circle cx="50" cy="48" r="1.5" fill="white" />
    {/* Happy curved mouth */}
    <path d="M 38 68 Q 45 74 52 68" stroke="#0369A1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

// 10. Snailbrow (La simpatica lumachina con baffi di Cut the Rope)
export const OmNomSnailIcon = ({ size = 100, color = '#FBBF24', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Swirl Shell */}
    <circle cx="60" cy="50" r="26" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
    <path d="M 60 50 m -16, 0 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0" stroke="#EA580C" strokeWidth="3" fill="none" />
    <circle cx="60" cy="50" r="6" fill="#FBBF24" />
    
    {/* Snail Body & Tail */}
    <path d="M 18 76 C 14 76 10 70 18 64 C 24 58 26 44 32 35 C 34 30 40 30 40 38 L 40 70 C 40 76 80 76 88 76 C 92 76 92 82 85 82 C 60 82 25 82 18 76 Z" fill={color} stroke="#D97706" strokeWidth="2" />
    
    {/* Eyestalks */}
    <line x1="28" y1="36" x2="22" y2="20" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <circle cx="22" cy="18" r="6" fill="white" stroke="#D97706" strokeWidth="1.5" />
    <circle cx="23" cy="18" r="2.5" fill="#1F2937" />
    
    <line x1="36" y1="36" x2="36" y2="18" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <circle cx="36" cy="16" r="6" fill="white" stroke="#D97706" strokeWidth="1.5" />
    <circle cx="36" cy="16" r="2.5" fill="#1F2937" />

    {/* Classic Mustache */}
    <path d="M 22 52 Q 28 46 34 50 Q 28 54 22 52 Z" fill="#78350F" />
    <path d="M 46 52 Q 40 46 34 50 Q 40 54 46 52 Z" fill="#78350F" />
  </svg>
);

// 11. Nibble Nom (Il piccolo e tenero cucciolo/figlio di Om Nom)
export const NibbleNomIcon = ({ size = 100, color = '#4ADE80', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Tiny baby feet */}
    <ellipse cx="36" cy="85" rx="8" ry="6" fill="#16A34A" />
    <ellipse cx="64" cy="85" rx="8" ry="6" fill="#16A34A" />
    {/* Cute baby head stalk with tiny sprouting leaf */}
    <path d="M 50 34 Q 52 20 47 14 Q 44 10 50 9 Q 55 11 54 22 Q 53 30 50 34" fill="#16A34A" />
    <path d="M 49 10 Q 42 6 42 12 Q 46 13 49 10 Z" fill="#86EFAC" />
    <circle cx="50" cy="11" r="3.5" fill="#22C55E" />
    {/* Plump chubby baby body */}
    <path d="M 25 56 C 20 40 33 30 50 30 C 67 30 80 40 75 56 C 80 66 80 81 70 84 C 59 86 41 86 30 84 C 20 81 20 66 25 56 Z" fill={color} stroke="#15803D" strokeWidth="2.5" />
    {/* Baby white diaper / belly highlight */}
    <path d="M 32 72 Q 50 78 68 72 Q 65 83 50 84 Q 35 83 32 72 Z" fill="#DCFCE7" opacity="0.75" />
    {/* Enormous sparkling baby eyes */}
    <ellipse cx="37" cy="42" rx="13" ry="15" fill="white" stroke="#1F2937" strokeWidth="2" />
    <ellipse cx="63" cy="42" rx="13" ry="15" fill="white" stroke="#1F2937" strokeWidth="2" />
    {/* Deep dark glossy baby pupils */}
    <circle cx="40" cy="42" r="7.5" fill="#0F172A" />
    <circle cx="60" cy="42" r="7.5" fill="#0F172A" />
    {/* Big twinkling baby eye reflections */}
    <circle cx="37" cy="38" r="3" fill="white" />
    <circle cx="42" cy="45" r="1.5" fill="white" />
    <circle cx="57" cy="38" r="3" fill="white" />
    <circle cx="62" cy="45" r="1.5" fill="white" />
    {/* Rosy glowing baby cheeks */}
    <ellipse cx="25" cy="56" rx="4.5" ry="3" fill="#F472B6" opacity="0.6" />
    <ellipse cx="75" cy="56" rx="4.5" ry="3" fill="#F472B6" opacity="0.6" />
    {/* Tiny cute baby mouth with 1 tiny baby tooth */}
    <path d="M 38 62 Q 50 58 62 62 Q 64 74 50 75 Q 36 74 38 62 Z" fill="#991B1B" stroke="#15803D" strokeWidth="1.8" />
    <path d="M 43 70 Q 50 66 57 70 Q 50 75 43 70 Z" fill="#FB7185" />
    {/* Single cute baby tooth */}
    <polygon points="46,61 54,61 50,66" fill="white" stroke="#1F2937" strokeWidth="0.8" />
  </svg>
);

// 12. Ginger (Il simpatico Nommie fiammella da Cut the Rope: Magic)
export const OmNomGingerIcon = ({ size = 100, color = '#FB923C', className, style }: IconProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} fill="none">
    {/* Flickering flame top */}
    <path d="M 50 10 Q 65 24 55 36 Q 70 30 50 50 Q 30 30 45 36 Q 35 24 50 10 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5" />
    <path d="M 50 16 Q 58 26 52 34 Q 44 26 50 16 Z" fill="#FEF08A" />
    {/* Warm fire body */}
    <path d="M 26 55 C 20 40 32 32 50 32 C 68 32 80 40 74 55 C 80 66 78 80 68 84 C 58 86 42 86 32 84 C 22 80 20 66 26 55 Z" fill={color} stroke="#EA580C" strokeWidth="2.5" />
    {/* Feet */}
    <ellipse cx="36" cy="85" rx="8" ry="5" fill="#EA580C" />
    <ellipse cx="64" cy="85" rx="8" ry="5" fill="#EA580C" />
    {/* Eyes */}
    <circle cx="38" cy="46" r="10" fill="white" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="62" cy="46" r="10" fill="white" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="40" cy="46" r="4.5" fill="#9A3412" />
    <circle cx="60" cy="46" r="4.5" fill="#9A3412" />
    <circle cx="38" cy="44" r="1.5" fill="white" />
    <circle cx="58" cy="44" r="1.5" fill="white" />
    {/* Cheerful wide smile */}
    <path d="M 38 64 Q 50 74 62 64" stroke="#7C2D12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <polygon points="43,64 47,64 45,68" fill="white" />
    <polygon points="53,64 57,64 55,68" fill="white" />
  </svg>
);

export const CustomIcons: Record<string, React.FC<IconProps>> = {
  Cat: CatIcon,
  Dog: DogIcon,
  Bird: BirdIcon,
  Car: CarIcon,
  Rocket: RocketIcon,
  Star: StarIcon,
  Heart: HeartIcon,
  Apple: AppleIcon,
  Banana: BananaIcon,
  Pizza: PizzaIcon,
  Sun: SunIcon,
  Cloud: CloudIcon,
  Snail: SnailIcon,
  Rabbit: RabbitIcon,
  Turtle: TurtleIcon,
  Plane: PlaneIcon,
  Ghost: GhostIcon,
  Cherry: CherryIcon,
  Moon: MoonIcon,
  AngryRed: AngryRedIcon,
  AngryChuck: AngryChuckIcon,
  AngryBomb: AngryBombIcon,
  AngryMatilda: AngryMatildaIcon,
  AngryBlues: AngryBluesIcon,
  AngryTerence: AngryTerenceIcon,
  AngryStella: AngryStellaIcon,
  AngrySilver: AngrySilverIcon,
  AngryBubbles: AngryBubblesIcon,
  AngryKingPig: AngryKingPigIcon,
  AngryPig: AngryPigIcon,
  AngryHelmetPig: AngryHelmetPigIcon,
  OmNom: OmNomIcon,
  OmNelle: OmNelleIcon,
  NibbleNom: NibbleNomIcon,
  OmNomCandy: OmNomCandyIcon,
  OmNomSpider: OmNomSpiderIcon,
  OmNomRoto: OmNomRotoIcon,
  OmNomToss: OmNomTossIcon,
  OmNomBoo: OmNomBooIcon,
  OmNomLick: OmNomLickIcon,
  OmNomBlue: OmNomBlueIcon,
  OmNomSnail: OmNomSnailIcon,
  OmNomGinger: OmNomGingerIcon,
};
