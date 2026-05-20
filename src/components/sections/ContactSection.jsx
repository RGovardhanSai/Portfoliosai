import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fields Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

      if (serviceId === 'your_service_id' || templateId === 'your_template_id' || publicKey === 'your_public_key') {
        toast.error('EmailJS is not configured. Please add your credentials in the frontend .env file.');
        setLoading(false);
        return;
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'saig3751@gmail.com'
        },
        publicKey
      );

      if (result.status === 200) {
        toast.success('Your message has been sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to submit. Please verify your EmailJS configuration.');
      }
    } catch (error) {
      console.error('EmailJS Submission Error:', error);
      toast.error('Connection failed. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary-500" />,
      title: 'Email Me',
      value: 'saig3751@gmail.com',
      link: 'mailto:saig3751@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6 text-primary-500" />,
      title: 'Call Me',
      value: '+91 8639322292',
      link: 'tel:+918639322292',
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-500" />,
      title: 'Location',
      value: 'Hyderabad, Telangana, India',
      link: 'https://maps.google.com/?q=Hyderabad,Telangana,India',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 text-glow">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have an open role, project discussion, or simply want to connect? Reach out using the form or social links.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Info Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-glow">Contact Information</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Feel free to contact me directly through email or phone. I'm always open to discussing new data science roles, full-stack opportunities, or collaborative projects.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass-premium rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-3 bg-primary-50 dark:bg-primary-950/30 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{info.title}</h4>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-300 mb-4">Connect With Me On</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/govardhansai06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-premium rounded-full shadow-sm text-slate-600 dark:text-slate-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/RGovardhanSai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-premium rounded-full shadow-sm text-slate-600 dark:text-slate-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass-premium rounded-2xl p-8 md:p-10 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-colors"
                  placeholder="Subject of message"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-colors resize-none"
                  placeholder="Tell me about your role or project..."
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
