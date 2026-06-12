import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { GraduationCap, BookOpen, School } from 'lucide-react';

const educationData = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science & Engineering (Data Science)',
    institution: 'Vidya Jyothi Institute of Technology (VJIT)',
    period: '2022 - 2025',
    metricType: 'CGPA',
    metricValue: '8.77 / 10',
    icon: <GraduationCap className="w-6 h-6 text-primary-500" />,
    courses: ['Predictive Modeling', 'Machine Learning', 'Big Data Analytics', 'Database Management System', 'Probability & Statistics'],
  },
  {
    id: 2,
    degree: 'Diploma in Electrical & Electronics Engineering (EEE)',
    institution: 'T.R.R. College of Technology',
    period: '2019 - 2022',
    metricType: 'CGPA',
    metricValue: '8.94 / 10',
    icon: <BookOpen className="w-6 h-6 text-primary-500" />,
    courses: ['Applied Engineering Mathematics', 'Network Theory', 'Control Systems', 'Microprocessors & Microcontrollers'],
  },
  {
    id: 3,
    degree: 'Secondary School Certificate (SSC)',
    institution: "Dr. K.K.R.'s Gowtham School",
    period: '2018 - 2019',
    metricType: 'GPA',
    metricValue: '9.0 / 10',
    icon: <School className="w-6 h-6 text-primary-500" />,
    courses: ['General Mathematics', 'Physical Sciences', 'Information Technology Foundations'],
  }
];

const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 text-glow">Academic Background</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A solid academic foundation in data sciences and electrical engineering, with outstanding scores throughout my education.
          </p>
        </motion.div>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {educationData.map((edu, index) => (
            <Tilt key={edu.id} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-premium rounded-3xl p-8 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 h-full transform-style-3d"
              >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-primary-50 dark:bg-primary-950/20 rounded-2xl">
                    {edu.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">{edu.metricType}</span>
                    <span className="text-2xl font-bold text-primary-500">{edu.metricValue}</span>
                  </div>
                </div>

                <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full mb-4">
                  {edu.period}
                </span>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 leading-snug">{edu.degree}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">{edu.institution}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Key Focus Courses</h4>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course) => (
                    <span key={course} className="px-3 py-1 bg-white/10 dark:bg-slate-900/30 border border-white/10 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 text-xs rounded-full font-medium">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
