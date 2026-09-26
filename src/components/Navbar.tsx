import { Link } from 'react-router';
import { Zap, Menu, X, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-[#1e2638] bg-[#0b0e14]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-wider uppercase text-white">
          <div className="w-8 h-8 rounded-lg bg-[#00e599] flex items-center justify-center text-[#0b0e14]">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span>Femix <span className="text-[#00e599]">Web Dev</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-400">
          <Link to="/" className="hover:text-[#00e599] transition-colors">MARKETS</Link>
          <Link to="/services" className="hover:text-[#00e599] transition-colors">SERVICES</Link>
          <Link to="/portfolio" className="hover:text-[#00e599] transition-colors">ECOSYSTEM</Link>
          <Link to="/about" className="hover:text-[#00e599] transition-colors">ABOUT</Link>
          <Link to="/contact" className="hover:text-[#00e599] transition-colors">CONTACT</Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/contact" 
            className="glow-button px-5 py-2 rounded-md text-xs tracking-wider uppercase flex items-center gap-1 transition-all"
          >
            Launch App <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-slate-300 hover:text-[#00e599] p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav className="md:hidden bg-[#12161f] border-b border-[#1e2638] px-6 py-6 flex flex-col gap-4 text-slate-300 text-sm font-semibold">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-[#00e599] py-1">MARKETS</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-[#00e599] py-1">SERVICES</Link>
          <Link to="/portfolio" onClick={() => setIsOpen(false)} className="hover:text-[#00e599] py-1">ECOSYSTEM</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-[#00e599] py-1">ABOUT</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#00e599] py-1">CONTACT</Link>
          
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="glow-button mt-2 py-3 rounded-md text-center text-xs tracking-wider uppercase flex items-center justify-center gap-1"
          >
            Launch App <ArrowUpRight className="w-4 h-4" />
          </Link>
        </nav>
      )}
    </header>
  );
}
