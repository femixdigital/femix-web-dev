import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Layers3,
  ShoppingBag,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'SaaS' | 'SPA' | 'Dashboard' | 'E-Commerce';
  description: string;
  techStack: string[];
  metrics: string;
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'PulseMetrics SaaS Platform',
    category: 'SaaS',
    description:
      'Real-time product analytics, subscriptions and live reporting.',
    techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    metrics: '+140% faster load times · 10k+ users',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'OmniFlow Admin Dashboard',
    category: 'Dashboard',
    description:
      'Role-based operations, reporting workflows and data exports.',
    techStack: ['React', 'Vite', 'PostgreSQL', 'Lucide'],
    metrics: '75% faster report generation',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Aura Headless E-Commerce SPA',
    category: 'SPA',
    description: 'Fast product browsing, cart flows and secure payments.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    metrics: '99/100 Lighthouse Performance',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'DevSync Collaborative Workspace',
    category: 'SaaS',
    description:
      'Real-time collaboration, permissions and webhook integrations.',
    techStack: ['React', 'Supabase RLS', 'TypeScript', 'Tailwind CSS'],
    metrics: 'Built for multi-region operation',
    liveUrl: '#',
  },
];

const FILTERS = ['All', 'SaaS', 'SPA', 'Dashboard', 'E-Commerce'] as const;

const categoryIcons = {
  SaaS: Layers3,
  SPA: Code2,
  Dashboard: BarChart3,
  'E-Commerce': ShoppingBag,
};

const categoryStyles = {
  SaaS: {
    accent: 'text-violet-600 dark:text-violet-300',
    surface: 'bg-violet-50 dark:bg-violet-950/30',
    bar: 'bg-violet-500',
  },
  SPA: {
    accent: 'text-blue-600 dark:text-blue-300',
    surface: 'bg-blue-50 dark:bg-blue-950/30',
    bar: 'bg-blue-500',
  },
  Dashboard: {
    accent: 'text-emerald-600 dark:text-emerald-300',
    surface: 'bg-emerald-50 dark:bg-emerald-950/30',
    bar: 'bg-emerald-500',
  },
  'E-Commerce': {
    accent: 'text-orange-600 dark:text-orange-300',
    surface: 'bg-orange-50 dark:bg-orange-950/30',
    bar: 'bg-orange-500',
  },
};

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-[1440px] px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] lg:grid-cols-[1fr_auto]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[var(--app-accent)]" />
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--app-muted)]">
                FEMIX / SELECTED WORK
              </p>
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
              Work that
              <br />
              <span className="text-[var(--app-accent)]">gets results.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--app-muted)]">
              Selected websites, applications and digital systems built around real requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 border-t border-[var(--app-border)] lg:w-[330px] lg:border-l lg:border-t-0">
            <div className="flex min-h-[100px] flex-col justify-between border-r border-[var(--app-border)] bg-violet-50 p-4 dark:bg-violet-950/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                SaaS
              </span>
              <Layers3 className="h-5 w-5 text-violet-600 dark:text-violet-300" />
            </div>
            <div className="flex min-h-[100px] flex-col justify-between bg-blue-50 p-4 dark:bg-blue-950/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
                Apps
              </span>
              <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex min-h-[100px] flex-col justify-between border-r border-t border-[var(--app-border)] bg-emerald-50 p-4 dark:bg-emerald-950/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                Data
              </span>
              <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div className="flex min-h-[100px] flex-col justify-between border-t border-[var(--app-border)] bg-orange-50 p-4 dark:bg-orange-950/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">
                Commerce
              </span>
              <ShoppingBag className="h-5 w-5 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between border-b border-[var(--app-border)] pb-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-muted)]">
              Explore
            </p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.04em] sm:text-2xl">
              Project archive
            </h2>
          </div>

          <Link
            to="/start-project"
            className="hidden items-center gap-1.5 text-xs font-bold text-[var(--app-text)] sm:flex"
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((category) => {
            const isActive = activeFilter === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`shrink-0 rounded-lg border px-3.5 py-2 text-xs font-bold transition ${
                  isActive
                    ? 'border-[var(--app-text-strong)] bg-[var(--app-text-strong)] text-[var(--app-bg)]'
                    : 'border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-muted)] hover:border-[var(--app-border-strong)] hover:text-[var(--app-text)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const Icon = categoryIcons[project.category];
            const style = categoryStyles[project.category];

            return (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--app-border-strong)]"
              >
                <div className={`h-1.5 ${style.bar}`} />

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.surface}`}
                    >
                      <Icon className={`h-[18px] w-[18px] ${style.accent}`} />
                    </span>

                    <span className="font-mono text-[10px] text-[var(--app-muted-2)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-7">
                    <p
                      className={`text-[9px] font-black uppercase tracking-[0.18em] ${style.accent}`}
                    >
                      {project.category}
                    </p>

                    <h2 className="mt-1.5 text-xl font-black tracking-[-0.04em]">
                      {project.title}
                    </h2>

                    <p className="mt-2 max-w-xl text-xs leading-5 text-[var(--app-muted)]">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--app-border)] bg-[var(--app-surface-2)] px-2 py-1 text-[10px] font-semibold text-[var(--app-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-[var(--app-border)] pt-4">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--app-muted-2)]">
                        Outcome
                      </p>
                      <p className="mt-1 text-xs font-bold leading-5">
                        {project.metrics}
                      </p>
                    </div>

                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-bold ${style.accent}`}
                      >
                        View
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--app-border)] pt-5">
          <p className="text-xs text-[var(--app-muted)]">Have a project in mind?</p>

          <div className="flex gap-4">
            <Link
              to="/contact"
              className="text-xs font-bold text-[var(--app-text)] transition hover:text-[var(--app-brand)]"
            >
              Contact
            </Link>
            <Link
              to="/start-project"
              className="text-xs font-bold text-[var(--app-brand)] transition hover:text-[var(--app-brand-hover)]"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
