import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './UI';
import { PhoneMockup } from './PhoneMockup';
import { Download, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-terracotta/10 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen dark:opacity-20" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-coral/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen dark:opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-card dark:bg-white/10 border border-brand-dark/5 dark:border-white/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-terracotta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-terracotta"></span>
              </span>
              <span className="text-sm font-medium tracking-wide uppercase text-brand-subtle dark:text-brand-cream/80">iOS 17+ Ready</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6 text-brand-darkText dark:text-brand-cream">
              Focus First.<br />
              <span className="text-brand-terracotta">Scroll Later.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-subtle dark:text-gray-300 mb-10 leading-relaxed max-w-lg">
              The app that blocks your distractions until you earn your screen time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>
                <Download size={20} />
                Download on App Store
              </Button>
              <Button variant="outline">
                See How It Works
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm font-medium text-brand-subtle dark:text-gray-400">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className={`w-10 h-10 rounded-full border-2 border-brand-cream dark:border-brand-dark bg-gray-200 overflow-hidden`}>
                     <img src={`https://picsum.photos/100/100?random=${i}`} alt="User" className="w-full h-full object-cover" />
                   </div>
                 ))}
              </div>
              <div>
                <span className="block text-brand-darkText dark:text-brand-cream font-bold">4.9/5 Rating</span>
                <span>from focused users</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual - Floating Phone */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative animate-float">
               {/* Decorative Circle behind phone */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-brand-terracotta/20 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-brand-terracotta/10 rounded-full" />

              <PhoneMockup 
                className="mx-auto"
                screenContent={
                  <div className="h-full flex flex-col bg-brand-cream relative">
                    {/* Header */}
                    <div className="pt-14 px-6 pb-4">
                      <h3 className="text-2xl font-display font-bold text-brand-darkText">Current Task</h3>
                    </div>
                    
                    {/* Card */}
                    <div className="mx-6 p-6 rounded-3xl bg-brand-terracotta text-white shadow-xl shadow-brand-terracotta/20 mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                          <Lock size={20} />
                        </div>
                        <span className="text-sm font-medium opacity-80">High Priority</span>
                      </div>
                      <h4 className="text-xl font-bold mb-1">Deep Work Session</h4>
                      <p className="opacity-90 text-sm mb-6">Finish quarterly report</p>
                      
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-display font-bold">24:59</span>
                        <span className="text-lg mb-2 opacity-80">left</span>
                      </div>
                    </div>

                    {/* Blocked Apps List */}
                    <div className="px-6 flex-1 bg-white rounded-t-[40px] shadow-inner pt-8">
                       <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Blocked Until Complete</h5>
                       <div className="space-y-4">
                          {[
                            { name: 'Instagram', color: 'bg-pink-500' },
                            { name: 'Twitter', color: 'bg-blue-400' },
                            { name: 'TikTok', color: 'bg-black' },
                          ].map((app, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                               <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-xl ${app.color} flex items-center justify-center text-white`}>
                                     <Lock size={16} />
                                  </div>
                                  <span className="font-medium text-brand-darkText">{app.name}</span>
                               </div>
                               <div className="text-xs font-bold text-brand-terracotta px-3 py-1 bg-brand-terracotta/10 rounded-full">
                                 LOCKED
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                    
                    {/* Floating Shield Icon Overlay */}
                     <motion.div 
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        className="absolute bottom-32 right-8 bg-brand-dark text-brand-cream p-4 rounded-2xl shadow-lg z-20"
                      >
                       <ShieldCheck size={28} />
                     </motion.div>

                  </div>
                } 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
