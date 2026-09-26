import React from 'react';
import { Link } from 'react-router';
import { Compass, ArrowLeft, Terminal } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 text-center">
      <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center justify-center p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 mb-6">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          <span>Error 404 // Route Not Found</span>
        </div>

        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
          Signal Lost
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          The node or page you are requesting does not exist or has been relocated across the network.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Terminal</span>
          </Link>
          <Link
            to="/contact"
            className="px-5 py-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium rounded-xl transition-all text-sm"
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  );
};
