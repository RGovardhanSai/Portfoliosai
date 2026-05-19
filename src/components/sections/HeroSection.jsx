import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ChevronDown } from 'lucide-react';
import InteractiveCanvas from '../InteractiveCanvas';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Interactive 3D Background */}
      <InteractiveCanvas />

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
          <div className="text-2xl md:text-4xl font-semibold text-slate-600 dark:text-slate-300 mb-8 h-12">
            <TypeAnimation
              sequence={[
                'Data Science Specialist',
                2000,
                'Data Analyst & Engineer',
                2000,
                'Python & SQL Developer',
                2000,
                'Full Stack Tech Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10">
            Detail-oriented data enthusiast skilled in analytics, machine learning, and full-stack integration. 
            Committed to transforming complex datasets into meaningful business insights.
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
