import { ArrowRight, ShieldCheck, Cpu, Zap, TrendingUp, Activity } from 'lucide-react';
import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181e2a] border border-[#273145] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#00e599] animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">Next-Gen Web Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-6">
          Building High-Speed <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e599] via-[#00f0ff] to-emerald-400">
            Digital Platforms
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Engineered for maximum throughput, low latency, and responsive single-page architecture. Experience mobile-first SPA performance.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
          <Link 
            to="/services" 
            className="glow-button px-8 py-3.5 rounded-lg text-sm tracking-wider uppercase flex items-center justify-center gap-2"
          >
            Explore Platform <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/portfolio" 
            className="px-8 py-3.5 rounded-lg text-sm tracking-wider uppercase border border-[#273145] hover:border-[#00e599] text-slate-200 bg-[#12161f] flex items-center justify-center gap-2 transition-colors"
          >
            View Projects
          </Link>
        </div>

        {/* Ticker Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#1e2638]">
          <div className="crypto-card p-4 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Architecture</p>
            <p className="text-lg font-bold text-white flex items-center gap-1">
              React + Vite <TrendingUp className="w-4 h-4 text-[#00e599]" />
            </p>
          </div>
          <div className="crypto-card p-4 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Engine</p>
            <p className="text-lg font-bold text-white flex items-center gap-1">
              Tailwind v4 <Activity className="w-4 h-4 text-[#00e599]" />
            </p>
          </div>
          <div className="crypto-card p-4 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Latency</p>
            <p className="text-lg font-bold text-[#00e599]">&lt; 100ms Routing</p>
          </div>
          <div className="crypto-card p-4 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Uptime</p>
            <p className="text-lg font-bold text-white">99.99% Edge</p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-[#0e121a] py-16 px-4 border-t border-[#1e2638]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="crypto-card p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-[#181e2a] flex items-center justify-center text-[#00e599] mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Ultra-Fast Loading</h2>
            <p className="text-sm text-slate-400">Optimized bundle overhead delivering smooth rendering across mobile browsers.</p>
          </div>

          <div className="crypto-card p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-[#181e2a] flex items-center justify-center text-[#00e599] mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Modern Stack</h2>
            <p className="text-sm text-slate-400">Built using modular React functional components with strictly-typed TypeScript safety.</p>
          </div>

          <div className="crypto-card p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-[#181e2a] flex items-center justify-center text-[#00e599] mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Production Grade</h2>
            <p className="text-sm text-slate-400">Configured for deployment on continuous delivery edge networks like Vercel.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
