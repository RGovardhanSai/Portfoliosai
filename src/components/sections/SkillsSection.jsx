import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { 
  BarChart3, 
  Table, 
  Database, 
  PieChart,
  Cloud,
  Network,
  Server,
  FileCode2,
  Braces, 
  Palette,
  Terminal,
  Hexagon
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Data Analytics & BI',
    skills: [
      { name: 'Python', subskills: ['Pandas', 'NumPy', 'Analysis'], level: 85, icon: Terminal },
      { name: 'SQL', subskills: ['Queries', 'Data Transformation'], level: 82, icon: Database },
      { name: 'Data Analysis', subskills: ['EDA', 'Statistical Analysis', 'Data Cleaning'], level: 80, icon: BarChart3 },
      { name: 'Business Intelligence', subskills: ['Power BI', 'Dashboards', 'Data Viz'], level: 85, icon: PieChart },
      { name: 'Spreadsheet Analytics', subskills: ['Microsoft Excel', 'Data Modeling'], level: 80, icon: Table },
    ]
  },
  {
    title: 'Azure Data Engineering',
    skills: [
      { name: 'Azure', subskills: ['Azure Fundamentals', 'Cloud Solutions'], level: 80, icon: Cloud },
      { name: 'Databricks', subskills: ['PySpark', 'Notebooks', 'Workflows'], level: 78, icon: Hexagon },
      { name: 'Data Pipelines', subskills: ['ETL Processes', 'Data Integration'], level: 82, icon: Network },
      { name: 'Data Storage', subskills: ['Data Warehousing', 'SQL Databases'], level: 75, icon: Server },
    ]
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML5', subskills: ['Semantic Markup', 'Web Standards', 'Structure'], level: 85, icon: FileCode2 },
      { name: 'CSS3', subskills: ['Flexbox/Grid', 'Responsive Design', 'Styling'], level: 80, icon: Palette },
      { name: 'JavaScript', subskills: ['ES6+', 'DOM Manipulation', 'Logic'], level: 78, icon: Braces },
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
            My diverse toolkit spanning Data Analytics & Business Intelligence, Azure Data Engineering, and Frontend Development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <Tilt key={category.title} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
                className="glass-premium rounded-2xl p-6 flex flex-col h-full transform-style-3d"
              >
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-white/10 dark:border-slate-800 pb-3 text-primary-500 text-glow">
                {category.title}
              </h3>
              
              <div className="space-y-4 flex-grow">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div 
                      key={skill.name} 
                      className="group p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/40 rounded-xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-900/60 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/5"
                    >
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
                            {Icon && <Icon className="w-4 h-4" />}
                          </div>
                          <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded text-xs">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Subskills pills */}
                      {skill.subskills && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {skill.subskills.map((sub) => (
                            <span 
                              key={sub} 
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-200/20 dark:border-slate-700/20 group-hover:bg-primary-500/10 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Progress bar */}
                      <div className="w-full bg-slate-200/50 dark:bg-slate-800/50 rounded-full h-1.5 overflow-hidden mt-3.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.1 }}
                          className="bg-gradient-to-r from-primary-500 to-blue-500 h-1.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
