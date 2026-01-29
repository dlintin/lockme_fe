import React from 'react';
import { Twitter, Instagram, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-display font-bold mb-2">LockMe</h2>
            <p className="text-gray-400 text-sm">Focus first. Scroll later.</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-terracotta transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-brand-terracotta transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-brand-terracotta transition-colors"><Mail size={20} /></a>
          </div>
          
          <div className="text-sm text-gray-500 flex flex-col items-center md:items-end">
             <p className="mb-2">&copy; {new Date().getFullYear()} LockMe Inc.</p>
             <div className="flex gap-4">
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Terms</a>
             </div>
          </div>
        </div>
        
        <div className="mt-12 text-center pt-8 border-t border-white/5">
          <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
            Made with <Heart size={10} fill="#D18F61" className="text-brand-terracotta" /> for focused humans
          </p>
        </div>
      </div>
    </footer>
  );
};
