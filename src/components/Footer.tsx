import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Phone,
  ShieldCheck,
} from 'lucide-react';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
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
    <footer className="border-t border-[var(--app-border)] bg-[var(--app-bg)] text-[var(--app-text)] transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-6 lg:px-8">

        <div className="grid gap-7 border-b border-[var(--app-border)] pb-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <img
                src="/femix-logo.png"
                alt="Femix Web Dev logo"
                className="h-11 w-11 object-contain"
              />

              <span>
                <span className="block text-lg font-bold text-[var(--app-text-strong)]">
                  Femix Web Dev
                </span>
                <span className="block text-xs text-[var(--app-muted)]">
                  Your Vision, My Code.
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
              Building professional websites and digital experiences
              that help businesses move forward.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--app-border)] text-[var(--app-muted)] transition-colors hover:border-blue-500 hover:text-blue-500"
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

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-sm font-bold text-[var(--app-text-strong)]">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-[var(--app-muted)] transition-colors hover:text-blue-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-[var(--app-text-strong)]">
              Contact Us
            </h3>

            <div className="flex flex-col items-start gap-3">
              <a
                href="tel:+2349057108822"
                className="inline-flex items-center gap-2 text-sm text-[var(--app-muted)] transition-colors hover:text-blue-500"
              >
                <Phone className="h-4 w-4" />
                +234 905 710 8822
              </a>

              <a
                href="https://wa.me/2349057108822?text=Hello%20Femix%20Web%20Dev%2C%20I%20would%20like%20to%20make%20an%20enquiry."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--app-muted)] transition-colors hover:text-blue-500"
              >
                WhatsApp Us
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm text-[var(--app-muted)] transition-colors hover:text-blue-500"
              >
                Send an enquiry
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <p className="text-center text-xs text-[var(--app-muted)]">
            © {new Date().getFullYear()} Femix Web Dev. All rights reserved.
          </p>

          <p className="text-center text-xs text-[var(--app-muted)]">
            Your Vision, My Code.
          </p>

          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--app-border)] px-5 py-2.5 text-xs font-medium text-[var(--app-muted)] transition-colors hover:border-blue-500 hover:text-blue-500"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
