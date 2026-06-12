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
        
        {/* Bright, Cheerful Gaming / Coding Avatar Image */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(245,158,11,0.2)]"
        >
          <img 
            src="/assets/colorful_coder_loader.png" 
            alt="Vibrant Gaming and Coding Developer" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800 mb-2">Preparing Workspace</h2>
          <p className="text-sm text-slate-500 uppercase tracking-widest font-mono">Compiling Code & Assets...</p>
        </div>

        {/* Vibrant Progress Bar */}
        <div className="w-full mt-2">
          <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-3 relative shadow-inner border border-slate-100">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-xs font-bold text-orange-600 tracking-wider">
            <span>{Math.round(progress)}%</span>
            <span>{progress >= 100 ? "READY" : "LOADING"}</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Preloader;
