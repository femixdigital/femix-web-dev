import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

const options = [
  {
    title: 'Get a project estimate',
    description:
      'Answer a few questions about your website or web application and get a starting estimate based on your requirements.',
    href: '/estimator',
    icon: Calculator,
    label: 'Open estimator',
  },
  {
    title: 'Tell us about your project',
    description:
      'Already know what you want to build? Send the details directly and we will review the project with you.',
    href: '/contact',
    icon: MessageSquare,
    label: 'Start a conversation',
  },
];

const expectations = [
  'Clear understanding of your project requirements',
  'A practical path from idea to working product',
  'Responsive design built around real users',
  'A technology approach suited to the project',
];

export default function StartProject() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-brand)]">
            <Sparkles className="h-3.5 w-3.5" />
            Start a project
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Let&apos;s turn your idea into a useful digital product.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
            Whether you are starting with a clear specification or just an
            idea, choose the path that fits where you are now.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.href}
                to={option.href}
                className="group rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 transition-colors hover:border-[var(--app-brand)] sm:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-brand)]">
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="mt-7 text-xl font-extrabold tracking-tight">
                  {option.title}
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--app-muted)]">
                  {option.description}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--app-text)] transition-colors group-hover:text-[var(--app-brand)]">
                  {option.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 border-t border-[var(--app-border)] pt-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                What to expect
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
                A practical starting point.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {expectations.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 border-b border-[var(--app-border)] pb-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-brand)]" />
                  <p className="text-sm leading-6 text-[var(--app-muted)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-6 sm:p-8">
          <p className="text-sm font-extrabold">Not sure where to begin?</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--app-muted)]">
            That&apos;s fine. Send us what you already know about the idea and
            we can start from there.
          </p>

          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition-colors hover:bg-[var(--app-brand-hover)]"
          >
            Talk to Femix
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
