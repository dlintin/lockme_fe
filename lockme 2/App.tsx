import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { Features } from './components/Features';
import { ToneShowcase } from './components/ToneShowcase';
import { StatsShowcase } from './components/StatsShowcase';
import { Footer } from './components/Footer';
import { Button } from './components/UI';
import { TESTIMONIALS, NAV_LINKS } from './constants';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Star, Download, Menu, X, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-terracotta selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-terracotta origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-brand-terracotta flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
             </div>
             <span className="font-display font-bold text-xl text-brand-darkText dark:text-white">LockMe</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-brand-subtle dark:text-gray-300 hover:text-brand-terracotta transition-colors">
                {link.label}
              </a>
            ))}
            <Button className="!px-6 !py-2 !text-sm">Download</Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-brand-darkText dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-brand-dark border-b border-gray-100 dark:border-white/5 absolute w-full p-6 flex flex-col gap-4">
             {NAV_LINKS.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-lg font-medium text-brand-darkText dark:text-white py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full justify-center">Download App</Button>
          </div>
        )}
      </nav>

      <main>
        <Hero />
        <ProblemSolution />
        
        {/* How it Works */}
        <section id="how-it-works" className="py-24 bg-brand-cream dark:bg-brand-dark">
           <div className="container mx-auto px-6 mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-brand-darkText dark:text-brand-cream">
                Three Steps to Unstoppable Focus
              </h2>
              <p className="text-xl text-brand-subtle dark:text-gray-400">
                Simple, elegant, and ridiculously effective
              </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 container mx-auto px-6 max-w-7xl">
              {[
                { 
                  step: 'Step 1', 
                  title: 'Select Apps to Block', 
                  desc: 'Choose which apps distract you most',
                  icon: Shield
                },
                { 
                  step: 'Step 2', 
                  title: 'Set Your Focus Schedule', 
                  desc: 'Define when you want to focus',
                  icon: Clock
                },
                { 
                  step: 'Step 3', 
                  title: 'Complete Tasks to Unlock', 
                  desc: 'Finish your work, earn your time',
                  icon: CheckCircle
                },
              ].map((item, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.2 }}
                   className="p-10 rounded-[32px] bg-[#F3EFE7] dark:bg-white/5 relative overflow-hidden flex flex-col items-start text-left h-full hover:shadow-xl hover:shadow-brand-terracotta/5 transition-all duration-300"
                >
                   {/* Icon */}
                   <div className="w-16 h-16 rounded-full bg-[#E8DCCF] dark:bg-brand-terracotta/20 flex items-center justify-center mb-8 text-brand-terracotta">
                     <item.icon size={32} strokeWidth={1.5} />
                   </div>

                   {/* Step Badge */}
                   <div className="px-5 py-2 rounded-full bg-[#E8DCCF] dark:bg-brand-terracotta/10 text-brand-terracotta text-sm font-bold mb-8">
                     {item.step}
                   </div>

                   <h3 className="text-2xl font-bold mb-4 text-brand-darkText dark:text-white leading-tight">
                     {item.title}
                   </h3>
                   <p className="text-brand-subtle dark:text-gray-400 text-lg leading-relaxed">
                     {item.desc}
                   </p>
                </motion.div>
              ))}
           </div>
        </section>

        <Features />
        
        <ToneShowcase />
        
        <StatsShowcase />

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-brand-cream dark:bg-brand-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-darkText dark:text-brand-cream mb-4">
                 Loved by Focused Humans
               </h2>
               <p className="text-xl text-brand-subtle dark:text-gray-400">
                 See what users are saying
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#F5EDE0] dark:bg-white/5 p-10 rounded-3xl"
                >
                   <div className="flex gap-1 text-brand-terracotta mb-6">
                     {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                   </div>
                   <p className="text-lg italic leading-relaxed mb-8 font-medium text-brand-darkText dark:text-gray-200">
                     "{t.content}"
                   </p>
                   <div>
                      <div className="font-bold text-base text-brand-darkText dark:text-white">{t.name}</div>
                      <div className="text-sm text-brand-subtle dark:text-gray-500">{t.role}</div>
                   </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-brand-cream dark:bg-brand-dark relative overflow-hidden">
           <div className="container mx-auto px-6 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-brand-darkText dark:text-white tracking-tight">
                  Ready to Take Back Control?
                </h2>
                <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-brand-subtle dark:text-gray-400 leading-relaxed">
                  Join thousands of focused humans who are winning their attention back.
                </p>
                <Button className="!px-10 !py-5 !text-lg mx-auto bg-brand-terracotta hover:bg-opacity-90 shadow-none">
                  Download on App Store <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}