import { Terminal, Cpu, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">About Femix Web Dev</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Crafting high-performance single page applications with modern technology stacks.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex gap-4 items-start">
          <Terminal className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-semibold mb-1">Mobile-First Development Pipeline</h2>
            <p className="text-slate-400 text-sm">
              Built using lightweight, mobile-optimized tools and environment workflows without compromising speed or code quality.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex gap-4 items-start">
          <Cpu className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-semibold mb-1">Modern Architecture</h2>
            <p className="text-slate-400 text-sm">
              Powered by React, TypeScript, Vite, and Tailwind CSS to guarantee exceptional performance and maintainability.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex gap-4 items-start">
          <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-semibold mb-1">Production Ready</h2>
            <p className="text-slate-400 text-sm">
              Engineered with clean patterns, ready for continuous integration and seamless edge deployment on Vercel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
