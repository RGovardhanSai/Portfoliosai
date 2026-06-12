import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate asset loading time (2.5 seconds)
    const duration = 2500; 
    const intervalTime = 25; 
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait slightly at 100% before triggering the exit animation
          setTimeout(() => onComplete(), 400);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.6 } }} 
      // Made background translucent so the 3D animation (Neural Network) acts as the loading screen background!
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 dark:bg-[#020617]/80 backdrop-blur-sm text-slate-900 overflow-hidden"
    >
      {/* Sunny, Warm Radial Glows in the background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-300/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-400/15 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6 text-center w-full max-w-sm">
        
        {/* Cute 3D Bot with Speech Bubble */}
        <div className="relative flex flex-col items-center w-full">
          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute -top-12 z-20 bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-xl font-medium text-lg whitespace-nowrap"
          >
            Hi, Welcome
            {/* Speech Bubble Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[12px] border-t-blue-500 border-r-[10px] border-r-transparent"></div>
          </motion.div>

          {/* Bot Image */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [0, -15, 0], opacity: 1 }}
            transition={{ 
              opacity: { duration: 0.8 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-[40vmin] h-[40vmin] max-w-[320px] max-h-[320px] min-w-[160px] min-h-[160px] mt-4 bg-white rounded-full overflow-hidden shadow-[0_20px_50px_rgba(59,130,246,0.2)] border-4 border-white flex items-center justify-center"
          >
            <img 
              src="/assets/cute_3d_bot.png" 
              alt="Friendly Bot" 
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
        </div>

        <div className="mt-2">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-white mb-2">Loading</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">Initializing Assets...</p>
        </div>

        {/* Vibrant Progress Bar */}
        <div className="w-full mt-4">
          <div className="w-full h-3 bg-white/50 dark:bg-slate-800/50 rounded-full overflow-hidden mb-3 relative shadow-inner border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider font-mono">
            <span>{Math.round(progress)}%</span>
            <span>{progress >= 100 ? "READY" : "LOADING SPEED"}</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Preloader;
