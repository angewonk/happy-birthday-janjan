import React from 'react';

interface MascotProps {
  mood?: 'happy' | 'celebrating' | 'sleepy' | 'curious';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CinnamorollMascot: React.FC<MascotProps> = ({
  mood = 'happy',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-24 h-20',
    md: 'w-40 h-32',
    lg: 'w-56 h-44',
    xl: 'w-72 h-56',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}>
      {/* Soft Glow Aura */}
      <div className="absolute inset-0 bg-sky-200/40 rounded-full blur-xl transform scale-90 -z-10 animate-pulse" />

      <svg
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F7FF" />
          </linearGradient>
          <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#93C5FD" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Fluffy Base Cloud */}
        <g filter="url(#softShadow)">
          <path
            d="M50 145 C35 145 25 135 28 120 C20 115 18 100 28 92 C32 80 48 78 58 84 C68 70 95 68 108 80 C120 68 150 68 162 80 C175 72 195 78 200 90 C212 95 215 112 205 122 C210 135 198 145 185 145 Z"
            fill="url(#cloudGrad)"
            stroke="#E0F2FE"
            strokeWidth="1.5"
          />
        </g>

        {/* Left Floppy Ear */}
        <path
          d="M80 82 C45 75 10 95 18 120 C24 136 60 126 84 105 Z"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Right Floppy Ear */}
        <path
          d="M160 82 C195 75 230 95 222 120 C216 136 180 126 156 105 Z"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Cinnamoroll Chubby Body */}
        <ellipse cx="120" cy="118" rx="42" ry="32" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2.5" />

        {/* Front Little Paws */}
        <ellipse cx="104" cy="122" rx="9" ry="12" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
        <ellipse cx="136" cy="122" rx="9" ry="12" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />

        {/* Head */}
        <ellipse cx="120" cy="78" rx="44" ry="34" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2.5" />

        {/* Blue Big Innocent Eyes */}
        {mood === 'sleepy' ? (
          <>
            <path d="M102 76 Q108 82 114 76" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M126 76 Q132 82 138 76" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* Left Eye */}
            <circle cx="106" cy="76" r="5" fill="#0284C7" />
            <circle cx="104.5" cy="74.5" r="1.8" fill="#FFFFFF" />

            {/* Right Eye */}
            <circle cx="134" cy="76" r="5" fill="#0284C7" />
            <circle cx="132.5" cy="74.5" r="1.8" fill="#FFFFFF" />
          </>
        )}

        {/* Cute Pink Rosy Cheeks */}
        <ellipse cx="96" cy="85" rx="7" ry="4" fill="#FDA4AF" opacity="0.65" />
        <ellipse cx="144" cy="85" rx="7" ry="4" fill="#FDA4AF" opacity="0.65" />

        {/* Tiny Mouth */}
        <path
          d="M115 84 Q120 88 125 84"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Party Hat if Celebrating */}
        {mood === 'celebrating' && (
          <g transform="translate(108, 22)">
            <polygon points="12,0 0,32 24,32" fill="#93C5FD" stroke="#60A5FA" strokeWidth="1.5" />
            <circle cx="12" cy="0" r="4" fill="#FDE047" />
            <line x1="3" y1="22" x2="21" y2="22" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="6" y1="12" x2="18" y2="12" stroke="#FEF08A" strokeWidth="2" />
          </g>
        )}

        {/* Pastel Blue Ribbon Bow */}
        <g transform="translate(112, 102)">
          <path d="M-8 -3 C-15 -10 -18 3 -8 1 Z" fill="url(#bowGrad)" stroke="#38BDF8" strokeWidth="1" />
          <path d="M24 -3 C31 -10 34 3 24 1 Z" fill="url(#bowGrad)" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="8" cy="-1" r="4.5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};
