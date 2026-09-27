import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Calculator,
  Code2,
  FolderGit2,
  Menu,
  Shield,
  X,
} from 'lucide-react';
import { Home } from './pages/Home';
import { Estimator } from './pages/Estimator';
import Contact from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { Portfolio } from './pages/Portfolio';
import { NotFound } from './pages/NotFound';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio', icon: FolderGit2 },
  { label: 'Estimator', path: '/estimator', icon: Calculator },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0c0b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0c0c0b] transition-transform duration-200 group-hover:scale-105">
            <Code2 className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-[15px] font-bold tracking-[-0.02em] text-white">
              Femix Web Dev
            </span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.22em] text-white/40 sm:block">
              Digital Studio
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors ${
                isActive(path)
                  ? 'bg-white text-[#0c0c0b]'
                  : 'text-white/55 hover:bg-white/5 hover:text-white'
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {label}
            </Link>
          ))}

          <Link
            to="/admin"
            className={`ml-2 flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-colors ${
              isActive('/admin')
                ? 'border-white/30 bg-white/10 text-white'
                : 'border-white/10 text-white/45 hover:border-white/20 hover:text-white'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            Admin
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0c0c0b] transition-transform hover:scale-[1.02]"
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0c0c0b] px-5 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium ${
                  isActive(path)
                    ? 'bg-white text-[#0c0c0b]'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </Link>
            ))}

            <Link
              to="/admin"
              className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium ${
                isActive('/admin')
                  ? 'bg-white text-[#0c0c0b]'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>

            <Link
              to="/contact"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-[#0c0c0b]"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="border-t border-white/10 bg-[#0c0c0b]">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-white">Femix Web Dev</p>
        <p className="mt-1 text-xs text-white/35">
          Websites, web apps & digital products built with care.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5 text-xs text-white/40">
        <Link to="/portfolio" className="transition-colors hover:text-white">
          Portfolio
        </Link>
        <Link to="/estimator" className="transition-colors hover:text-white">
          Estimator
        </Link>
        <Link to="/contact" className="transition-colors hover:text-white">
          Contact
        </Link>
        <span>© {new Date().getFullYear()} Femix Web Dev</span>
      </div>
    </div>
  </footer>
);

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0c0c0b] font-sans text-white antialiased selection:bg-white selection:text-[#0c0c0b]">
        <Navbar />

        <main className="min-h-[calc(100vh-72px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/estimator" element={<Estimator />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
