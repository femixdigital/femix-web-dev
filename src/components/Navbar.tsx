
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
      <header className="fixed inset-x-0 top-0 z-[80] border-b border-[#dadde1] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:border-[var(--app-border)] dark:bg-[var(--app-bg)]">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-3 sm:px-6">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Femix home"
          >
           <img src="/femix-logo.png" alt="Femix Web Dev logo" className="h-11 w-11 shrink-0 rounded-xl object-cover" fetchPriority="high" />
           
            <span className="hidden text-base font-bold tracking-tight text-[#1877f2] sm:block">
              Femix Web Dev
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher />

            <Link
              to="/start-project"
              className="flex items-center gap-1.5 rounded-full bg-[#e7f3ff] px-3 py-2.5 text-xs font-bold text-[#0866ff] transition-colors hover:bg-[#d8eaff] dark:bg-[var(--app-surface)] dark:text-[var(--app-brand)] sm:px-4"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#dadde1] bg-white dark:border-[var(--app-border)] dark:bg-[var(--app-bg)]"
      >
        <div className="mx-auto flex w-full max-w-[1000px] items-stretch justify-between overflow-x-auto px-1 sm:px-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-w-[58px] flex-1 flex-col items-center justify-center gap-1 px-1 py-2.5 transition-colors sm:min-w-0 sm:py-2 ${
                  active
                    ? 'text-[#1877f2]'
                    : 'text-[#65676b] hover:bg-[#f0f2f5] dark:text-[var(--app-muted)] dark:hover:bg-[var(--app-surface)]'
                }`}
              >
                <Icon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${
                    active ? 'stroke-[2.5]' : 'stroke-[1.9]'
                  }`}
                />

                <span className="whitespace-nowrap text-[9px] font-semibold sm:text-[11px]">
                  {item.label}
                </span>

                {active && (
                  <span className="absolute inset-x-2 top-0 h-[3px] rounded-full bg-[#1877f2]" />
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

