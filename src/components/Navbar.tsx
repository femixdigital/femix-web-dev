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
  Settings2,
  Users,
  X,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/services', icon: Settings2 },
  { label: 'Portfolio', href: '/portfolio', icon: BriefcaseBusiness },
  { label: 'About', href: '/about', icon: Users },
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
    <header className="sticky top-0 z-50 border-b border-[var(--app-border)] bg-[var(--app-header)] backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex min-w-0 shrink-0 items-center gap-3"
          aria-label="Femix Web Dev home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--app-border-strong)] bg-[var(--app-text-strong)] text-[var(--app-bg)] shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
            <span className="text-xs font-black tracking-[-0.12em]">FX</span>
          </span>

          <span className="min-w-0">
            <span className="block truncate text-[16px] font-extrabold tracking-[-0.035em] text-[var(--app-text-strong)] sm:text-[17px]">
              Femix Web Dev
            </span>
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--app-muted)] sm:block">
              Digital products & web systems
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-semibold transition-colors ${
                  active
                    ? 'text-[var(--app-text-strong)]'
                    : 'text-[var(--app-muted)] hover:text-[var(--app-text)]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}

                {active && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[var(--app-brand)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 xl:ml-4 xl:flex">
          <ThemeSwitcher />

          <Link
            to="/start-project"
            className="flex items-center gap-2 rounded-lg bg-[var(--app-brand)] px-4 py-2.5 text-[13px] font-bold text-[var(--app-brand-contrast)] shadow-sm transition hover:bg-[var(--app-brand-hover)]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <ThemeSwitcher />

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)] transition hover:border-[var(--app-border-strong)]"
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
        <div className="border-t border-[var(--app-border)] bg-[var(--app-surface)] xl:hidden">
          <nav className="mx-auto max-w-[1440px] space-y-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-sm font-semibold transition ${
                    active
                      ? 'bg-[var(--app-brand-soft)] text-[var(--app-text-strong)]'
                      : 'text-[var(--app-muted)] hover:bg-[var(--app-surface-2)] hover:text-[var(--app-text)]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>

                  <ChevronRight className="h-4 w-4" />
                </Link>
              );
            })}

            <Link
              to="/start-project"
              className="mt-3 flex items-center justify-between rounded-lg bg-[var(--app-brand)] px-4 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)]"
            >
              <span className="flex items-center gap-3">
                <ArrowUpRight className="h-4 w-4" />
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
