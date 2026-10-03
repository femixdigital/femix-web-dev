import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Home,
  Wrench,
  Image,
  CreditCard,
  Info,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/services', icon: Wrench },
  { label: 'Work', href: '/portfolio', icon: Image },
  { label: 'Payment', href: '/payment', icon: CreditCard },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: MessageCircle },
  { label: 'Admin', href: '/admin', icon: ShieldCheck },
];

export const Navbar: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
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

          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher />

            <Link
              to="/start-project"
              className="hidden items-center gap-1.5 rounded-lg bg-[var(--app-brand)] px-3.5 py-2.5 text-[12px] font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)] sm:flex"
            >
              Start a Project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-[var(--app-border)] bg-[var(--app-bg)]/95 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
      >
        <div className="mx-auto flex w-full max-w-[900px] items-stretch justify-between overflow-x-auto px-1 py-1.5 sm:px-3 sm:py-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative flex min-w-[76px] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 transition-all duration-200 ${
                  active
                    ? 'bg-[var(--app-surface)] text-[var(--app-brand)] shadow-sm'
                    : 'text-[var(--app-muted)] hover:bg-[var(--app-surface)] hover:text-[var(--app-text-strong)]'
                }`}
              >
                <Icon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${
                    active ? 'stroke-[2.5]' : 'stroke-[2]'
                  }`}
                />

                <span className="text-[10px] font-black leading-none sm:text-[11px]">
                  {item.label}
                </span>

                {active && (
                  <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[var(--app-brand)]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="h-20 sm:h-24" aria-hidden="true" />
    </>
  );
};
