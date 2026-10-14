import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Calendar, Heart, Clock } from 'lucide-react';
import { TimerState } from '../../types/birthday';
import { CinnamorollMascot } from '../CinnamorollMascot';
import { musicBox } from '../../utils/audio';
import cinnamorollSkyImg from '../../assets/images/cinnamoroll_sky_clouds_1791988836261.jpg';

interface Slide1Props {
  timer: TimerState;
  onNext: () => void;
}

export const Slide1Welcome: React.FC<Slide1Props> = ({ timer, onNext }) => {
  const handleOpenLetter = () => {
    if (!musicBox.getIsPlaying()) {
      musicBox.start();
    }
    onNext();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-8 text-center"
    >
      {/* Editorial Header / Birth Milestone */}
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-600 mb-3 bg-white/80 backdrop-blur-sm border border-sky-100 px-3 py-1 rounded-full shadow-xs">
        <Calendar className="w-3.5 h-3.5 text-sky-500" />
        <span>October 18, 2007</span>
        <span aria-hidden="true" className="text-sky-300">·</span>
        <span>A Special Soul Was Born</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 tracking-tight mb-3 font-['Outfit',sans-serif] text-balance">
        Happy Birthday, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Janjan</span>
      </h1>

      <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-6 font-normal leading-relaxed text-balance">
        Welcome to your little corner of the sky. Soft clouds, starry skies, and a heartfelt message crafted just for you.
      </p>

      {/* Cinnamoroll Cloud Artwork Card */}
      <div className="relative w-full max-w-md mx-auto mb-8 bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-sm border border-sky-100/80 group">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-sky-50">
          <img
            src={cinnamorollSkyImg}
            alt="Cinnamoroll sleeping gently on clouds"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
            <span className="flex items-center gap-1.5 drop-shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
              Forever Protected by Clouds
            </span>
            <span className="drop-shadow-sm">Est. 2007</span>
          </div>
        </div>

        {/* Mascot Accent */}
        <div className="absolute -top-7 -right-6 hidden sm:block">
          <CinnamorollMascot size="sm" mood={timer.isBirthdayToday ? 'celebrating' : 'happy'} />
        </div>
      </div>

      {/* Perpetual Timer Section */}
      <div className="w-full max-w-2xl bg-white/85 backdrop-blur-md border border-sky-100 rounded-3xl p-6 sm:p-7 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-sky-50">
          <div className="flex items-center gap-2 text-left">
            <Clock className="w-4 h-4 text-sky-500" />
            <span className="text-sm font-semibold text-slate-700">
              {timer.isBirthdayToday
                ? "It's Janjan's Birthday Today!"
                : timer.mode === 'countdown'
                ? `Countdown to Janjan's ${timer.age}th Birthday`
                : `Janjan's ${timer.age}th Year Celebration Clock`}
            </span>
          </div>
          <span className="text-xs text-sky-600 font-medium">
            {timer.formattedTargetDate}
          </span>
        </div>

        {/* Tabular Countdown Digits */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4">
          {[
            { label: 'Days', value: timer.days },
            { label: 'Hours', value: timer.hours },
            { label: 'Minutes', value: timer.minutes },
            { label: 'Seconds', value: timer.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-sky-50/70 border border-sky-100/80 rounded-2xl py-3 px-2 flex flex-col items-center justify-center transition-transform hover:-translate-y-0.5"
            >
              <span className="font-mono text-2xl sm:text-3xl font-bold text-sky-700 tabular-nums">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Secondary perpetual stat */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>
            {timer.totalDaysLived.toLocaleString()} days of Janjan sharing kindness with the world
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={handleOpenLetter}
        className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white font-medium text-base bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-200 cursor-pointer active:scale-98"
      >
        <span>Open Birthday Letter</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};
