import React, { useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Layers3,
  ShoppingBag,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'SaaS' | 'SPA' | 'Dashboard' | 'E-Commerce';
  description: string;
  imageBg: string;
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
      'A real-time product analytics and user event tracking platform featuring custom PostgreSQL indexing, subscription billing, and live data charts.',
    imageBg: 'from-neutral-800 via-neutral-900 to-stone-950',
    techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe API'],
    metrics: '+140% faster load times, 10k+ active users',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'OmniFlow Admin Dashboard',
    category: 'Dashboard',
    description:
      'Enterprise-grade administrative dashboard equipped with role-based access control, CSV export pipelines, and interactive toast feedback alerts.',
    imageBg: 'from-stone-800 via-neutral-900 to-neutral-950',
    techStack: ['React', 'Vite', 'PostgreSQL', 'Lucide Icons'],
    metrics: 'Reduced report generation time by 75%',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Aura Headless E-Commerce SPA',
    category: 'SPA',
    description:
      'High-performance single-page shopping application with instant client-side routing, optimistic cart updates, and secure payment processing.',
    imageBg: 'from-neutral-700 via-stone-900 to-neutral-950',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe Elements'],
    metrics: '99/100 Lighthouse Performance score',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'DevSync Collaborative Workspace',
    category: 'SaaS',
    description:
      'Developer productivity suite featuring real-time document synchronization, team permission management, and custom webhook integrations.',
    imageBg: 'from-stone-700 via-neutral-900 to-neutral-950',
    techStack: ['React', 'Supabase RLS', 'TypeScript', 'Tailwind CSS'],
    metrics: 'Zero downtime across 3 server regions',
    liveUrl: '#',
  },
];

const FILTERS = ['All', 'SaaS', 'SPA', 'Dashboard'] as const;

const categoryIcons = {
  SaaS: Layers3,
  SPA: Code2,
  Dashboard: BarChart3,
  'E-Commerce': ShoppingBag,
};

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#0c0c0b] text-white">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-neutral-300">
            <Layers3 className="h-3.5 w-3.5" />
            Selected work
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            Digital products designed to work beautifully.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
            A selection of web platforms, dashboards, SaaS products and
            interactive experiences built with performance, clarity and
            real-world business needs in mind.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-white/10 pb-5">
          {FILTERS.map((category) => {
            const isActive = activeFilter === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'border-white bg-white text-neutral-950'
                    : 'border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const Icon = categoryIcons[project.category];

            return (
              <article
                key={project.id}
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                {/* Project visual */}
                <div
                  className={`relative h-64 overflow-hidden bg-gradient-to-br ${project.imageBg} p-6 sm:h-72 sm:p-8`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.12),transparent_30%)]" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
                        <Icon className="h-3.5 w-3.5" />
                        {project.category}
                      </span>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white/70 backdrop-blur-sm transition hover:bg-white hover:text-neutral-950"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                        {String(index + 1).padStart(2, '0')} / Case study
                      </p>
                      <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {project.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Project details */}
                <div className="p-6 sm:p-8">
                  <p className="text-sm leading-7 text-neutral-400">
                    {project.description}
                  </p>

                  <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-300" />
                    <p className="text-sm font-medium text-neutral-200">
                      {project.metrics}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div className="mt-16 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 sm:p-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-neutral-400">
                Have something in mind?
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Let&apos;s build your next digital product.
              </h2>
            </div>

            <a
              href="/estimator"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              Start with an estimate
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
