import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Messages from './pages/admin/Messages';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={isLoading ? "h-screen overflow-hidden" : ""}>
        <Router>
          <Routes>
            {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
      </div>
    </>
  );
}

export default App
