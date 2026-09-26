import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, CheckCircle2, Code2, Cpu, Database, Globe, Layers, ShieldCheck, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-full text-slate-300 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Modern Single Page Applications & SaaS Development</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            High-Performance Web Apps <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Built for Scale & Speed
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
            We engineer lightning-fast SPAs, robust SaaS platforms, and custom digital experiences using cutting-edge frontend and backend architectures.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/estimator"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Project Estimate</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold px-8 py-3.5 rounded-xl transition text-sm"
            >
              <span>Get in Touch</span>
            </Link>
          </div>

          {/* Tech Stack Bar */}
          <div className="pt-10 border-t border-slate-800/60 mt-16 max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-6">
              Powered by Industry-Standard Modern Tech
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-xs font-bold">
              <span className="flex items-center space-x-1.5">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>React / Vite</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>TypeScript</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Supabase & PostgreSQL</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Tailwind CSS</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="container mx-auto px-4 max-w-6xl space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Core Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Everything You Need to Launch & Scale
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            From intuitive single-page interfaces to secure relational backends, we deliver complete end-to-end digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Single Page Apps (SPAs)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lightning-fast client-side routing, optimized component structures, and state management designed for seamless user experiences.
            </p>
            <ul className="space-y-2 pt-2 text-[11px] text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Vite-powered rapid builds</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Responsive mobile-first layouts</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Secure SaaS Backends</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Robust data architectures featuring JWT user authentication, role-based access control, and scalable PostgreSQL storage.
            </p>
            <ul className="space-y-2 pt-2 text-[11px] text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Row Level Security (RLS)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Stripe payment integrations</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Interactive Dashboards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom admin panels equipped with real-time data tables, CSV exports, and instant notification feedback systems.
            </p>
            <ul className="space-y-2 pt-2 text-[11px] text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live data synchronization</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Toast feedback alerts</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
          
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight relative z-10">
            Ready to Build Your Next Project?
          </h2>
          <p className="max-w-xl mx-auto text-slate-300 text-xs sm:text-sm relative z-10">
            Use our interactive estimator to calculate a precise quote instantly, or reach out to discuss your technical requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 relative z-10">
            <Link
              to="/estimator"
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-cyan-500/20 text-xs flex items-center justify-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Cost Estimator</span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold px-8 py-3.5 rounded-xl transition text-xs flex items-center justify-center space-x-2"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
