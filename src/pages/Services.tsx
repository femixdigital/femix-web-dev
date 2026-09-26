import { Code2, Layout, Zap, Smartphone } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Layout,
      title: 'SPA Development',
      description: 'Fast, interactive single-page applications built with modern React & Vite.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Fully responsive designs tailored for seamless smartphone and desktop experiences.',
    },
    {
      icon: Zap,
      title: 'Performance Tuning',
      description: 'Optimized code structures ensuring rapid page loads and fluid navigation.',
    },
    {
      icon: Code2,
      title: 'Custom Web Apps',
      description: 'Scalable web solutions tailored precisely to your specific business requirements.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Our Services</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          High-performance web solutions crafted with cutting-edge tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
              <Icon className="w-8 h-8 text-indigo-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
