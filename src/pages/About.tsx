import {
  ArrowRight,
  ArrowUpRight,
  Check,
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
    accent: 'violet',
    title: 'Built from a real mobile workflow',
    description:
      'Femix Web Dev grew from a hands-on development workflow using Android, Termux, Git, and modern Linux tooling. The goal is simple: remove unnecessary barriers between an idea and a working product.',
  },
  {
    number: '02',
    icon: Cpu,
    accent: 'blue',
    title: 'A focused modern stack',
    description:
      'We use React, TypeScript, Tailwind CSS, Vite, and Supabase to build fast, maintainable products without adding complexity that does not serve the project.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    accent: 'emerald',
    title: 'Designed for production',
    description:
      'Projects are structured for version control, responsive interfaces, reliable data handling, and deployment workflows that can grow with the business.',
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

const accentClasses = {
  violet: {
    icon: 'border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300',
    number: 'text-violet-500 dark:text-violet-300',
  },
  blue: {
    icon: 'border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300',
    number: 'text-blue-500 dark:text-blue-300',
  },
  emerald: {
    icon: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300',
    number: 'text-emerald-500 dark:text-emerald-300',
  },
};

export default function About() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--app-muted)] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            About Femix Web Dev
          </div>

          <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            Practical engineering.
            <span className="block text-[var(--app-muted)]">
              Thoughtful digital products.
            </span>
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
            Femix Web Dev is a digital development studio focused on building
            useful websites, web applications, dashboards, and digital
            products for businesses that want to move forward online.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-3 text-sm font-bold text-[var(--app-text)] transition hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
            >
              Explore services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {principles.map((item) => {
            const Icon = item.icon;
            const accent = accentClasses[item.accent as keyof typeof accentClasses];

            return (
              <article
                key={item.number}
                className="group rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${accent.icon}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={`text-xs font-black tracking-[0.18em] ${accent.number}`}
                  >
                    {item.number}
                  </span>
                </div>

                <h2 className="mt-8 text-xl font-extrabold tracking-tight text-[var(--app-text)]">
                  {item.title}
                </h2>

                <p className="mt-4 text-sm leading-6 text-[var(--app-muted)]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 border-t border-[var(--app-border)] pt-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
              Our approach
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              Keep the technology useful.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base leading-7 text-[var(--app-muted)]">
              Good development is not about using the most tools. It is about
              choosing the right ones, keeping the experience clear, and making
              sure the final product solves the problem it was built to solve.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {stack.map((technology) => (
                <div
                  key={technology}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-sm font-semibold text-[var(--app-text)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--app-soft)] text-[var(--app-brand)]">
                    <Check className="h-4 w-4" />
                  </span>
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] shadow-sm">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-soft)] text-[var(--app-brand)]">
                <Code2 className="h-5 w-5" />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                Built for businesses
              </p>

              <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                From a first idea to a product your customers can actually
                use.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--app-muted)]">
                Whether you need a professional business website, a dashboard,
                an e-commerce experience, or a custom web application, the
                focus stays on useful design and dependable implementation.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
