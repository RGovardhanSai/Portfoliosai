import { motion } from 'framer-motion';
import { Award, Code2, Cpu } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Project Expo Winner',
    organization: 'T.R.R. College of Technology',
    period: 'May 15th, 2022',
    icon: <Award className="w-5 h-5" />,
    description: 'Secured first place in the college annual Project Exhibition by designing and developing a real-time engineering showcase integrating IoT features.',
  },
  {
    id: 2,
    role: 'Technical Coordinator',
    organization: 'TRR College of Technology',
    period: '2021 - 2022',
    icon: <Code2 className="w-5 h-5" />,
    description: 'Coordinated inter-departmental technical symposiums, organized project exhibitions, and served as the lead facilitator for hardware coding contests.',
  },
  {
    id: 3,
    role: 'Student Coordinator',
    organization: 'Electronics & IoT Club',
    period: '2020 - 2022',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Hosted hands-on micro-controller coding workshops, mentored over 50+ junior classmates, and co-engineered multiple smart automation prototypes.',
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A history of technical leadership, project exhibition success, and student body coordination.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-stretch gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node icon */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 z-10">
                  {exp.icon}
                </div>

                {/* Left/Right spacer for layout alignment */}
                <div className="w-full md:w-1/2 hidden md:block"></div>

                {/* Info Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{exp.role}</h3>
                    <h4 className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-4">{exp.organization}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
