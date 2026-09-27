import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Estimator } from './pages/Estimator';
import Contact from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { Portfolio } from './pages/Portfolio';
import { Code2, Shield, Calculator, Mail, FolderGit2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-white font-black tracking-tight text-lg">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <span>Femix Digital</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1 text-xs font-semibold">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-xl transition ${
              isActive('/') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/portfolio"
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              isActive('/portfolio') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </Link>
          <Link
            to="/estimator"
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              isActive('/estimator') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Cost Estimator</span>
          </Link>
          <Link
            to="/contact"
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              isActive('/contact') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </Link>
          <Link
            to="/admin"
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              isActive('/admin') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile quick actions */}
        <div className="flex md:hidden items-center space-x-2">
          <Link
            to="/portfolio"
            className="p-2 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 text-xs font-semibold"
          >
            <FolderGit2 className="w-4 h-4" />
          </Link>
          <Link
            to="/estimator"
            className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            <Calculator className="w-4 h-4" />
          </Link>
          <Link
            to="/admin"
            className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export function App() {
  return (
    <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/estimator" element={<Estimator />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
            <div className="container mx-auto px-4 space-y-2">
              <p>&copy; {new Date().getFullYear()} Femix Digital. All rights reserved.</p>
              <p className="text-slate-600">Built with React, TypeScript, Tailwind CSS, & Supabase.</p>
            </div>
          </footer>
        </div>
    </Router>
  );
}

export default App;
