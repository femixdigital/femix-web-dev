import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { Footer } from './components/Footer';
import { Code2, ShieldAlert } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
        <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 font-bold text-lg text-white">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="tracking-tight">Femix Digital</span>
            </Link>

            <nav className="flex items-center space-x-6 text-xs sm:text-sm font-medium">
              <a href="/#pricing" className="text-slate-300 hover:text-cyan-400 transition-colors">Pricing</a>
              <a href="/#faq" className="text-slate-300 hover:text-cyan-400 transition-colors">FAQ</a>
              <a href="/#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">Contact</a>
              <Link
                to="/admin"
                className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-800 transition"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                <span>Admin</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
