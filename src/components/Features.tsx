import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Card } from './UI';
import { FEATURES } from '../constants';

export const Features = () => {
  return (
    <section id="features" className="py-32 container mx-auto px-6">
      <SectionTitle subtitle="Everything you need to reclaim your attention span.">
        Powerful Tools for Focused Humans
      </SectionTitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, idx) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-brand-cream dark:bg-brand-cream/10 text-brand-terracotta flex items-center justify-center mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-darkText dark:text-brand-cream">{feature.title}</h3>
              <p className="text-brand-subtle dark:text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
