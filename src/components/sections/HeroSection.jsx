import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  // Framer Motion Variants for Staggered Reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Gentle fade for the greeting */}
          <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-2xl text-primary-500 font-semibold mb-4 tracking-wide uppercase text-sm"
          >
            Hello, I'm
          </motion.h2>
          
          {/* Dramatic masked reveal for the name */}
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white"
            >
              Ravavarapu Govardhan Sai
            </motion.h1>
          </div>

          {/* Marquee with spring entrance */}
          <motion.div variants={itemVariants} className="overflow-hidden w-full max-w-2xl mx-auto mb-8 relative py-2">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 dark:from-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 dark:from-transparent to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-x-4 whitespace-nowrap animate-marquee">
              <span className="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300">
                Azure Data Engineer <span className="text-primary-500 mx-2">|</span> Data Analyst <span className="text-primary-500 mx-2">|</span> Frontend Developer <span className="text-primary-500 ml-2">|</span>
              </span>
              <span className="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300" aria-hidden="true">
                Azure Data Engineer <span className="text-primary-500 mx-2">|</span> Data Analyst <span className="text-primary-500 mx-2">|</span> Frontend Developer <span className="text-primary-500 ml-2">|</span>
              </span>
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed"
          >
            Detail-oriented Data Enthusiast skilled in analytics, machine learning, and frontend development. 
            Passionate about transforming complex data into meaningful insights and real-world solutions.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="px-8 py-3 rounded-full bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30 w-full sm:w-auto"
            >
              View My Projects
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/GovardhanSaiResume.pdf" 
              download 
              className="px-8 py-3 rounded-full bg-white dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Download className="w-5 h-5" /> Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, type: "spring" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a href="#about" className="animate-bounce flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
            <ChevronDown className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
