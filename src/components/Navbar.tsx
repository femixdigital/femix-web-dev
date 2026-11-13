import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  CreditCard,
  Home,
  Image,
  Info,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

const primaryLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/services', icon: Wrench },
  { label: 'Portfolio', href: '/portfolio', icon: Image },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: MessageCircle },
  { label: 'Payment', href: '/payment', icon: CreditCard },
];

const adminLink = {
  label: 'Admin Dashboard',
  href: '/admin',
  icon: ShieldCheck,
};

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return (
      location.pathname === href ||
      location.pathname.startsWith(`${href}/`)
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--app-border)] bg-[var(--app-header)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--app-brand)] to-transparent opacity-70" />

      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 xl:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="Femix Web Dev home"
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-1 shadow-lg transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--app-brand)] group-hover:shadow-[0_0_22px_var(--app-brand-glow)]">
            <img
              src="/femix-logo.png"
              alt="Femix Web Dev logo"
              className="h-full w-full rounded-xl object-cover"
              fetchPriority="high"
            />
          </span>

          <span className="hidden sm:block">
            <span className="block text-[16px] font-black leading-tight tracking-tight text-[var(--app-text-strong)]">
              Femix <span className="text-[var(--app-brand-bright)]">Web Dev</span>
            </span>
            <span className="mt-1 block text-[9px] font-bold tracking-[0.23em] text-[var(--app-muted)]">
              DIGITAL EXPERIENCES
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-0.5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-1.5 shadow-inner xl:flex"
        >
          {primaryLinks.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative inline-flex items-center rounded-xl px-3 py-2.5 text-[12px] font-bold transition-all duration-200 ${
                  active
                    ? 'bg-[var(--app-brand-soft)] text-[var(--app-brand-bright)] shadow-sm'
                    : 'text-[var(--app-muted)] hover:bg-[var(--app-surface-2)] hover:text-[var(--app-text-strong)]'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-[var(--app-brand)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
          <ThemeSwitcher />

          <Link
            to={adminLink.href}
            aria-label="Admin Dashboard"
            title="Admin Dashboard"
            className={`hidden h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition-all duration-200 lg:inline-flex ${
              isActive(adminLink.href)
                ? 'border-[var(--app-brand)] bg-[var(--app-brand-soft)] text-[var(--app-brand-bright)]'
                : 'border-[var(--app-border-strong)] bg-[var(--app-surface)] text-[var(--app-muted)] hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden 2xl:inline">Admin Dashboard</span>
            <span className="2xl:hidden">Admin</span>
          </Link>

          <Link
            to="/start-project"
            className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--app-brand)] to-[var(--app-brand-hover)] px-3.5 py-2.5 text-xs font-extrabold text-white shadow-[0_5px_18px_var(--app-brand-glow)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_var(--app-brand-glow)] sm:px-4 sm:text-sm"
          >
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <span className="hidden sm:inline">Start a New Project</span>
            <span className="sm:hidden">Start</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="femix-navigation-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)] transition-all hover:border-[var(--app-brand)] hover:text-[var(--app-brand)] xl:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="femix-navigation-menu"
          className="border-t border-[var(--app-border)] bg-[var(--app-surface)] shadow-2xl xl:hidden"
        >
          <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--app-text-strong)]">
                  Explore Femix
                </p>
                <p className="mt-1 text-xs text-[var(--app-muted)]">
                  Discover what we can build together.
                </p>
              </div>
              <span className="rounded-full border border-[var(--app-brand)]/30 bg-[var(--app-brand-soft)] px-3 py-1 text-[10px] font-bold tracking-wider text-[var(--app-brand)]">
                WEB STUDIO
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[...primaryLinks, adminLink].map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-[58px] items-center gap-2.5 rounded-xl border px-3 py-3 text-sm font-bold transition-all ${
                      active
                        ? 'border-[var(--app-brand)] bg-[var(--app-brand-soft)] text-[var(--app-brand-bright)]'
                        : 'border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-text)] hover:border-[var(--app-brand)]'
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--app-brand-soft)]">
                      <Icon className="h-4 w-4 text-[var(--app-brand)]" />
                    </span>
                    <span className="min-w-0">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/start-project"
              className="mt-4 flex min-h-14 items-center justify-between rounded-xl bg-gradient-to-r from-[var(--app-brand)] to-[var(--app-brand-hover)] px-5 py-3 font-extrabold text-white shadow-[0_5px_20px_var(--app-brand-glow)]"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Start a New Project
              </span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
