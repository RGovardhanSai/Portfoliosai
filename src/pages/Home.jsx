import SEO from '../components/SEO';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import EducationSection from '../components/sections/EducationSection';
import ContactSection from '../components/sections/ContactSection';

const Home = () => {
  return (
    <>
      <SEO 
        title="Ravavarapu Govardhan Sai Portfolio" 
        description="Explore Ravavarapu Govardhan Sai's professional portfolio highlighting projects in facial gesture mouse control, sales analysis, and transaction fraud detection."
        name=""
      />
      <HeroSection />
      
      {/* 
        In Light Mode, we use a solid background here so the 3D animation is ONLY visible 
        in the HeroSection. In Dark Mode, it's transparent so the fluid particles show everywhere.
      */}
      <div className="bg-slate-50 dark:bg-transparent relative z-10">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
