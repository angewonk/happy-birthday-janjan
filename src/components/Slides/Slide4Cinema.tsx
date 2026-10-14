import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Flame,
  Wind,
  RotateCcw,
  Volume2,
  VolumeX,
  Film,
  PartyPopper,
  Heart,
} from 'lucide-react';
import { musicBox } from '../../utils/audio';
import { TimerState, SkyLantern } from '../../types/birthday';
import cinematicSkyImg from '../../assets/images/birthday_cinematic_sky_1791988836870.jpg';
import birthdayCakeImg from '../../assets/images/cinnamoroll_birthday_cake_1791988836786.jpg';

interface Slide4Props {
  timer: TimerState;
  onRestart: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Slide4Cinema: React.FC<Slide4Props> = ({
  timer,
  onRestart,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const [candleLit, setCandleLit] = useState<boolean>(true);
  const ambientLanterns: SkyLantern[] = [
    { id: '1', text: 'Peace', sender: 'Stars', x: 18, speed: 18, scale: 0.9 },
    { id: '2', text: 'Joy', sender: 'Universe', x: 42, speed: 22, scale: 0.8 },
    { id: '3', text: 'Warmth', sender: 'Sky', x: 74, speed: 20, scale: 0.85 },
    { id: '4', text: 'Memories', sender: 'Love', x: 88, speed: 25, scale: 0.75 },
  ];

  // Trigger celebratory confetti explosion on entering cinema
  useEffect(() => {
    const colors = ['#93C5FD', '#BFDBFE', '#E0F2FE', '#FBCFE8', '#FEF08A', '#FFFFFF'];
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors,
      ticks: 250,
      gravity: 0.8,
    });
  }, []);

  const handleBlowCandle = () => {
    if (!candleLit) return;
    setCandleLit(false);
    musicBox.playCandleBlowChime();

    // Celebratory double confetti blast
    const colors = ['#38BDF8', '#60A5FA', '#93C5FD', '#F472B6', '#FBBF24', '#FFFFFF'];
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.55 },
      colors,
      ticks: 300,
    });

    window.setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      });
    }, 250);
  };

  const handleRelightCandle = () => {
    setCandleLit(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-950 p-6 sm:p-10 text-white min-h-[640px] flex flex-col justify-between"
    >
      {/* Background Anime Starry Sky Layer - Guaranteed visible at z-0 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={cinematicSkyImg}
          alt="Cinematic starry sky with floating lanterns"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-[0.75] contrast-[1.15]"
        />
        {/* Cinematic vignette scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/80" />
      </div>

      {/* Floating Sky Lanterns Ambient Animation Layer (z-1) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        {ambientLanterns.map((lantern) => (
          <motion.div
            key={lantern.id}
            initial={{ y: 550, opacity: 0.2, scale: lantern.scale }}
            animate={{ y: -150, opacity: [0.2, 0.9, 0.8, 0], scale: lantern.scale * 0.7 }}
            transition={{
              duration: lantern.speed,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ left: `${lantern.x}%` }}
            className="absolute bottom-0 flex flex-col items-center"
          >
            <div className="w-9 h-12 bg-gradient-to-b from-amber-200 via-orange-300 to-amber-500 rounded-lg shadow-[0_0_20px_rgba(251,191,36,0.9)] opacity-90 border border-amber-100/60 flex items-center justify-center">
              <span className="text-[8px] font-bold text-amber-950 uppercase tracking-tighter">
                Wish
              </span>
            </div>
            <div className="w-1.5 h-3 bg-amber-400 blur-xs rounded-full mt-0.5 animate-pulse" />
          </motion.div>
        ))}
      </div>

      {/* Cinematic Top Banner */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 w-full mb-6 text-white border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-sky-300">
            Absolute Cinema Experience
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-xs text-slate-300">Grand Finale for Janjan</span>
        </div>

        {/* Music Box Toggle */}
        <button
          onClick={onToggleMusic}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-medium border border-white/20 transition-all cursor-pointer"
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
              <span>Music Box Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Play Music Box</span>
            </>
          )}
        </button>
      </div>

      {/* Main Cinema Center Stage */}
      <div className="relative z-10 w-full my-auto py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Cake & Candle */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square bg-white/10 backdrop-blur-md p-3.5 rounded-3xl border border-white/20 shadow-2xl group">
              <img
                src={birthdayCakeImg}
                alt="Pastel blue Cinnamoroll birthday cake"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl shadow-inner"
              />

              {/* Realistic Candle Flame Overlay */}
              <div
                onClick={candleLit ? handleBlowCandle : handleRelightCandle}
                className="absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-3 select-none"
                title={candleLit ? 'Click to blow out candle' : 'Click to relight'}
              >
                <AnimatePresence>
                  {candleLit ? (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.15, 1, 1.08, 1] }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative flex flex-col items-center"
                    >
                      <div className="w-8 h-12 bg-amber-300/80 rounded-full blur-md absolute -top-2" />
                      <Flame className="w-9 h-9 text-amber-300 fill-amber-200 drop-shadow-[0_0_12px_#F59E0B] animate-pulse" />
                      <span className="text-[10px] font-bold text-amber-200 bg-black/75 px-2 py-0.5 rounded-full mt-1 whitespace-nowrap shadow-xs border border-amber-300/30">
                        Tap flame to blow
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="smoke"
                      initial={{ opacity: 0.8, y: 0 }}
                      animate={{ opacity: 0, y: -25, scale: 1.5 }}
                      transition={{ duration: 1.5 }}
                      className="text-center"
                    >
                      <Wind className="w-6 h-6 text-slate-300/80 mx-auto" />
                      <span className="text-[10px] font-medium text-slate-300 bg-black/75 px-2 py-0.5 rounded-full mt-1 whitespace-nowrap border border-white/20">
                        Wish Made! Tap to relight
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-slate-950/80 backdrop-blur-md border border-white/15 rounded-xl py-2 px-3 text-white text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sky-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Oct 18, 2007
                </span>
                <span className="text-slate-300 font-mono">Turning {timer.age}</span>
              </div>
            </div>

            {/* Candle Action Button */}
            <div className="mt-4 flex items-center gap-3">
              {candleLit ? (
                <button
                  onClick={handleBlowCandle}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
                >
                  <Wind className="w-4 h-4" />
                  <span>Blow Candle & Make a Wish</span>
                </button>
              ) : (
                <button
                  onClick={handleRelightCandle}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium text-xs border border-white/25 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relight Candle</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Title and Birthday Certificate */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-white">
            
            {/* Header Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-white mb-2">
                May your universe shine, <span className="text-sky-300">Janjan</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Wishing you a year filled with warmth, genuine laughter, peaceful days, and dreams that quietly turn into reality.
              </p>
            </div>

            {/* Janjan's Commemorative Keepsake Certificate */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <PartyPopper className="w-4 h-4 text-sky-300" />
                  <span className="font-mono text-xs uppercase tracking-wider text-sky-200 font-bold">
                    Official Birthday Certificate
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 font-medium">OCT 18 · 2007</span>
              </div>

              <div className="space-y-2 text-left mb-4">
                <div className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
                  Janjan
                </div>
                <div className="text-xs sm:text-sm text-sky-200 font-medium">
                  {timer.age} Years of Bringing Sunshine to Others
                </div>
                <p className="text-sm text-slate-200 italic pt-1 leading-relaxed">
                  "Thank you for coming into my life. Here is to making many more unforgettable memories."
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/15 text-xs text-sky-300/90 font-medium">
                <Heart className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
                <span>Treasured & Celebrated Always</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Controls / Replay */}
      <div className="relative z-10 flex items-center justify-center gap-4 pt-4 mt-2 border-t border-white/10 max-w-md mx-auto w-full">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium text-xs border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay from Beginning</span>
        </button>
      </div>
    </motion.div>
  );
};
