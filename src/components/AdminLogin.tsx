import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from './Toast';
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast('Validation Error', 'Please enter both email and password.', 'error');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      showToast('Login Successful', 'Welcome to the secure Admin Dashboard.', 'success');
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
    <main className="min-h-[calc(100vh-72px)] bg-[#0c0c0b] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-md items-center justify-center">
        <div className="w-full">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <ShieldCheck className="h-6 w-6 text-white/70" />
            </div>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Private workspace
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
              Admin access
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/45">
              Sign in with your authorized account to manage client enquiries
              and project estimates.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-xs font-medium text-white/60"
                >
                  Admin email
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

                  <input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/25 focus:bg-white/[0.04]"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-xs font-medium text-white/60"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

                  <input
                    id="admin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/25 focus:bg-white/[0.04]"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-[#0c0c0b] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Sign in'}</span>
                {!loading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-center text-[11px] leading-5 text-white/30">
                Authorized access only. Your session is secured through Supabase
                authentication.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
