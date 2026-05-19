import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 rounded-2xl transform translate-x-4 translate-y-4 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Developer working" 
                className="rounded-2xl relative z-10 w-full object-cover h-[400px]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Passionate Data Science Specialist based in Hyderabad, India.
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              I am a B.Tech graduate in Computer Science Engineering (Data Science) from Vidya Jyothi Institute of Technology. I am deeply passionate about data-driven decision making, predictive analytics, and building robust digital solutions that bridge the gap between back-end data engineering and front-end user experience.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              With a solid foundation in Python, SQL, Java, and modern web technologies, I love designing smart systems—from facial gesture human-computer interfaces to retail analytics dashboards and transaction anomaly detection pipelines.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="text-primary-500 font-bold text-3xl mb-1">8.77</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium">B.Tech GPA</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="text-primary-500 font-bold text-3xl mb-1">3+</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Core Projects</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="text-primary-500 font-bold text-3xl mb-1">5+</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Industry Certs</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="text-primary-500 font-bold text-3xl mb-1">2+</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Leadership Roles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
