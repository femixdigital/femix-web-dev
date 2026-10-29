import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';

export default function AdminPasswordRecovery() {
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY' && session) {
          setRecoveryReady(true);
          setErrorMessage('');
        }
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (password.length < 8) {
      setErrorMessage('Use a password with at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('The passwords do not match.');
      return;
    }
    if (!recoveryReady) {
      setErrorMessage('Open the password-reset link from your email to continue.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      showToast('Password updated', 'Your password has been changed. You can now sign in.', 'success');
      await supabase.auth.signOut();
      window.location.replace(new URL(
        `${import.meta.env.BASE_URL}admin`,
        window.location.origin,
      ).toString());
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to update your password. Request a new reset link and try again.',
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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--app-brand)]">
              Account recovery
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
              Create a new password
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
              Choose a strong password for your Femix admin account.
            </p>
          </div>

          {!recoveryReady && (
            <div role="status" className="mt-6 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-4 text-sm leading-6">
              Open the password-reset link sent to your email. If the link expired, return to admin login and request another.
            </div>
          )}

          {errorMessage && (
            <div role="alert" aria-live="polite" className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm leading-6 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4">
            <div>
              <label htmlFor="new-admin-password" className="mb-2 block text-xs font-bold">
                New password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-muted)]" />
                <input
                  id="new-admin-password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[var(--app-brand)] focus:ring-4 focus:ring-[var(--app-brand)]/10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-admin-password" className="mb-2 block text-xs font-bold">
                Confirm new password
              </label>
              <input
                id="confirm-admin-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter the password again"
                className="w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3.5 text-sm outline-none focus:border-[var(--app-brand)] focus:ring-4 focus:ring-[var(--app-brand)]/10"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !recoveryReady}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[var(--app-brand-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{loading ? 'Updating password...' : 'Save new password'}</span>
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6 border-t border-[var(--app-border)] pt-5 text-center text-sm">
            <Link to="/admin" className="font-semibold text-[var(--app-brand)] hover:underline">
              Return to admin login
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
