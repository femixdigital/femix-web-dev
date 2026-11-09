import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, ShieldCheck } from 'lucide-react';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/femixdigital',
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
  },
  {
    label: 'X',
    href: 'https://twitter.com',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z',
  },
];

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-[#071426] text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-9 border-b border-white/10 pb-8 md:grid-cols-[1.2fr_1fr_0.9fr] md:gap-10">

            {/* Brand */}
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
              >
                <img
                  src="/femix-logo.png"
                  alt="Femix Web Dev logo"
                  className="h-12 w-12 rounded-xl object-contain"
                />
                <span>
                  <span className="block text-base font-extrabold tracking-tight">
                    Femix Web Dev
                  </span>
                  <span className="block text-sm font-medium text-slate-400">
                    Websites & applications
                  </span>
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-base leading-7 text-slate-300">
                Websites, applications and digital solutions built for real
                business needs.
              </p>

              <Link
                to="/start-project"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0866ff] px-5 py-2.5 text-base font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-[#0757db] hover:shadow-blue-500/20 active:scale-95"
              >
                Discuss a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Navigation card */}
            <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3">

              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-base font-medium text-slate-300 transition-colors hover:text-cyan-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Contact actions */}
            <div>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+2349057108822"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-4 py-2.5 text-base font-bold text-cyan-300 transition hover:bg-cyan-400/20 active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>

                <a
                  href="https://wa.me/2349057108822?text=Hello%20Femix%20Web%20Dev%2C%20I%20would%20like%20to%20make%20an%20enquiry."
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with Femix Web Dev on WhatsApp"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-green-400/30 bg-green-500/10 px-4 py-2.5 text-base font-bold text-green-300 transition hover:bg-green-500/20 active:scale-95"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.46 0 .09 5.36.08 11.96c0 2.11.55 4.17 1.6 5.99L0 24l6.22-1.63a11.96 11.96 0 0 0 5.83 1.48h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.51-8.4ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.97.99-3.6-.23-.37a9.91 9.91 0 0 1-1.52-5.25c0-5.46 4.45-9.9 9.91-9.9a9.83 9.83 0 0 1 7.01 2.9 9.83 9.83 0 0 1 2.9 7.01c0 5.46-4.45 9.9-9.96 9.9Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.66-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.61.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-300 active:scale-95"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={item.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Link
              to="/admin"
              className="group inline-flex min-h-10 items-center justify-center gap-3 rounded-lg border border-cyan-300/20 bg-white/[0.06] px-5 py-2 text-sm font-extrabold text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/10 active:scale-[0.98]"
            >
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              Admin Login
              <ArrowUpRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="pt-4 text-center text-sm text-slate-400">
            © 2026 Femix Web Dev. All rights reserved.
          </div>
        </div>
      </footer>

    </>
  );
};

export default Footer;
