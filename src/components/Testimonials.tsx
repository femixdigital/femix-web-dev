import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Co-Founder & CEO',
    company: 'Apex SaaS Solutions',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    content: 'Femix Digital delivered our SPA SaaS platform ahead of schedule. The bundle optimization and Supabase RLS policies gave us total confidence in our application security and load speed.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Head of Product',
    company: 'FinPulse Tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    content: 'The real-time data sync and custom dashboard built for our team scaled effortlessly. Working with Femix was the smoothest engineering partnership we have experienced.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'CTO',
    company: 'Veloce Logistics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    content: 'Clean architecture, flawless TypeScript execution, and lightning-fast performance. Our client conversion increased by 40% immediately following launch.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Trusted by Tech Leaders
        </h2>
        <p className="text-slate-400 text-lg">
          See what founders and engineering leads say about building with Femix Digital.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-800 group-hover:text-cyan-500/20 transition-colors" />

            <div className="mb-6">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                ))}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                "{item.content}"
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-slate-800/80">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border border-cyan-500/30"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                <p className="text-xs text-slate-400">
                  {item.role} • <span className="text-cyan-400">{item.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
