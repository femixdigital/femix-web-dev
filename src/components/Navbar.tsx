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

  const linkClass = (href: string) =>
    `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors xl:px-3 xl:text-base ${
      isActive(href)
        ? 'bg-[var(--app-brand-soft)] text-[var(--app-brand)]'
        : 'text-[var(--app-muted)] hover:bg-[var(--app-surface-2)] hover:text-[var(--app-brand)]'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--app-border)] bg-[var(--app-header)] shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Femix Web Dev home"
        >
          <img
            src="/femix-logo.png"
            alt="Femix Web Dev"
            className="h-11 w-11 rounded-xl object-cover"
            fetchPriority="high"
          />

          <span className="hidden sm:block">
            <span className="block text-base font-extrabold tracking-tight text-[var(--app-text)]">
              Femix Web Dev
            </span>
            <span className="block text-sm font-semibold tracking-wide text-[var(--app-muted)]">
              WEB DEVELOPMENT
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-2">
          <ThemeSwitcher />

          <Link
            to={adminLink.href}
            className="hidden items-center gap-1.5 rounded-lg border border-[var(--app-border-strong)] px-3 py-2 text-sm font-semibold text-[var(--app-text)] transition-colors hover:border-[var(--app-brand)] hover:bg-[var(--app-brand-soft)] hover:text-[var(--app-brand)] lg:inline-flex"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>

          <Link
            to="/start-project"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--app-brand)] px-3 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[var(--app-brand-hover)] sm:px-4 sm:text-base"
          >
            <span className="hidden sm:inline">Start a Project</span>
            <span className="sm:hidden">Start</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="femix-navigation-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)] transition-colors hover:bg-[var(--app-surface-2)] lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="femix-navigation-menu"
          className="border-t border-[var(--app-border)] bg-[var(--app-surface)] shadow-lg lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-4 sm:grid-cols-3 md:px-8">
            {[...primaryLinks, adminLink].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold transition-colors ${
                    isActive(item.href)
                      ? 'bg-[var(--app-brand-soft)] text-[var(--app-brand)]'
                      : 'text-[var(--app-text)] hover:bg-[var(--app-surface-2)]'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}

            <Link
              to="/start-project"
              className="col-span-2 mt-2 flex items-center justify-between rounded-lg bg-[var(--app-brand)] px-4 py-3 text-base font-bold text-white sm:col-span-3"
            >
              Start a New Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
