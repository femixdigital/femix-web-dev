import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, LayoutDashboard, Home, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-white font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span>Femix<span className="text-cyan-400">Digital</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <Link
            to="/"
            className={`flex items-center space-x-1.5 transition-colors ${
              isActive('/') ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <a
            href="/#pricing"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Pricing
          </a>

          <a
            href="/#contact"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Contact
          </a>

          <Link
            to="/admin"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              isActive('/admin')
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 font-medium'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin</span>
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-400 hover:text-white p-2"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`block py-2 text-sm ${
              isActive('/') ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Home
          </Link>
          <a
            href="/#pricing"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm text-slate-300"
          >
            Pricing
          </a>
          <a
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm text-slate-300"
          >
            Contact
          </a>
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-2 py-2 text-sm ${
              isActive('/admin') ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
