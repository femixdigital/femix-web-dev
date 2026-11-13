import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Upload,
  X,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';

interface PaymentSession {
  orderId: string;
  paymentSubmissionToken: string;
  amount: number;
  packageName: string;
}

const PAYMENT_SESSION_KEY = 'femix_payment_order';

const formatNGN = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

const formatFileSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

export const Payment: React.FC = () => {
  const { showToast } = useToast();
  const paymentProofInputRef = useRef<HTMLInputElement>(null);
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(PAYMENT_SESSION_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as PaymentSession;

      if (
        parsed.orderId &&
        parsed.paymentSubmissionToken &&
        typeof parsed.amount === 'number'
      ) {
        setSession(parsed);
      }
    } catch {
      sessionStorage.removeItem(PAYMENT_SESSION_KEY);
    }
  }, []);

  const handlePaymentProofUpload = async () => {
    if (!session || !paymentProofFile) {
      showToast(
        'Payment proof required',
        'Please select your payment receipt or confirmation first.',
        'error',
      );
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

    if (!allowedTypes.includes(paymentProofFile.type)) {
      showToast(
        'Unsupported file',
        'Please upload a PNG, JPG, or PDF file.',
        'error',
      );
      return;
    }

    if (paymentProofFile.size > 5 * 1024 * 1024) {
      showToast(
        'File too large',
        'Payment proof must be 5 MB or smaller.',
        'error',
      );
      return;
    }

    setSubmitting(true);

    try {
      const extension =
        paymentProofFile.type === 'application/pdf'
          ? 'pdf'
          : paymentProofFile.type === 'image/png'
            ? 'png'
            : 'jpg';

      const path = `${session.paymentSubmissionToken}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(path, paymentProofFile, {
          contentType: paymentProofFile.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { error: submitError } = await supabase.rpc(
        'submit_payment_proof',
        {
          p_order_id: session.orderId,
          p_token: session.paymentSubmissionToken,
          p_proof_path: path,
        },
      );

      if (submitError) throw submitError;

      setPaymentProofFile(null);
      setSubmitted(true);

      showToast(
        'Payment proof submitted',
        'Your payment confirmation has been received. We will verify it and contact you with the next step.',
        'success',
      );
    } catch (err: unknown) {
      console.error('Payment proof submission failed:', err);

      const message =
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof err.message === 'string'
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Could not submit your payment proof. Check the browser console for details.';

      showToast('Payment proof failed', message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText('6115857333');
      showToast(
        'Account number copied',
        'The OPay account number is now on your clipboard.',
        'success',
      );
    } catch {
      showToast(
        'Copy unavailable',
        'Please copy the account number manually.',
        'error',
      );
    }
  };

  if (!session) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-[var(--app-bg)] text-[var(--app-text)]">
        <section className="mx-auto max-w-5xl px-3 py-5 sm:px-5 sm:py-6 lg:px-6">
          <div className="grid overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] shadow-[0_18px_50px_rgba(0,0,0,0.06)] lg:grid-cols-[1fr_0.8fr]">
            <div className="p-4 sm:p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--app-brand)]">
                FEMIX / PAYMENT
              </p>

              <h1 className="mt-4 max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Make a payment
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--app-muted)]">
                Use the account below for your Femix Web Dev payment. Get your
                project estimate first to receive the exact amount.
              </p>

              <div className="mt-7 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--app-brand-soft)]">
                    <Wallet className="h-5 w-5 text-[var(--app-brand)]" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Femix Web Dev account</p>
                    <p className="text-sm text-[var(--app-muted)]">
                      Bank transfer · OPay
                    </p>
                  </div>
                </div>

                <div className="mt-5 divide-y divide-[var(--app-border)]">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-sm text-[var(--app-muted)]">Bank</span>
                    <span className="text-sm font-bold">OPay</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-sm text-[var(--app-muted)]">
                      Account name
                    </span>
                    <span className="text-right text-base font-bold">
                      WASIU FEMI NUHN
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-sm text-[var(--app-muted)]">
                      Account number
                    </span>
                    <span className="text-sm font-extrabold tracking-wide">
                      611 585 7333
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t border-[var(--app-border)] bg-[var(--app-surface-2)] p-6 lg:border-l lg:border-t-0 sm:p-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--app-muted-2)]">
                  Next step
                </p>
                <p className="mt-3 text-2xl font-black tracking-[-0.045em]">
                  Need a project estimate?
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                  Your estimate creates the payment session needed to submit
                  your payment confirmation securely.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2">


                <Link
                  to="/estimator"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-3.5 text-sm font-bold transition hover:border-[var(--app-border-strong)] hover:bg-[var(--app-surface-3)]"
                >
                  Get Project Estimate
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-5xl px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--app-muted)] transition hover:text-[var(--app-text-strong)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to contact
        </Link>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--app-brand)]">
              FEMIX / PAYMENT
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl">
              Pay for your project
            </h1>
          </div>

          <div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-sm">
            <span className="text-[var(--app-muted)]">Package · </span>
            <span className="font-bold">{session.packageName}</span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.82fr]">
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[var(--app-surface)] shadow-[0_20px_55px_rgba(0,0,0,0.12)]">
            <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 text-white sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                  <Wallet className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="text-base font-bold">Transfer to OPay</p>
                  <p className="text-sm text-slate-300">
                    Femix Web Dev · OPay
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="divide-y divide-[var(--app-border)]">
                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-[var(--app-muted)]">Bank</span>
                  <span className="text-sm font-bold">OPay</span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-[var(--app-muted)]">
                    Account name
                  </span>
                  <span className="text-right text-base font-bold">
                    WASIU FEMI NUHN
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-[var(--app-muted)]">
                    Account number
                  </span>
                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--app-brand)]/25 bg-[var(--app-brand-soft)] px-3 py-2 text-sm font-extrabold tracking-wide transition hover:border-[var(--app-brand)]/50 hover:opacity-80"
                    title="Copy account number"
                  >
                    611 585 7333
                    <Copy className="h-3.5 w-3.5 text-[var(--app-muted)]" />
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[var(--app-brand)]/20 bg-[var(--app-brand-soft)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--app-brand)]">
                  Amount to pay
                </p>
                <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-[var(--app-brand)] sm:text-4xl">
                  {formatNGN(session.amount)}
                </p>
                <p className="mt-2 text-sm text-[var(--app-muted)]">
                  Transfer this exact amount before submitting your proof.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:p-6">
            {submitted ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--app-brand-soft)]">
                  <CheckCircle2 className="h-8 w-8 text-[var(--app-brand)]" />
                </div>

                <span className="mt-5 rounded-full border border-[var(--app-brand)]/20 bg-[var(--app-brand-soft)] px-3 py-1.5 text-xs font-bold text-[var(--app-brand)]">
                  Receipt received
                </span>

                <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                  Submission successful
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
                  Your payment proof has been received successfully. Our team
                  will review your submission and contact you with the next step.
                </p>

                <div className="mt-6 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-4 text-left">
                  <div className="flex items-center justify-between gap-3 py-2">
                    <span className="text-sm text-[var(--app-muted)]">
                      Package
                    </span>
                    <span className="text-right text-sm font-bold">
                      {session.packageName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[var(--app-border)] py-3">
                    <span className="text-sm text-[var(--app-muted)]">
                      Amount submitted
                    </span>
                    <span className="text-right text-base font-black text-[var(--app-brand)]">
                      {formatNGN(session.amount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[var(--app-border)] pt-3">
                    <span className="text-sm text-[var(--app-muted)]">
                      Payment status
                    </span>
                    <span className="text-sm font-bold">
                      Pending verification
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-[var(--app-muted)]">
                  Please keep your transfer record until verification is complete.
                </p>

                <Link
                  to="/"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
                >
                  Back to homepage
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-lg font-bold">Upload your transfer receipt</p>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--app-muted)]">
                    Upload your transfer receipt or payment confirmation.
                  </p>
                </div>

                <label className="mt-5 flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-[var(--app-brand)]/50 bg-[var(--app-brand-soft)] p-6 text-center transition hover:border-[var(--app-brand)]">
                <input
                  ref={paymentProofInputRef}
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    if (!file) return;

                    const allowedTypes = [
                      'image/png',
                      'image/jpeg',
                      'application/pdf',
                    ];

                    if (!allowedTypes.includes(file.type)) {
                      setPaymentProofFile(null);
                      e.currentTarget.value = '';
                      showToast(
                        'Unsupported file',
                        'Please select a PNG, JPG, or PDF file.',
                        'error',
                      );
                      return;
                    }

                    if (file.size > 5 * 1024 * 1024) {
                      setPaymentProofFile(null);
                      e.currentTarget.value = '';
                      showToast(
                        'File too large',
                        'Payment proof must be 5 MB or smaller.',
                        'error',
                      );
                      return;
                    }

                    setPaymentProofFile(file);
                  }}
                  className="sr-only"
                />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--app-surface)]">
                  <Upload className="h-7 w-7 text-[var(--app-brand)]" />
                </span>
                <span className="mt-4 max-w-full break-all text-base font-bold">
                  {paymentProofFile
                    ? paymentProofFile.name
                    : 'Select your payment receipt'}
                </span>

                {paymentProofFile && (
                  <span className="mt-2 text-xs font-medium text-[var(--app-muted)]">
                    {formatFileSize(paymentProofFile.size)} · Ready to upload
                  </span>
                )}
                <span className="mt-2 rounded-lg bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)]">
                  Choose file
                </span>
                <span className="mt-3 text-sm text-[var(--app-muted)]">
                  Screenshot or PDF · PNG, JPG · Maximum 5 MB
                </span>
              </label>

                {paymentProofFile && (
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--app-brand-soft)]">
                        <CheckCircle2 className="h-5 w-5 text-[var(--app-brand)]" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {paymentProofFile.name}
                        </p>
                        <p className="text-xs text-[var(--app-muted)]">
                          {formatFileSize(paymentProofFile.size)} · Ready to submit
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentProofFile(null);
                        if (paymentProofInputRef.current) {
                          paymentProofInputRef.current.value = '';
                        }
                      }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--app-muted)] transition hover:bg-red-500/10 hover:text-red-500"
                      aria-label="Remove selected receipt"
                      title="Remove selected receipt"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {paymentProofFile && (
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--app-brand-soft)]">
                        <CheckCircle2 className="h-5 w-5 text-[var(--app-brand)]" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{paymentProofFile.name}</p>
                        <p className="text-xs text-[var(--app-muted)]">
                          {formatFileSize(paymentProofFile.size)} · Ready to submit
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentProofFile(null);
                        if (paymentProofInputRef.current) {
                          paymentProofInputRef.current.value = '';
                        }
                      }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--app-muted)] transition hover:bg-red-500/10 hover:text-red-500"
                      aria-label="Remove selected receipt"
                      title="Remove selected receipt"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePaymentProofUpload}
                  disabled={submitting || !paymentProofFile}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-4 py-4 text-base font-bold text-[var(--app-brand-contrast)] shadow-[0_10px_25px_rgba(255,90,54,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--app-brand-hover)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {submitting ? 'Submitting...' : 'Submit payment proof'}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>

                <p className="mt-3 text-center text-sm leading-6 text-[var(--app-muted)]">
                  Ensure your transfer matches the amount shown above.
                </p>
              </>
            )}
          </section>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3">
          <p className="text-sm text-[var(--app-muted)]">
            Order
          </p>
          <p className="truncate text-sm font-bold">
            {session.packageName}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Payment;
