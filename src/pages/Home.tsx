import { Zap, ShieldCheck, PhoneCall, Code, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import Pricing from '../components/Pricing';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-8 sm:pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e599]/30 bg-[#00e599]/10 text-[#00e599] text-xs font-semibold tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Your Vision + Our Code = Real Results</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white max-w-4xl mx-auto leading-none">
          Professional &amp; Modern <br />
          <span className="text-[#00e599]">Website Development</span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          We build modern, secure, and scalable websites and web applications that help your business grow, stand out, and succeed online.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="https://wa.me/2349060708332?text=Hi%20Femix%20Web%20Dev,%20I'm%20interested%20in%20building%20a%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto glow-button px-8 py-3.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Chat on WhatsApp</span>
            <PhoneCall className="w-4 h-4" />
          </a>
          <Link
            to="/services"
            className="w-full sm:w-auto bg-[#12161f] border border-[#1e2638] hover:border-[#00e599] text-slate-300 hover:text-white px-8 py-3.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
          <div className="crypto-card p-4 rounded-xl flex flex-col items-center text-center">
            <ShieldCheck className="w-6 h-6 text-[#00e599] mb-2" />
            <span className="text-xs font-bold text-white uppercase">Secure &amp; Reliable</span>
          </div>
          <div className="crypto-card p-4 rounded-xl flex flex-col items-center text-center">
            <Zap className="w-6 h-6 text-[#00e599] mb-2" />
            <span className="text-xs font-bold text-white uppercase">Fast Performance</span>
          </div>
          <div className="crypto-card p-4 rounded-xl flex flex-col items-center text-center">
            <Code className="w-6 h-6 text-[#00e599] mb-2" />
            <span className="text-xs font-bold text-white uppercase">Mobile Responsive</span>
          </div>
          <div className="crypto-card p-4 rounded-xl flex flex-col items-center text-center">
            <PhoneCall className="w-6 h-6 text-[#00e599] mb-2" />
            <span className="text-xs font-bold text-white uppercase">Ongoing Support</span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />
    </div>
  );
}
