import { ExternalLink, Terminal } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: 'Femix Web Dev Platform',
      category: 'SPA ARCHITECTURE',
      description: 'Modern Single Page Application built on Android via Termux with React, Vite, and Tailwind CSS v4.',
      status: 'LIVE',
      metrics: 'Vite 8.3 / React 19',
    },
    {
      title: 'Crypto Market Dashboard',
      category: 'FINTECH UI',
      description: 'Real-time asset tracking portal designed with dark void surfaces and high-frequency tickers.',
      status: 'ECOSYSTEM',
      metrics: 'Sub-50ms render',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181e2a] border border-[#273145] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#00e599]"></span>
          <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">SHOWCASE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
          FEATURED <span className="text-[#00e599]">ECOSYSTEM</span>
        </h1>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base">
          Production digital platforms built for precision, throughput, and mobile scalability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="crypto-card p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/30 px-2.5 py-1 rounded">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-[#00e599] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-ping"></span>
                  {project.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white uppercase mb-2">{project.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>
            </div>

            <div className="pt-4 border-t border-[#1e2638] flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> {project.metrics}
              </span>
              <span className="text-[#00e599] font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer hover:underline">
                Inspect <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
