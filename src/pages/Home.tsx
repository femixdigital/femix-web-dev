import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Box,
  Code2,
  Layers3,
  Sparkles,
} from 'lucide-react';
import FemixScene from '../components/three/FemixScene';

const capabilities = [
  {
    icon: Code2,
    label: 'Web',
    title: 'Web development',
    to: '/services/web-development',
  },
  {
    icon: Layers3,
    label: 'Apps',
    title: 'Web applications',
    to: '/services/web-applications',
  },
  {
    icon: Box,
    label: 'Systems',
    title: 'Business systems',
    to: '/services/business-systems',
  },
];

export const Home: React.FC = () => {
  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[var(--app-brand-glow)] blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[var(--app-accent-glow)] blur-3xl" />
      </div>

      <section className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-[1440px] items-center px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-10">
        <div className="relative z-10 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--app-muted)] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[var(--app-brand)]" />
            Femix Digital
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] text-[var(--app-text-strong)] sm:text-7xl lg:text-[clamp(4.5rem,7vw,7.5rem)]">
            Digital
            <br />
            <span className="bg-gradient-to-r from-[var(--app-brand)] via-[var(--app-brand-bright)] to-[var(--app-accent)] bg-clip-text text-transparent">
              built different.
            </span>
          </h1>

          <p className="mt-7 max-w-md text-sm leading-6 text-[var(--app-muted)] sm:text-base">
            Websites, applications and business systems engineered for real-world use.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/start-project"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--app-border-strong)] bg-[var(--app-surface)]/70 px-5 py-3 text-sm font-bold backdrop-blur-xl transition-colors hover:bg-[var(--app-surface-2)]"
            >
              Explore work
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-2">
            {capabilities.map(({ icon: Icon, label, title, to }) => (
              <Link
                key={label}
                to={to}
                className="group rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]/65 p-3 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[var(--app-border-strong)] hover:bg-[var(--app-surface-2)]"
              >
                <Icon className="h-4 w-4 text-[var(--app-brand)] transition-transform group-hover:scale-110" />
                <span className="mt-5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--app-muted-2)]">
                  {label}
                </span>
                <span className="mt-1 block text-xs font-semibold leading-4 text-[var(--app-text)]">
                  {title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative order-first h-[48vh] min-h-[360px] sm:h-[56vh] lg:order-last lg:h-[calc(100vh-110px)]">
          <div className="absolute inset-0 rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)]/20 backdrop-blur-[2px]" />
          <FemixScene />

          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)]/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--app-muted)] backdrop-blur-xl">
            Interactive / 3D
          </div>

          <div className="pointer-events-none absolute bottom-4 right-4 max-w-[170px] rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]/75 p-3 backdrop-blur-xl">
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--app-muted-2)]">
              Digital craft
            </div>
            <div className="mt-1 text-xs font-semibold text-[var(--app-text)]">
              Design × Code × Systems
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
