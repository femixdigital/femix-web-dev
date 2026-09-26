import { useState } from 'react';
import { ProjectEstimator } from '../components/ProjectEstimator';
import { OrderModal } from '../components/OrderModal';
import { Code, Database, Zap, Cpu } from 'lucide-react';

export default function Services() {
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: number } | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto space-y-16">
      {/* Services Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Cpu className="w-3.5 h-3.5" />
          <span>Engineering Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          High-Conversion Web Architecture
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          We construct tailored, fast, and scalable web solutions optimized for maximum client conversion and performance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/40 transition-all group">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 w-fit mb-4">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">SPA & SaaS Platforms</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Single Page Applications built with React, Vite v8 (Rolldown), and TypeScript for instant page transitions and zero layout shifts.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-all group">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 w-fit mb-4">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Full-Stack Integration</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Supabase PostgreSQL databases, REST APIs, Row Level Security (RLS), and custom serverless logic built to scale effortlessly.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/40 transition-all group">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 w-fit mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Payment Systems</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Dual-currency payment integration (Paystack & Stripe) with direct email triggers, receipt logging, and webhook safety.
          </p>
        </div>
      </div>

      {/* Interactive Estimator Section */}
      <ProjectEstimator onSelectPackage={(name, amount) => setSelectedPackage({ name, price: amount })} />

      {/* Order Modal */}
      {selectedPackage && (
        <OrderModal
          packageName={selectedPackage.name}
          amount={selectedPackage.price}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
}
