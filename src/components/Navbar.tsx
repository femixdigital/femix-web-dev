import { Link } from 'react-router';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
          <Sparkles className="w-5 h-5" />
          <span>Femix Web Dev</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <nav className="md:hidden bg-slate-800 border-b border-slate-700 px-4 py-4 flex flex-col gap-3 text-slate-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-white py-1">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-white py-1">Services</Link>
          <Link to="/portfolio" onClick={() => setIsOpen(false)} className="hover:text-white py-1">Portfolio</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-white py-1">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-white py-1">Contact</Link>
        </nav>
      )}
    </header>
  );
}
