import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Mouse Cursor Control Using Facial Expressions',
    description: 'Controlled the computer mouse pointer and performed click operations using real-time camera-based facial gestures and landmark tracking for hands-free interaction.',
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tech: ['Python', 'OpenCV', 'Dlib', 'PyAutoGUI', 'Mediapipe'],
    github: 'https://github.com/govardhansai3751/facial-gesture-mouse-control',
    live: '#',
  },
  {
    id: 2,
    title: 'Sales Data Analysis & Power BI Dashboard',
    description: 'Analyzed over 10,000+ sales and transaction records to identify seasonal revenue trends, top categories, and purchasing patterns. Designed an interactive executive dashboard.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tech: ['Python', 'Power BI', 'Excel', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/govardhansai3751/sales-data-analysis',
    live: '#',
  },
  {
    id: 3,
    title: 'Bank Transaction Fraud Detection',
    description: 'Developed an anomaly detection pipeline that cleaned and engineered transaction features, applying statistical methods to identify and highlight unusual fraudulent patterns.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn'],
    github: 'https://github.com/govardhansai3751/bank-fraud-detection',
    live: '#',
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Here are my core technical projects focusing on computer vision, data analysis, and anomaly detection. 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden group">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-slate-900 hover:text-primary-500 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  {project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed flex-grow line-clamp-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
