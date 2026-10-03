import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const principles = [
  {
    number: '01',
    icon: Terminal,
    title: 'Practical development',
    description:
      'Femix Web Dev grew from a hands-on development workflow focused on turning ideas into working, maintainable digital products without unnecessary complexity.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'A modern stack',
    description:
      'We use React, TypeScript, Vite, Tailwind CSS and Supabase to build responsive products with a strong foundation for future growth.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Built for real use',
    description:
      'Projects are structured around clear interfaces, reliable data handling, responsive experiences and deployment workflows that can support growing businesses.',
  },
];

const stack = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Supabase',
  'Vercel',
];

const workflow = [
  'Understand the business requirement',
  'Define the right product scope',
  'Design a clear user experience',
  'Build with maintainable technology',
  'Test across real devices',
  'Deploy and continue improving',
];

export const About: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="border-b border-[var(--app-border)] bg-[var(--app-surface)]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                <Code2 className="h-3.5 w-3.5 text-[var(--app-brand)]" />
                About Femix Web Dev
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Practical engineering for useful digital products.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
                Femix Web Dev is a digital development studio focused on
                building professional websites, web applications, dashboards
                and business systems around real requirements.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-5 py-3 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface-2)]"
                >
                  Explore services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="border-t border-[var(--app-border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                What matters to us
              </p>

              <div className="mt-5 space-y-4">
                {[
                  'Clear interfaces built around real users',
                  'Technology chosen for the actual project',
                  'Responsive experiences across devices',
                  'Maintainable foundations for future growth',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                    <p className="text-sm leading-6 text-[var(--app-text)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
              Our foundation
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
              How we approach development
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-border)]">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="bg-[var(--app-surface)] p-6 transition hover:bg-[var(--app-surface-2)] sm:p-7 lg:p-8"
                >
                  <div className="grid gap-6 lg:grid-cols-[72px_260px_minmax(0,1fr)] lg:items-start lg:gap-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold tracking-[0.16em] text-[var(--app-muted-2)]">
                        {item.number}
                      </span>

                      <h3 className="mt-2 text-xl font-extrabold tracking-[-0.025em]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="max-w-3xl text-sm leading-6 text-[var(--app-muted)] lg:pt-5">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--app-border)] bg-[var(--app-surface-2)]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Our approach
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Keep the technology useful.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-base leading-7 text-[var(--app-muted)]">
                Good development is not about using the most tools. It is
                about choosing the right ones, keeping the experience clear,
                and making sure the final product solves the problem it was
                built to solve.
              </p>

              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {workflow.map((step) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 border-b border-[var(--app-border)] py-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                    <span className="text-sm font-semibold text-[var(--app-text)]">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Technology
              </p>

              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                A focused modern stack.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-[var(--app-muted)]">
                The stack stays focused so attention remains on the product,
                the user experience and the business requirement.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {stack.map((technology) => (
                <div
                  key={technology}
                  className="flex items-center gap-3 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-4"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>

                  <span className="text-sm font-bold text-[var(--app-text)]">
                    {technology}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--app-border)] bg-[var(--app-surface)]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-6 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Build with Femix
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                Have something worth building?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">
                Tell us what you need and we&apos;ll help define the right
                scope, features and starting point for the project.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                to="/start-project"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--app-border-strong)] px-5 py-3 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface)]"
              >
                Contact Femix
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
