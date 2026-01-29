import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../constants';

export const StatsShowcase = () => {
  return (
    <section className="py-24 bg-brand-cream dark:bg-brand-dark border-y border-brand-dark/5 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-brand-dark/5 dark:divide-white/5">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="pt-8 md:pt-0 px-4"
            >
              <div className="text-6xl md:text-8xl font-display font-bold mb-4 text-brand-terracotta tracking-tighter">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-lg md:text-xl font-medium text-brand-darkText dark:text-brand-cream opacity-80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};