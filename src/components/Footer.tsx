import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, Heart } from 'lucide-react';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Estimator', to: '/estimator' },
  { label: 'Contact', to: '/contact' },
];

const projectLinks = [
  { label: 'Start a project', to: '/start-project' },
  { label: 'Project estimator', to: '/estimator' },
  { label: 'Admin dashboard', to: '/admin' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-10 border-b border-[var(--app-border)] pb-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-brand)]">
                <Code2 className="h-4 w-4" />
              </span>

              <span>
                <span className="block text-sm font-extrabold tracking-tight">
                  Femix Web Dev
                </span>
                <span className="block text-[11px] font-medium text-[var(--app-muted)]">
                  Digital products & web systems
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-[var(--app-muted)]">
              Modern websites, web applications, dashboards, and digital
              products built around the way your business actually works.
            </p>

            <Link
              to="/start-project"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--app-text)] transition-colors hover:text-[var(--app-brand)]"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
              Explore
            </h2>

            <nav className="mt-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-sm font-medium text-[var(--app-text)] transition-colors hover:text-[var(--app-brand)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
              Project
            </h2>

            <nav className="mt-4 space-y-3">
              {projectLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-sm font-medium text-[var(--app-text)] transition-colors hover:text-[var(--app-brand)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-7 flex items-center gap-2">
              <a
                href="https://github.com/femixdigital"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-muted)] transition-colors hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-muted)] transition-colors hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-muted)] transition-colors hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-xs text-[var(--app-muted)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Femix Digital. All rights reserved.</p>

          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-[var(--app-brand)] fill-[var(--app-brand)]" />
            <span>for real business use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
