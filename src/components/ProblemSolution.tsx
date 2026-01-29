import React from 'react';
import { motion } from 'framer-motion';

export const ProblemSolution = () => {
  return (
    <section className="py-24 bg-brand-cream dark:bg-brand-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-8 text-brand-darkText dark:text-brand-cream tracking-tight">
              You open Instagram for 1 minute.<br className="hidden md:block" />
              <span className="text-brand-subtle dark:text-brand-terracotta/80">45 minutes later...</span>
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-brand-subtle dark:text-gray-400 leading-relaxed">
              <p>
                We've all been there. A "quick scroll" turns into real time gone. Work stays unfinished. Goals get pushed back.
              </p>
              <p>
                LockMe fixes this by putting you in control. No willpower needed. Just smart design.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Stats Stack */}
          <div className="flex flex-col gap-6">
            <StatCard 
              value="2h 23m" 
              label="Average daily time spent on social media worldwide"
              subtext="That is 143 minutes per day, and about 35.8 percent of daily online activity"
              delay={0.1}
            />
            <StatCard 
              value="16.7 hours" 
              label="Weekly time lost to scrolling per user"
              subtext="Based on 143 minutes/day × 7 days = 1,001 minutes lost every single week."
              delay={0.2}
            />
            <StatCard 
              value="+340%" 
              label="Focus improvement with LockMe" 
              highlight
              delay={0.3}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

const StatCard = ({ value, label, highlight = false, delay = 0, subtext }: { value: string, label: string, highlight?: boolean, delay?: number, subtext?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-brand-card dark:bg-white/5 p-8 rounded-3xl"
  >
    <h3 className={`text-4xl md:text-5xl font-display font-bold mb-2 ${highlight ? 'text-brand-terracotta' : 'text-brand-subtle dark:text-brand-cream'}`}>
      {value}
    </h3>
    <p className="text-brand-subtle dark:text-gray-400 font-medium text-lg">
      {label}
    </p>
    {subtext && (
      <p className="mt-3 text-sm text-brand-subtle/70 dark:text-gray-500 leading-relaxed border-t border-brand-dark/5 dark:border-white/5 pt-3">
        {subtext}
      </p>
    )}
  </motion.div>
);
