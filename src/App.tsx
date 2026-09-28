import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './components/ThemeProvider';
import { Home } from './pages/Home';
import { Estimator } from './pages/Estimator';
import Contact from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { Portfolio } from './pages/Portfolio';
import About from './pages/About';
import Services from './pages/Services';
import { NotFound } from './pages/NotFound';
import StartProject from './pages/StartProject';

const Footer: React.FC = () => (
  <footer className="border-t border-[var(--app-border)] bg-[var(--app-surface)]">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-base font-extrabold tracking-[-0.02em] text-[var(--app-text)]">
          Femix Web Dev
        </p>
        <p className="mt-1 max-w-sm text-xs leading-5 text-[var(--app-muted)]">
          Websites, web apps and digital products built with care.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-[var(--app-muted)]">
        <Link
          to="/services"
          className="transition-colors hover:text-[var(--app-brand)]"
        >
          Services
        </Link>

        <Link
          to="/start-project"
          className="transition-colors hover:text-[var(--app-brand)]"
        >
          Start a project
        </Link>

        <Link
          to="/portfolio"
          className="transition-colors hover:text-[var(--app-brand)]"
        >
          Portfolio
        </Link>

        <Link
          to="/contact"
          className="transition-colors hover:text-[var(--app-brand)]"
        >
          Contact
        </Link>

        <span>
          © {new Date().getFullYear()} Femix Web Dev
        </span>
      </div>
    </div>
  </footer>
);

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-[var(--app-bg)] font-sans text-[var(--app-text)] antialiased">
          <Navbar />

          <main className="min-h-[calc(100vh-72px)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/estimator" element={<Estimator />} />
              <Route path="/start-project" element={<StartProject />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
