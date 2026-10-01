import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from './Toast';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast(
        'Validation Error',
        'Please enter both email and password.',
        'error',
      );
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      showToast(
        'Login Successful',
        'Welcome to the secure Admin Dashboard.',
        'success',
      );

      onSuccess();
    } catch (err: any) {
      showToast(
        'Authentication Failed',
        err.message || 'Invalid login credentials.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] px-5 py-10 text-[var(--app-text)] sm:px-8 sm:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-170px)] max-w-md items-center justify-center">
        <section className="w-full rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:shadow-black/20">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--app-brand-soft)] text-[var(--app-brand)] shadow-sm">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--app-brand)]">
              Private workspace
            </p>

            <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
              Admin access
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
              Sign in to manage enquiries, orders and project activity.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-7">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-xs font-bold text-[var(--app-text)]"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-muted)]" />

                  <input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition placeholder:text-[var(--app-muted-2)] focus:border-[var(--app-brand)] focus:bg-[var(--app-surface)] focus:ring-4 focus:ring-[var(--app-brand)]/10"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-xs font-bold text-[var(--app-text)]"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-muted)]" />

                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] py-3.5 pl-11 pr-12 text-sm font-medium outline-none transition placeholder:text-[var(--app-muted-2)] focus:border-[var(--app-brand)] focus:bg-[var(--app-surface)] focus:ring-4 focus:ring-[var(--app-brand)]/10"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--app-muted)] transition hover:bg-[var(--app-brand-soft)] hover:text-[var(--app-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--app-brand)]/20"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[var(--app-brand-hover)] hover:shadow-xl hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Sign in securely'}</span>

                {!loading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-[var(--app-border)] pt-5 text-center text-[11px] text-[var(--app-muted)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--app-brand)]" />
              <span>Authorized access only · Secured by Supabase</span>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
