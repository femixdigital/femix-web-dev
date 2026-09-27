import { Cpu, ShieldCheck, Terminal, ArrowUpRight } from 'lucide-react';

const principles = [
  {
    number: '01',
    icon: Terminal,
    title: 'Built from a real mobile workflow',
    description:
      'Femix Web Dev grew from a hands-on development workflow using Android, Termux, Git, and modern Linux tooling. The goal is simple: remove unnecessary barriers between an idea and a working product.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'A focused modern stack',
    description:
      'We use React, TypeScript, Tailwind CSS, Vite, and Supabase to build fast, maintainable products without adding complexity that does not serve the project.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Designed for production',
    description:
      'Projects are structured for version control, responsive interfaces, reliable data handling, and deployment workflows that can grow with the business.',
  },
];

const stack = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel'];

export default function About() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#0c0c0b] text-white">
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            About the studio
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Practical engineering.
            <span className="block text-white/45">Thoughtful digital products.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            Femix Web Dev is a digital development studio focused on building
            useful websites, web applications, dashboards, and digital products
            for businesses that want to move forward online.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-3">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className="bg-[#111110] p-7 sm:p-8 lg:p-9"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-medium tracking-[0.16em] text-white/25">
                    {item.number}
                  </span>
                </div>

                <h2 className="mt-8 text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/45">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Our approach
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Keep the technology useful.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base leading-7 text-white/50">
              Good development is not about using the most tools. It is about
              choosing the right ones, keeping the experience clear, and making
              sure the final product solves the problem it was built to solve.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white/60"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                Built for businesses
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                From a first idea to a product your customers can actually use.
              </h2>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white transition hover:text-white/70"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
