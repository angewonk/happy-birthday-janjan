import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, ArrowLeft, Stars, Smile, Sparkles, Compass } from 'lucide-react';

interface Slide2Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Slide2Memories: React.FC<Slide2Props> = ({ onNext, onPrev }) => {
  const [activeMemory, setActiveMemory] = useState<number | null>(0);

  const memories = [
    {
      id: 1,
      tag: 'A Gentle Beginning',
      title: 'The day you arrived',
      icon: Smile,
      content:
        'Life has a subtle way of placing the right people on our path at just the right time. When you came into my life, everything felt just a little softer, kinder, and full of genuine warmth.',
      quote: '“Some people make the world better simply by existing in it.”',
    },
    {
      id: 2,
      tag: 'Everyday Sunshine',
      title: 'The quiet laughs and shared smiles',
      icon: Stars,
      content:
        'It is never just the big milestones; it is the small, unscripted moments—the inside jokes, the stories, the comfort of knowing someone understands you without needing many words.',
      quote: '“Every laugh shared with you is a memory I keep safe.”',
    },
    {
      id: 3,
      tag: 'Looking Forward',
      title: 'More memories waiting ahead',
      icon: Compass,
      content:
        'I hope we have so many more good memories to come. More conversations that make time fly, more goals achieved, and more quiet victories celebrated side by side.',
      quote: '“To all the chapters we have not written yet.”',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      {/* Top Tagline */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full mb-3">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300" />
          <span>From the Heart</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-3 font-['Outfit',sans-serif] text-balance">
          Thank you for coming into my life
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          I hope we have so many more good memories to come. Thank you for being yourself, through every season.
        </p>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {memories.map((mem, index) => {
          const Icon = mem.icon;
          const isSelected = activeMemory === index;

          return (
            <motion.div
              key={mem.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveMemory(index)}
              className={`p-6 rounded-3xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-white shadow-md border-sky-300 ring-2 ring-sky-200/50'
                  : 'bg-white/80 hover:bg-white border-sky-100/80 shadow-xs'
              }`}
            >
              {/* Subtle top ribbon */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">
                  {mem.tag}
                </span>
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-sky-100 text-sky-600' : 'bg-slate-50 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2 font-['Outfit',sans-serif]">
                {mem.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {mem.content}
              </p>

              <p className="text-xs italic text-sky-700/80 font-medium pt-3 border-t border-sky-50">
                {mem.quote}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Quote Card */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-100/90 rounded-3xl p-6 sm:p-7 shadow-xs mb-8 text-center relative overflow-hidden">
        <Sparkles className="w-5 h-5 text-sky-400 mx-auto mb-2 opacity-80" />
        <p className="text-slate-700 text-base sm:text-lg italic font-medium max-w-xl mx-auto leading-relaxed">
          "Having a soul like yours around makes this world feel a lot more gentle. Here's to every laugh we've shared, and every great memory waiting ahead."
        </p>
      </div>

      {/* Bottom Nav Buttons */}
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
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-white font-medium text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <span>A Special Birthday Message</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};
