import { Code2, Layout, Zap, Smartphone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

export default function Services() {
  const services = [
    {
      icon: Layout,
      title: 'SPA Development',
      description: 'High-speed, dynamic single-page applications engineered with modern React & Vite.',
      badge: 'CORE ENGINE',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Architecture',
      description: 'Ultra-responsive UI/UX designed natively for mobile viewports and desktop browsers.',
      badge: 'RESPONSIVE',
    },
    {
      icon: Zap,
      title: 'Performance Tuning',
      description: 'Low-latency state management and code-splitting ensuring sub-100ms routing.',
      badge: 'OPTIMIZED',
    },
    {
      icon: Code2,
      title: 'Custom Web Apps',
      description: 'Scalable SaaS solutions built tailored precisely to high-volume business demands.',
      badge: 'ENTERPRISE',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181e2a] border border-[#273145] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#00e599]"></span>
          <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">CAPABILITIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
          PLATFORM <span className="text-[#00e599]">SERVICES</span>
        </h1>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base">
          High-performance web architecture crafted with cutting-edge stack tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="crypto-card p-6 rounded-xl flex flex-col justify-between group transition-all">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#181e2a] flex items-center justify-center text-[#00e599]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/30 px-2.5 py-1 rounded">
                    {item.badge}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white uppercase mb-2 group-hover:text-[#00e599] transition-colors">
                  {item.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>
              </div>

              <Link to="/contact" className="inline-flex items-center gap-1 text-xs font-semibold uppercase text-slate-300 group-hover:text-[#00e599] transition-colors">
                <span>Deploy Solution</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
