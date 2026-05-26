const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Ravavarapu Govardhan Sai. Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
