import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers3,
  MonitorSmartphone,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const principles = [
  {
    icon: Target,
    title: 'User-focused',
    description: 'Pages and features should be easy for the intended users to understand and use.',
  },
  {
    icon: Cpu,
    title: 'Practical technology',
    description: 'We choose technologies based on what the project needs.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive design',
    description: 'Websites should work properly on phones, tablets and desktop screens.',
  },
  {
    icon: ShieldCheck,
    title: 'Built to grow',
    description: 'We aim to keep the code organised so features can be updated later.',
  },
];

const process = [
  {
    number: '01',
    icon: Target,
    title: 'Understand',
    description:
      'We discuss what you need, who will use it and the features required.',
  },
  {
    number: '02',
    icon: Layers3,
    title: 'Build',
    description:
      'We build the agreed features and share progress as the work develops.',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Deliver',
    description:
      'We check the finished work, fix issues and prepare it for launch.',
  },
];

const technologies = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Supabase',
  'Vercel',
];

export const About: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] px-3 py-5 text-[var(--app-text)] sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6">

        {/* Introduction */}
        <section className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--app-muted)]">
                <Code2 className="h-4 w-4 text-[var(--app-brand)]" />
                About Femix Web Dev
              </div>

              <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Websites and applications for businesses and organisations.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-[var(--app-muted)]">
                Professional websites, web applications and business systems
                designed around your needs.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3 text-base font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-5 py-3 text-base font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
                >
                  Explore services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-brand)]">
                Our services
              </p>

              <div className="mt-4 space-y-4">
                {[
                  'Business websites and company websites',
                  'Web applications and admin dashboards',
                  'Custom tools for business operations',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                    <span className="text-base font-semibold leading-6">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-brand)]">
              How we approach each project
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
              What matters in our work.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-4 transition hover:border-[var(--app-brand)] sm:p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-base font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-base leading-7 text-[var(--app-muted)]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Development process */}
        <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-brand)]">
              Project process
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
              How a project moves forward.
            </h2>
            <p className="mt-2 max-w-xl text-base leading-7 text-[var(--app-muted)]">
              Each project starts with a discussion about what is needed, followed by development and testing.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {process.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-extrabold tracking-widest text-[var(--app-muted-2)]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-base leading-7 text-[var(--app-muted)]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Technology */}
        <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-brand)]">
                Technology
              </p>
              <h2 className="mt-2 text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">
                Technologies we use.
              </h2>
              <p className="mt-2 max-w-md text-base leading-7 text-[var(--app-muted)]">
                Our projects use these tools where they suit the requirements.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:max-w-md sm:justify-end">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-2 text-sm font-bold text-[var(--app-text)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default About;
