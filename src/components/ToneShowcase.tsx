import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './UI';
import { TONE_PROFILES } from '../constants';
import { MessageSquare } from 'lucide-react';

export const ToneShowcase = () => {
  const [activeTone, setActiveTone] = useState(TONE_PROFILES[0].id);

  return (
    <section className="py-24 bg-brand-cream dark:bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="LockMe adapts to your motivation style.">
          Choose How We Talk to You
        </SectionTitle>

        <div className="flex flex-col lg:flex-row gap-16 items-center justify-center max-w-6xl mx-auto mt-16">
          {/* Controls */}
          <div className="flex flex-col gap-4 w-full lg:w-[400px]">
            {TONE_PROFILES.map((tone) => {
              const isActive = activeTone === tone.id;
              return (
                <button
                  key={tone.id}
                  onClick={() => setActiveTone(tone.id)}
                  className={`group relative w-full text-left px-8 py-6 rounded-2xl transition-all duration-300 border-[2.5px] outline-none
                    ${isActive 
                      ? 'bg-[#FAF5EB] border-[#D18F61] dark:bg-white/10 dark:border-brand-terracotta shadow-sm' 
                      : 'bg-white border-transparent hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10'
                    }
                  `}
                >
                  <div className="flex items-center justify-between relative z-10">
                     <span className={`text-lg font-bold ${isActive ? 'text-brand-darkText dark:text-white' : 'text-brand-darkText/80 dark:text-white/80'}`}>
                       {tone.name}
                     </span>
                     
                     <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                        ${isActive ? 'bg-[#D18F61] scale-100' : 'bg-transparent scale-0'}
                     `} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <div className="w-full lg:flex-1 relative h-[300px] flex items-center justify-center">
             <AnimatePresence mode="wait">
               {TONE_PROFILES.map((tone) => (
                 tone.id === activeTone && (
                   <motion.div
                      key={tone.id}
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`absolute w-full max-w-lg p-10 rounded-3xl shadow-2xl ${tone.color} flex flex-col items-center text-center`}
                   >
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
                        <MessageSquare size={28} fill="currentColor" className="text-white opacity-90" />
                      </div>
                      <p className="text-3xl font-serif italic leading-relaxed">
                        "{tone.preview}"
                      </p>
                   </motion.div>
                 )
               ))}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
