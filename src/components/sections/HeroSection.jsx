import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl text-primary-500 font-semibold mb-4">Hello, I'm</h2>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Ravavarapu Govardhan Sai
          </h1>
          <div className="overflow-hidden w-full max-w-2xl mx-auto mb-8 relative py-2">
            {/* Soft fade gradients on edges for premium feel */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-x-4 whitespace-nowrap animate-marquee">
              <span className="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300">
                Data Engineer <span className="text-primary-500 mx-2">|</span> Data Enthusiast <span className="text-primary-500 mx-2">|</span> AI & ML Enthusiast <span className="text-primary-500 mx-2">|</span> Frontend Developer <span className="text-primary-500 ml-2">|</span>
              </span>
              <span className="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300" aria-hidden="true">
                Data Engineer <span className="text-primary-500 mx-2">|</span> Data Enthusiast <span className="text-primary-500 mx-2">|</span> AI & ML Enthusiast <span className="text-primary-500 mx-2">|</span> Frontend Developer <span className="text-primary-500 ml-2">|</span>
              </span>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10">
            Detail-oriented Data Enthusiast skilled in analytics, machine learning, and frontend development. 
            Passionate about transforming complex data into meaningful insights and real-world solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30">
              View My Projects
            </a>
            <a href="/GovardhanSaiResume.pdf" download className="px-8 py-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" /> Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a href="#about" className="animate-bounce flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <ChevronDown className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
