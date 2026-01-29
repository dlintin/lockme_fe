import React from 'react';
import { motion } from 'framer-motion';

export const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string; align?: 'left' | 'center' }> = ({ children, subtitle, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight text-brand-darkText dark:text-brand-cream"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg md:text-xl text-brand-subtle dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyles = "px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95";
  
  const variants = {
    primary: "bg-brand-terracotta text-white hover:bg-opacity-90 hover:shadow-lg hover:shadow-brand-terracotta/30",
    secondary: "bg-brand-darkText text-white hover:bg-opacity-90 dark:bg-white dark:text-brand-darkText",
    outline: "border-2 border-brand-darkText/10 hover:border-brand-darkText/30 text-brand-darkText dark:border-white/20 dark:text-white dark:hover:border-white/40",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass-panel p-8 rounded-3xl ${className}`}>
    {children}
  </div>
);
