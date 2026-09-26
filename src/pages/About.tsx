import { Terminal, Cpu, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <span className="text-xs font-semibold text-[#00e599] tracking-wider uppercase mb-2 block">
          /// Core Specs
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          About <span className="text-[#00e599]">Femix Web Dev</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
          Pushing modern web development boundaries with mobile-first environments.
        </p>
      </div>

      <div className="space-y-4">
        <div className="crypto-card p-6 rounded-xl flex gap-4 items-start">
          <div className="w-10 h-10 rounded-lg bg-[#181e2a] border border-[#273145] flex items-center justify-center text-[#00e599] shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white uppercase mb-1">Termux &amp; Android Pipeline</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fully optimized workflow developed natively on Android terminal environments using Linux CLI tooling.
            </p>
          </div>
        </div>

        <div className="crypto-card p-6 rounded-xl flex gap-4 items-start">
          <div className="w-10 h-10 rounded-lg bg-[#181e2a] border border-[#273145] flex items-center justify-center text-[#00e599] shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white uppercase mb-1">Ultra-Light Stack</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              React + TypeScript engine integrated with `@tailwindcss/vite` v4 for rapid hot-reloading and instant UI feedback.
            </p>
          </div>
        </div>

        <div className="crypto-card p-6 rounded-xl flex gap-4 items-start">
          <div className="w-10 h-10 rounded-lg bg-[#181e2a] border border-[#273145] flex items-center justify-center text-[#00e599] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white uppercase mb-1">Production Standard</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Strictly structured components ready for version control and automated Vercel edge platform deployments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
