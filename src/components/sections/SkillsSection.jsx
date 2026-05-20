import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages & Core',
    skills: [
      { name: 'Python (Pandas, NumPy, Matplotlib)', level: 92 },
      { name: 'SQL (Structured Query Language)', level: 60 },
      { name: 'Java', level: 75 },
    ]
  },
  {
    title: 'Data & Visualization',
    skills: [
      { name: 'Power BI Dashboarding', level: 85 },
      { name: 'Excel (Data Analysis)', level: 80 },
      { name: 'OpenCV & Computer Vision', level: 82 },
      { name: 'PyAutoGUI & Mediapipe', level: 78 },
    ]
  },
  {
    title: 'Web Tech & Tools',
    skills: [
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'JavaScript (ES6+)', level: 80 },
      { name: 'Git & GitHub Version Control', level: 85 },
      { name: 'VS Code & Jupyter', level: 90 },
    ]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 text-glow">Technical Skills</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My diverse toolkit spanning Data Science libraries, analytics platforms, programming languages, and web development.
          </p>
        </motion.div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="glass-premium rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-white/10 dark:border-slate-800 pb-3 text-primary-500 text-glow">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="bg-primary-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
