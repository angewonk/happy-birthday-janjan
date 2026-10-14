/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { calculateBirthdayTimer } from './utils/timer';
import { musicBox } from './utils/audio';
import { TimerState } from './types/birthday';
import { FloatingClouds } from './components/FloatingClouds';
import { Slide1Welcome } from './components/Slides/Slide1Welcome';
import { Slide2Memories } from './components/Slides/Slide2Memories';
import { Slide3Wishes } from './components/Slides/Slide3Wishes';
import { Slide4Cinema } from './components/Slides/Slide4Cinema';

export default function App() {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [timer, setTimer] = useState<TimerState>(() => calculateBirthdayTimer());
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  const isCinema = activeSlide === 4;

  // Automatically start music on mount (desktop + mobile gesture fallback)
  useEffect(() => {
    const unsubscribe = musicBox.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });

    musicBox.autoStart();

    return () => {
      unsubscribe();
    };
  }, []);

  // Live timer interval: updates every second
  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimer(calculateBirthdayTimer());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const handleToggleMusic = () => {
    musicBox.toggle();
  };

  const navItems = [
    { id: 1, label: 'Welcome', shortLabel: 'Intro' },
    { id: 2, label: 'Memories', shortLabel: 'Story' },
    { id: 3, label: 'Wishes', shortLabel: 'Wish' },
    { id: 4, label: 'Cinema', shortLabel: 'Cinema' },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between relative selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden transition-colors duration-700 ${
        isCinema ? 'bg-slate-950 text-white' : 'bg-[#F0F7FF] text-slate-800'
      }`}
    >
      {/* Ambient background clouds and stars */}
      <FloatingClouds isCinema={isCinema} />

      {/* Top Bar adhering to Three-Zone Top Bar Contract */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-500 border-b ${
          isCinema
            ? 'bg-slate-950/80 border-white/10 text-white'
            : 'bg-white/80 border-sky-100/80 text-slate-800'
        }`}
      >
        <div className="max-w-6xl mx-auto px-2.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-1 sm:gap-6">
          
          {/* Zone 1: Single text element wordmark */}
          <div
            onClick={() => setActiveSlide(1)}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border group-hover:scale-105 transition-transform ${
                isCinema
                  ? 'bg-sky-950 text-sky-300 border-sky-800'
                  : 'bg-sky-100 text-sky-600 border-sky-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-sky-400 text-sky-500" />
            </div>
            <span
              className={`text-sm sm:text-lg font-bold tracking-tight font-['Outfit',sans-serif] ${
                isCinema ? 'text-white' : 'text-slate-800'
              }`}
            >
              Janjan<span className="hidden md:inline"> · Oct 18</span>
            </span>
          </div>

          {/* Zone 2: Navigation Links / Slide Selectors */}
          <nav className="flex items-center gap-0.5 sm:gap-1.5 p-0.5 sm:p-1 rounded-full bg-slate-100/80 dark:bg-white/10 border border-slate-200/50 dark:border-white/10">
            {navItems.map((item) => {
              const isActive = activeSlide === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(item.id)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-sm font-medium rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-xs font-semibold'
                      : isCinema
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-600 hover:text-sky-700 hover:bg-white/80'
                  }`}
                >
                  <span className="sm:hidden">{item.shortLabel}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action - Music Box Synth */}
          <div className="flex items-center shrink-0">
            <button
              onClick={handleToggleMusic}
              className={`inline-flex items-center justify-center gap-1.5 h-8 sm:h-auto px-2 sm:px-3.5 sm:py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isPlayingMusic
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-xs'
                  : isCinema
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Toggle Music Box Chimes"
            >
              {isPlayingMusic ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                  <span className="hidden md:inline">Melody On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden md:inline">Play Melody</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Main Slide Carousel Stage */}
      <main className="flex-1 flex flex-col justify-center py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {activeSlide === 1 && (
            <Slide1Welcome
              key="slide-1"
              timer={timer}
              onNext={() => setActiveSlide(2)}
            />
          )}

          {activeSlide === 2 && (
            <Slide2Memories
              key="slide-2"
              onNext={() => setActiveSlide(3)}
              onPrev={() => setActiveSlide(1)}
            />
          )}

          {activeSlide === 3 && (
            <Slide3Wishes
              key="slide-3"
              onNext={() => setActiveSlide(4)}
              onPrev={() => setActiveSlide(2)}
            />
          )}

          {activeSlide === 4 && (
            <Slide4Cinema
              key="slide-4"
              timer={timer}
              onRestart={() => setActiveSlide(1)}
              isPlayingMusic={isPlayingMusic}
              onToggleMusic={handleToggleMusic}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Footer */}
      <footer
        className={`py-4 border-t transition-colors duration-500 text-center text-xs ${
          isCinema
            ? 'border-white/10 bg-slate-950/70 text-slate-400'
            : 'border-sky-100/60 bg-white/40 text-slate-500'
        } backdrop-blur-xs`}
      >
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>Happy Birthday Janjan</span>
            <span aria-hidden="true">·</span>
            <span>October 18, 2007</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cinnamoroll Edition · Crafted with warmth</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
