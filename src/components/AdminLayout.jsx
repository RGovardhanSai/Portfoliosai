import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, Mail, LogOut, Home } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/admin/projects" className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500 rounded-lg transition-colors">
            <FolderKanban className="w-5 h-5" /> Projects
          </Link>
          <Link to="/admin/messages" className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500 rounded-lg transition-colors">
            <Mail className="w-5 h-5" /> Messages
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <Home className="w-5 h-5" /> Back to Site
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
