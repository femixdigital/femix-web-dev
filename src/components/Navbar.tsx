import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'Payment', href: '/payment' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-[var(--app-border)] bg-[var(--app-bg)]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Femix home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-text-strong)] text-[var(--app-bg)] transition-transform duration-200 group-hover:scale-105">
            <span className="text-[11px] font-black tracking-[-0.12em]">
              FX
            </span>
          </span>

          <span className="hidden text-[15px] font-black tracking-[-0.045em] text-[var(--app-text-strong)] sm:block">
            Femix Web Dev
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-4 py-2 text-[13px] font-semibold transition-colors ${
                  active
                    ? 'text-[var(--app-text-strong)]'
                    : 'text-[var(--app-muted)] hover:text-[var(--app-text)]'
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute inset-x-4 -bottom-[17px] h-0.5 bg-[var(--app-brand)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />

          <Link
            to="/start-project"
            className="hidden items-center gap-1.5 rounded-lg bg-[var(--app-brand)] px-3.5 py-2.5 text-[12px] font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)] sm:flex"
          >
            Start a Project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-16 min-h-[calc(100vh-4rem)] border-t border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-5 lg:hidden">
          <nav className="mx-auto max-w-lg">
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center justify-between border-b border-[var(--app-border)] py-5 ${
                      active
                        ? 'text-[var(--app-text-strong)]'
                        : 'text-[var(--app-muted)]'
                    }`}
                  >
                    <span className="text-2xl font-black tracking-[-0.05em]">
                      {item.label}
                    </span>

                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>

            <Link
              to="/start-project"
              className="mt-8 flex items-center justify-between rounded-xl bg-[var(--app-brand)] px-5 py-4 text-sm font-bold text-[var(--app-brand-contrast)]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
