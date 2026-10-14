import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, ArrowRight, ArrowLeft, Heart, CheckCircle2, Star } from 'lucide-react';
import { WishCapsule } from '../../types/birthday';

interface Slide3Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Slide3Wishes: React.FC<Slide3Props> = ({ onNext, onPrev }) => {
  const [openedCapsuleId, setOpenedCapsuleId] = useState<string>('wish-1');

  const capsules: WishCapsule[] = [
    {
      id: 'wish-1',
      tag: 'Birthday Blessings',
      title: 'Enjoy every second of your day',
      subtitle: 'To peace, warmth, and quiet joy',
      message:
        'Today is all about you. I hope you eat your favorite food, hear songs that make you feel alive, and take a moment to breathe deeply and smile. You deserve a day that feels like a warm hug.',
    },
    {
      id: 'wish-2',
      tag: 'Inner Strength',
      title: 'A reminder of how far you’ve come',
      subtitle: 'Born in 2007, growing stronger each year',
      message:
        'You have navigated heavy days and quiet struggles with grace, even when no one was watching. Take credit for how resilient, patient, and kind you have remained. You are doing so much better than you realize.',
    },
    {
      id: 'wish-3',
      tag: 'Soft Days Ahead',
      title: 'A wish for your new year',
      subtitle: 'May this year be gentle on your heart',
      message:
        'I wish you days with fewer worries, more restful sleep, unexpected good news, and dreams that quietly turn into reality. May you always be surrounded by people who see your worth and treat you with sincerity.',
    },
    {
      id: 'wish-4',
      tag: 'Unconditional Support',
      title: 'You never have to walk alone',
      subtitle: 'A steady promise',
      message:
        'No matter how fast life moves or how loud the world gets, remember there are people in your corner who genuinely care about you. Happy birthday, Janjan. Never forget how much you matter.',
    },
  ];

  const currentCapsule = capsules.find((c) => c.id === openedCapsuleId) || capsules[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      {/* Editorial Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full mb-3">
          <Star className="w-3.5 h-3.5 text-sky-400 fill-sky-300" />
          <span>A Letter for Janjan</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-3 font-['Outfit',sans-serif] text-balance">
          Enjoy your special day to the fullest
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-normal leading-relaxed text-balance">
          Here is a collection of words written to brighten your heart. Select an envelope to read each personal note.
        </p>
      </div>

      {/* Capsule Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {capsules.map((item) => {
          const isSelected = item.id === openedCapsuleId;
          return (
            <button
              key={item.id}
              onClick={() => setOpenedCapsuleId(item.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-sky-400 shadow-md ring-2 ring-sky-200/60 scale-[1.02]'
                  : 'bg-white/70 hover:bg-white border-sky-100 text-slate-600 hover:border-sky-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-sky-600 uppercase tracking-wider">
                  {item.tag}
                </span>
                <Mail
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-sky-500 fill-sky-100' : 'text-slate-400'
                  }`}
                />
              </div>
              <span className="text-xs font-bold text-slate-800 line-clamp-2">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Capsule Display Card */}
      <div className="relative bg-white border border-sky-100/90 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 overflow-hidden">
        {/* Soft background watermark motif */}
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
          <Heart className="w-48 h-48 text-sky-500" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCapsule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
                {currentCapsule.tag}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">
                {currentCapsule.subtitle}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 font-['Outfit',sans-serif]">
              {currentCapsule.title}
            </h3>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
              {currentCapsule.message}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-sky-50 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-sky-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                Dedicated to Janjan
              </span>
              <span>October 18 · Born 2007</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 font-medium text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onNext}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-md shadow-sky-600/25 hover:shadow-lg transition-all duration-300 cursor-pointer animate-pulse hover:animate-none"
        >
          <span>what this button do?</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};
