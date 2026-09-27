import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Calculator,
  ChevronRight,
  Home,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Portfolio', href: '/portfolio', icon: BriefcaseBusiness },
  { label: 'Estimator', href: '/estimator', icon: Calculator },
  { label: 'Contact', href: '/contact', icon: MessageCircle },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

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
    <header className="sticky top-0 z-50 border-b border-[var(--app-border)] bg-[color:var(--app-bg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Femix Web Dev home"
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg shadow-violet-500/10 dark:bg-white dark:text-slate-950">
            <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-violet-500" />
            <span className="absolute -bottom-3 -left-2 h-7 w-7 rounded-full bg-emerald-400" />
            <span className="relative text-sm font-black tracking-[-0.08em]">
              FW
            </span>
          </span>

          <span className="min-w-0">
            <span className="block truncate text-[17px] font-extrabold tracking-[-0.035em] text-[var(--app-text)] sm:text-[19px]">
              Femix Web Dev
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--app-muted)] sm:block">
              Design · Code · Digital Products
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group relative flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? 'bg-[var(--app-surface)] text-[var(--app-text)] shadow-sm'
                    : 'text-[var(--app-muted)] hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    active
                      ? 'text-violet-500'
                      : 'text-[var(--app-muted)] group-hover:text-violet-500'
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeSwitcher />

          <Link
            to="/estimator"
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher />

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)]"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--app-border)] bg-[var(--app-bg)] lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-5 py-4 sm:px-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold ${
                    active
                      ? 'bg-[var(--app-surface)] text-[var(--app-text)]'
                      : 'text-[var(--app-muted)]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 ${
                        active ? 'text-violet-500' : ''
                      }`}
                    />
                    {item.label}
                  </span>

                  <ChevronRight className="h-4 w-4" />
                </Link>
              );
            })}

            <Link
              to="/estimator"
              className="mt-3 flex items-center justify-between rounded-2xl bg-violet-600 px-4 py-3.5 text-sm font-bold text-white"
            >
              <span className="flex items-center gap-3">
                <Sparkles className="h-4 w-4" />
                Start a project
              </span>

              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
