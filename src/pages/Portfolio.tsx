import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Droplets,
  Globe2,
  Layers3,
} from 'lucide-react';

type Project = {
  id: string;
  title: string;
  category: 'Service website' | 'Website project';
  description: string;
  focus: string;
  url: string;
  preview: string;
  logo?: string;
  brand: string;
  brandDescription: string;
  icon: typeof Building2;
  accent: string;
};

const projects: Project[] = [
  {
    id: 'samfem',
    title: 'SAMFEM Cleaning Agency',
    category: 'Service website',
    description:
      'A business website designed to present cleaning services clearly and make it easier for customers to enquire.',
    focus:
      'Service information, customer enquiries, reviews and administration.',
    url: 'https://samfemcleaningagency.com.ng',
    preview: '/projects/samfem-homepage.png',
    logo: '/projects/logos/samfem-touch-icon.png',
    brand: 'SAMFEM',
    brandDescription: 'CLEANING AGENCY',
    icon: Building2,
    accent: 'from-sky-500/20 to-blue-500/5',
  },
  {
    id: 'plumbing',
    title: 'Femix Plumbing Services',
    category: 'Service website',
    description:
      'A professional online presence showcasing plumbing, water engineering and installation services.',
    focus:
      'Service presentation, project gallery, business information and customer contact.',
    url: 'https://femixplumbing.name.ng',
    preview: '/projects/femix-plumbing-homepage.png',
    logo: '/projects/logos/femix-plumbing-logo.webp',
    brand: 'FEMIX',
    brandDescription: 'PLUMBING SERVICES',
    icon: Droplets,
    accent: 'from-cyan-500/20 to-blue-500/5',
  },
  {
    id: 'bpv',
    title: "Bibliophile's Pen & Voice",
    category: 'Website project',
    description:
      'A dedicated website for a writing and editorial brand, presenting its identity and services in an organised layout.',
    focus:
      'Brand presentation, content organisation and responsive page design.',
    url: 'https://femixdigital.github.io/bpv-website/',
    preview: '/projects/bpv-homepage.png',
    brand: 'BPV',
    brandDescription: "BIBLIOPHILE'S PEN & VOICE",
    icon: Globe2,
    accent: 'from-amber-500/20 to-orange-500/5',
  },
];

const filters = ['All', 'Service website', 'Website project'] as const;

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>('All');

  const visibleProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-14 pt-7 sm:px-6 sm:pt-10 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--app-primary)] opacity-[0.08] blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-2 text-xs font-bold tracking-[0.16em] text-[var(--app-primary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--app-primary)]" />
              FEMIX WEB DEV / PORTFOLIO
            </div>

            <div className="mt-7 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                  Website projects
                  <span className="mt-2 block text-[var(--app-primary)]">
                    Built with purpose.
                  </span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--app-muted)] sm:text-lg">
                  Visit the websites below to see examples of our work.
                  Explore real projects created to give businesses and brands
                  a stronger online presence.
                </p>
              </div>

              <Link
                to="/start-project"
                className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--app-primary)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--app-primary)]/20 transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Start a New Project
                <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-4 border-t border-[var(--app-border)] pt-6">
              {[
                { value: '03', label: 'Projects showcased' },
                { value: '02', label: 'Service websites' },
                { value: '01', label: 'Brand website' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--app-muted)] sm:text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-primary)]">
                Selected work
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Explore our websites
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Real website projects. Open any project to explore the live website.
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                      isActive
                        ? 'border-[var(--app-primary)] bg-[var(--app-primary)] text-white'
                        : 'border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-muted)] hover:border-[var(--app-primary)] hover:text-[var(--app-primary)]'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {visibleProjects.map((project) => {
              const Icon = project.icon;

              return (
                <article
                  key={project.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--app-primary)] hover:shadow-xl hover:shadow-black/5"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title} website`}
                    className={`relative block overflow-hidden bg-gradient-to-br ${project.accent} p-3 sm:p-4`}
                  >
                    <div className="overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-bg)] shadow-lg">
                      <div className="flex h-9 items-center gap-1.5 border-b border-[var(--app-border)] px-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                        <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-[var(--app-surface)] px-3 py-1 text-[10px] text-[var(--app-muted)]">
                          {project.url.replace('https://', '').replace(/\/$/, '')}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 text-[var(--app-muted)]"
                        />
                      </div>
                      <img
                        src={project.preview}
                        alt={`${project.title} homepage preview`}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover object-top transition duration-500 group-hover:scale-[1.015]"
                      />
                    </div>
                    <span className="absolute bottom-6 right-6 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white backdrop-blur-sm">
                      LIVE WEBSITE PREVIEW
                    </span>
                  </a>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        {project.logo ? (
                          <img
                            src={project.logo}
                            alt={`${project.brand} logo`}
                            className="h-12 w-12 shrink-0 rounded-xl border border-[var(--app-border)] bg-white object-contain p-1.5"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-bg)] text-lg font-black tracking-tight text-[var(--app-primary)]">
                            {project.brand}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold tracking-wide">
                            {project.brand}
                          </p>
                          <p className="mt-0.5 truncate text-[10px] font-semibold tracking-wider text-[var(--app-muted)]">
                            {project.brandDescription}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-1.5 text-[10px] font-semibold text-[var(--app-muted)]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold tracking-tight sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[var(--app-muted)]">
                      {project.description}
                    </p>

                    <div className="mt-5 rounded-xl border border-[var(--app-border)] bg-[var(--app-bg)] p-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--app-primary)]">
                        <Icon size={15} />
                        Project focus
                      </div>
                      <p className="mt-2 text-sm leading-6">
                        {project.focus}
                      </p>
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center justify-between gap-3 rounded-xl border border-[var(--app-border)] px-4 py-3 text-sm font-bold transition hover:border-[var(--app-primary)] hover:bg-[var(--app-bg)]"
                    >
                      <span className="text-[var(--app-primary)]">
                        Visit live website
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-[var(--app-primary)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[var(--app-primary)]">
                <Layers3 size={16} />
                HAVE A PROJECT IN MIND?
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
                Let's build something that works.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--app-muted)]">
                Tell us about your business, your idea or the problem you want
                your website to solve.
              </p>
            </div>

            <Link
              to="/start-project"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--app-primary)] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Start a New Project
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Portfolio;
