import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Boxes,
  Code2,
  Cpu,
  Layers3,
  MoveUpRight,
} from 'lucide-react';
import FemixScene from '../components/three/FemixScene';

const services = [
  {
    label: 'WEB',
    title: 'Web development',
    icon: Code2,
    to: '/services/web-development',
  },
  {
    label: 'APPS',
    title: 'Web applications',
    icon: Boxes,
    to: '/services/web-applications',
  },
  {
    label: 'SYSTEMS',
    title: 'Business systems',
    icon: Cpu,
    to: '/services/business-systems',
  },
  {
    label: 'LANDING',
    title: 'Landing pages',
    icon: Layers3,
    to: '/services/landing-pages',
  },
];

export const Home: React.FC = () => {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[42%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-[var(--app-brand-glow)] blur-[120px]" />
        <div className="absolute right-[-10%] top-[38%] h-[24rem] w-[24rem] rounded-full bg-[var(--app-accent-glow)] blur-[100px]" />

        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(var(--app-text)_1px,transparent_1px),linear-gradient(90deg,var(--app-text)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1600px] flex-col px-4 pb-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[var(--app-border)] pb-3">
          <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--app-muted-2)]">
            Femix / Digital engineering
          </div>

          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--app-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--app-accent)] shadow-[0_0_12px_var(--app-accent)]" />
            Available
          </div>
        </div>

        <div className="relative grid min-h-0 flex-1 items-center lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative z-20 py-10 lg:py-0">
            <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--app-brand-bright)]">
              FEMIX WEB DEV
            </div>

            <h1 className="max-w-[850px] text-[clamp(4rem,10vw,9.5rem)] font-black leading-[0.78] tracking-[-0.09em] text-[var(--app-text-strong)]">
              BUILD
              <br />
              <span className="text-[var(--app-brand-bright)]">DIGITAL.</span>
            </h1>

            <div className="mt-7 flex max-w-md items-end justify-between gap-6">
              <p className="max-w-[230px] text-xs leading-5 text-[var(--app-muted)]">
                Websites, apps and business systems.
              </p>

              <Link
                to="/start-project"
                className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--app-brand)] text-[var(--app-brand-contrast)] transition-transform duration-300 hover:scale-105"
                aria-label="Start a project"
              >
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="relative h-[45vh] min-h-[320px] lg:h-[calc(100vh-12rem)]">
            <FemixScene />

            <div className="pointer-events-none absolute left-[8%] top-[12%] rounded-full border border-[var(--app-border)] bg-[var(--app-bg)]/60 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--app-muted)] backdrop-blur-xl">
              Interactive / 3D
            </div>

            <div className="pointer-events-none absolute bottom-[10%] right-[4%] max-w-[150px] text-right">
              <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--app-muted-2)]">
                Design × Code
              </div>
              <div className="mt-1 text-xs font-bold text-[var(--app-text)]">
                Systems that move.
              </div>
            </div>

            <div className="pointer-events-none absolute right-[12%] top-[24%] h-20 w-20 rounded-full border border-[var(--app-border)] opacity-60" />
            <div className="pointer-events-none absolute bottom-[20%] left-[10%] h-8 w-8 rounded-full border border-[var(--app-border-strong)] opacity-60" />
          </div>
        </div>

        <div className="grid border-t border-[var(--app-border)] sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ label, title, icon: Icon, to }, index) => (
            <Link
              key={label}
              to={to}
              className={`group relative flex min-h-[88px] items-center justify-between gap-4 px-3 py-4 transition-colors hover:bg-[var(--app-surface)] ${
                index !== services.length - 1
                  ? 'border-b border-[var(--app-border)] lg:border-b-0 lg:border-r'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] transition-transform group-hover:-translate-y-0.5">
                  <Icon className="h-4 w-4 text-[var(--app-brand-bright)]" />
                </span>

                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--app-muted-2)]">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs font-bold text-[var(--app-text)]">
                    {title}
                  </span>
                </span>
              </div>

              <MoveUpRight className="h-4 w-4 text-[var(--app-muted-2)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--app-text)]" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};
