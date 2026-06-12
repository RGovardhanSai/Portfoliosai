import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FolderKanban, Mail, Bell, Eye } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [messagesCount, setMessagesCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact/admin/messages', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessagesCount(data.length);
          setUnreadCount(data.filter((m) => !m.isRead).length);
          setRecentMessages(data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.token) {
      fetchDashboardStats();
    }
  }, [user]);

  const stats = [
    { title: 'Total Projects', value: '3', icon: FolderKanban, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Unread Messages', value: loading ? '...' : unreadCount.toString(), icon: Mail, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { title: 'Total Submissions', value: loading ? '...' : messagesCount.toString(), icon: Bell, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-fade-in"
          >
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Contact Submissions</h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-slate-650 dark:text-slate-450">Loading activity feed...</p>
          ) : recentMessages.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">No submissions received yet.</p>
          ) : (
            recentMessages.map((msg) => (
              <div
                key={msg._id}
                className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-slate-50 dark:bg-slate-750/30 border border-slate-100 dark:border-slate-700 rounded-2xl gap-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">{msg.name}</h4>
                  <p className="text-xs text-slate-550 dark:text-slate-400 truncate max-w-xl mt-0.5">
                    <span className="font-semibold text-slate-600 dark:text-slate-350">{msg.subject}:</span> {msg.message}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
