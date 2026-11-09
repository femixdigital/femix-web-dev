import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const paths = [
  {
    number: '01',
    title: 'Estimate your project',
    description:
      'Tell us what you want to build and include your expected budget, if you have one.',
    href: '/estimator',
    icon: ClipboardList,
    action: 'Start estimate',
  },
  {
    number: '02',
    title: 'Send a project enquiry',
    description:
      'Describe the website or application you need, including any features or requirements you already have.',
    href: '/contact',
    icon: MessageSquare,
    action: 'Send enquiry',
  },
];

const process = [
  {
    icon: ClipboardList,
    title: 'Understand',
    description: 'We discuss what the website or application needs to do.',
  },
  {
    icon: Sparkles,
    title: 'Shape',
    description: 'We agree on the pages, features and project scope.',
  },
  {
    icon: CheckCircle2,
    title: 'Build',
    description: 'We develop the website or application and check that its features work.',
  },
];

export default function StartProject() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 border-b border-[var(--app-border)] pb-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 lg:pb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-brand)]">
              <Sparkles className="h-3.5 w-3.5" />
              Project intake
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Start a website or software project.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--app-muted)] sm:text-lg">
              Tell us where you are with your idea and choose the simplest
              next step. You can estimate the project yourself or send the
              details directly to Femix.
            </p>
          </div>

          <div className="self-end border-l border-[var(--app-border)] pl-6 lg:pl-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
              What happens next
            </p>
            <p className="mt-3 text-base leading-7 text-[var(--app-muted)]">
              We focus first on understanding what the product needs to
              achieve, then turn that into a clear and practical build path.
            </p>

            <div className="mt-5 flex items-center gap-2 text-base font-bold text-[var(--app-text)]">
              <ShieldCheck className="h-4 w-4 text-[var(--app-brand)]" />
              Discuss the requirements before development.
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                Start your project
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
                Choose how to get started.
              </h2>
            </div>

            <p className="hidden text-right text-sm font-semibold text-[var(--app-muted)] sm:block">
              Select an option below.
            </p>
          </div>

          <div className="grid max-w-2xl gap-4">
            {paths.map((path) => {
              const Icon = path.icon;

              return (
                <Link
                  key={path.href}
                  to={path.href}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 transition-colors hover:border-[var(--app-brand)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] text-[var(--app-brand)]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-extrabold tracking-[0.14em] text-[var(--app-muted-2)]">
                      {path.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-extrabold tracking-tight">
                    {path.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-base leading-7 text-[var(--app-muted)]">
                    {path.description}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 text-base font-bold text-[var(--app-text)] transition-colors group-hover:text-[var(--app-brand)]">
                    {path.action}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--app-border)] pt-10">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                How we work
              </p>
              <h2 className="mt-3 max-w-sm text-2xl font-extrabold tracking-tight">
                How we handle a project.
              </h2>
            </div>

            <div className="grid gap-0 border-t border-[var(--app-border)] sm:grid-cols-3 sm:border-t-0">
              {process.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`py-6 sm:px-5 sm:py-0 ${
                      index > 0
                        ? 'border-t border-[var(--app-border)] sm:border-l sm:border-t-0'
                        : ''
                    }`}
                  >
                    <Icon className="h-5 w-5 text-[var(--app-brand)]" />

                    <h3 className="mt-5 text-lg font-extrabold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-base leading-7 text-[var(--app-muted)]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="text-lg font-extrabold">
              Not sure about all the details?
            </p>
            <p className="mt-1 max-w-2xl text-base leading-7 text-[var(--app-muted)]">
              You don&apos;t need a complete specification before starting.
              Share what you have and we can work from there.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3 text-base font-bold text-[var(--app-brand-contrast)] transition-colors hover:bg-[var(--app-brand-hover)]"
          >
            Contact Femix Web Dev
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
