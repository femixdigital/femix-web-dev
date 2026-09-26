import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Code2, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs px-3.5 py-1.5 rounded-full shadow-inner">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Stack Modern Web Engineering</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          High-Performance <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
            SPA & SaaS Web Platforms
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Femix Digital builds lightning-fast React applications with TypeScript, Tailwind CSS v4, and secure Supabase backends optimized for conversion and speed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all duration-200 text-sm"
          >
            <span>Explore Packages</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold px-8 py-3.5 rounded-2xl border border-slate-800 transition-all duration-200 text-sm"
          >
            <span>Get Free Quote</span>
          </a>
        </div>

        <div className="pt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/60 max-w-2xl mx-auto">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Sub-second Load Times</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Supabase RLS Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>100% TypeScript Clean Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
