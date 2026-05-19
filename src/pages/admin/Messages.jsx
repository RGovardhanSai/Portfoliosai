import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileDown, Trash2, MailOpen, Mail, ChevronRight, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch messages from authenticated API endpoint
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact/admin/messages', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        toast.error('Failed to fetch messages');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.token) {
      fetchMessages();
    }
  }, [user]);

  // Toggle Read/Unread status
  const handleToggleRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/admin/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const updated = await response.json();
        setMessages(messages.map((m) => (m._id === id ? updated : m)));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(updated);
        }
        toast.success(`Message marked as ${updated.isRead ? 'read' : 'unread'}`);
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      toast.error('Error updating message status');
    }
  };

  // Delete message
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this message?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/contact/admin/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        setMessages(messages.filter((m) => m._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
        toast.success('Message deleted successfully');
      } else {
        toast.error('Failed to delete message');
      }
    } catch (err) {
      toast.error('Error deleting message');
    }
  };

  // Safe file export download helper attaching Bearer JWT tokens
  const handleExport = async (format) => {
    const loadingToast = toast.loading(`Generating ${format.toUpperCase()} report...`);
    try {
      const response = await fetch(`http://localhost:5000/api/contact/admin/messages/export/${format}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `messages_report_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success(`${format.toUpperCase()} downloaded successfully!`, { id: loadingToast });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to export messages to ${format.toUpperCase()}`, { id: loadingToast });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Contact Messages</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and export all form submissions received from recruiters</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 text-sm shadow-sm"
          >
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2 text-sm shadow-md shadow-primary-500/20"
          >
            <FileDown className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Messages List Sidebar */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850/50">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Inbox
              <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full">
                {messages.length} total
              </span>
            </h3>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-slate-400">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-slate-400">No contact messages received yet.</div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-5 flex items-start gap-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-750/30 ${
                    selectedMessage && selectedMessage._id === msg._id ? 'bg-primary-50/40 dark:bg-primary-950/10 border-l-4 border-primary-500 pl-4' : 'border-l-4 border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-xl mt-1 ${msg.isRead ? 'bg-slate-100 dark:bg-slate-700 text-slate-400' : 'bg-primary-50 dark:bg-primary-950/20 text-primary-500'}`}>
                    {msg.isRead ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <h4 className={`text-sm truncate font-semibold ${msg.isRead ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {msg.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-xs truncate font-medium ${msg.isRead ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {msg.subject}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-1">
                      {msg.message}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Content Viewer Card */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col min-h-[450px]"
              >
                {/* Message Header Bar */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedMessage.subject}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-2">
                      <span className="font-semibold text-slate-600 dark:text-slate-350">{selectedMessage.name}</span>
                      <span>&lt;{selectedMessage.email}&gt;</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selectedMessage._id)}
                      title={`Mark as ${selectedMessage.isRead ? 'unread' : 'read'}`}
                      className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors ${
                        selectedMessage.isRead 
                          ? 'text-slate-400 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-slate-700/50' 
                          : 'text-primary-500 bg-primary-50 dark:bg-primary-950/20 border-primary-100 dark:border-primary-900/30'
                      }`}
                    >
                      {selectedMessage.isRead ? <Mail className="w-5 h-5" /> : <MailOpen className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      title="Delete message"
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subtitle Timestamp */}
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-850/50 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>Submitted on: {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                </div>

                {/* Message Body Content */}
                <div className="flex-1 p-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-100/50 dark:bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 min-h-[450px] flex flex-col justify-center items-center">
                <Mail className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
                <h4 className="font-bold text-slate-650 dark:text-slate-400">No message selected</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">Select a contact form submission from the inbox sidebar to view its details, manage read status, or delete.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Messages;
