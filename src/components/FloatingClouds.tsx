import React from 'react';

interface FloatingCloudsProps {
  isCinema?: boolean;
}

export const FloatingClouds: React.FC<FloatingCloudsProps> = ({ isCinema = false }) => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10 transition-colors duration-700">
      {/* Sky subtle gradient - transitions between soft daytime pastel and starry midnight */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isCinema
            ? 'bg-gradient-to-b from-[#080E1A] via-[#0B1626] to-[#060B14]'
            : 'bg-gradient-to-b from-[#EAF4FE] via-[#F4F9FF] to-[#E5F0FC]'
        }`}
      />

      {/* Floating Cloud 1 - Top Left */}
      <div
        className={`absolute -top-12 -left-16 w-80 h-44 rounded-full blur-2xl animate-[float_14s_ease-in-out_infinite] transition-colors duration-700 ${
          isCinema ? 'bg-sky-900/30' : 'bg-white/70'
        }`}
        style={{ animationDelay: '0s' }}
      />

      {/* Floating Cloud 2 - Top Right */}
      <div
        className={`absolute top-16 -right-20 w-96 h-52 rounded-full blur-2xl animate-[float_18s_ease-in-out_infinite] transition-colors duration-700 ${
          isCinema ? 'bg-indigo-950/40' : 'bg-white/60'
        }`}
        style={{ animationDelay: '3s' }}
      />

      {/* Floating Cloud 3 - Center Bottom */}
      <div
        className={`absolute -bottom-24 left-1/3 w-[500px] h-64 rounded-full blur-3xl animate-[float_16s_ease-in-out_infinite] transition-colors duration-700 ${
          isCinema ? 'bg-sky-950/50' : 'bg-sky-100/50'
        }`}
        style={{ animationDelay: '5s' }}
      />

      {/* Twinkling Soft Stars */}
      {[
        { top: '12%', left: '15%', size: 14, delay: '0.2s' },
        { top: '22%', left: '82%', size: 16, delay: '1.4s' },
        { top: '45%', left: '8%', size: 12, delay: '2.1s' },
        { top: '68%', left: '92%', size: 15, delay: '0.8s' },
        { top: '80%', left: '25%', size: 13, delay: '1.7s' },
        { top: '35%', left: '94%', size: 10, delay: '2.9s' },
        { top: '15%', left: '48%', size: 14, delay: '0.5s' },
      ].map((star, idx) => (
        <div
          key={idx}
          className={`absolute animate-pulse transition-colors duration-700 ${
            isCinema ? 'text-amber-200/80' : 'text-sky-300/80'
          }`}
          style={{
            top: star.top,
            left: star.left,
            animationDuration: '3.5s',
            animationDelay: star.delay,
          }}
        >
          <svg width={star.size} height={star.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
