import React from 'react';
import { Code2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 pt-12 pb-8 text-slate-400 text-xs sm:text-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="tracking-tight">Femix Digital</span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs sm:text-sm leading-relaxed">
              Engineering high-converting Single Page Applications and SaaS platforms powered by React, TypeScript, and Supabase.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing Packages</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="/admin" className="hover:text-cyan-400 transition-colors">Admin Dashboard</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex space-x-3">
              <a
                href="https://github.com/femixdigital"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-500/50 hover:text-cyan-400 transition-colors fill-current text-slate-400 hover:text-cyan-400"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-500/50 hover:text-cyan-400 transition-colors fill-current text-slate-400 hover:text-cyan-400"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-500/50 hover:text-cyan-400 transition-colors fill-current text-slate-400 hover:text-cyan-400"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Femix Digital. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>for high performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
