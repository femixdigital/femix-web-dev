import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Upload,
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

export const Payment: React.FC = () => {
  const { showToast } = useToast();
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
      const message =
        err instanceof Error
          ? err.message
          : 'Could not submit your payment proof.';

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
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] shadow-[0_18px_50px_rgba(0,0,0,0.06)] lg:grid-cols-[1fr_0.8fr]">
            <div className="p-6 sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--app-brand)]">
                FEMIX / PAYMENT
              </p>

              <h1 className="mt-4 max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Payment details.
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
                    <p className="text-xs text-[var(--app-muted)]">
                      Bank transfer · OPay
                    </p>
                  </div>
                </div>

                <div className="mt-5 divide-y divide-[var(--app-border)]">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs text-[var(--app-muted)]">Bank</span>
                    <span className="text-sm font-bold">OPay</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs text-[var(--app-muted)]">
                      Account name
                    </span>
                    <span className="text-right text-xs font-bold sm:text-sm">
                      WASIU FEMI NUHN
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs text-[var(--app-muted)]">
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
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--app-muted-2)]">
                  Next step
                </p>
                <p className="mt-3 text-2xl font-black tracking-[-0.045em]">
                  Get your exact project amount.
                </p>
                <p className="mt-3 text-xs leading-5 text-[var(--app-muted)]">
                  Your estimate creates the payment session needed to submit
                  your payment confirmation securely.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2">
                <Link
                  to="/estimator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-5 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] shadow-[0_10px_25px_rgba(255,90,54,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--app-brand-hover)]"
                >
                  Get project estimate
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-5 py-3.5 text-sm font-bold transition hover:border-[var(--app-border-strong)] hover:bg-[var(--app-surface-3)]"
                >
                  Contact Femix
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
      <section className="mx-auto max-w-5xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <Link
          to="/estimator"
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--app-muted)] transition hover:text-[var(--app-text-strong)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to estimate
        </Link>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--app-brand)]">
              FEMIX / PAYMENT
            </p>
            <h1 className="mt-2 text-4xl font-black leading-none tracking-[-0.06em] sm:text-5xl">
              Complete your payment.
            </h1>
          </div>

          <div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-xs">
            <span className="text-[var(--app-muted)]">Package · </span>
            <span className="font-bold">{session.packageName}</span>
          </div>
        </div>

        <div className="mt-7 grid gap-3 lg:grid-cols-[1fr_0.82fr]">
          <section className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
            <div className="border-b border-[var(--app-border)] bg-gradient-to-br from-[var(--app-surface)] to-[var(--app-surface-2)] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--app-brand-soft)]">
                  <Wallet className="h-5 w-5 text-[var(--app-brand)]" />
                </span>
                <div>
                  <p className="text-sm font-bold">Transfer to OPay</p>
                  <p className="text-xs text-[var(--app-muted)]">
                    Use the details below
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="divide-y divide-[var(--app-border)]">
                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-xs text-[var(--app-muted)]">Bank</span>
                  <span className="text-sm font-bold">OPay</span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-xs text-[var(--app-muted)]">
                    Account name
                  </span>
                  <span className="text-right text-xs font-bold sm:text-sm">
                    WASIU FEMI NUHN
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-xs text-[var(--app-muted)]">
                    Account number
                  </span>
                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-extrabold tracking-wide transition hover:bg-[var(--app-surface-2)]"
                    title="Copy account number"
                  >
                    611 585 7333
                    <Copy className="h-3.5 w-3.5 text-[var(--app-muted)]" />
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-[var(--app-brand)]/20 bg-[var(--app-brand-soft)] p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--app-brand)]">
                  Amount to pay
                </p>
                <p className="mt-1 text-4xl font-black tracking-[-0.055em] text-[var(--app-brand)] sm:text-5xl">
                  {formatNGN(session.amount)}
                </p>
                <p className="mt-2 text-[11px] text-[var(--app-muted)]">
                  Transfer this exact amount before submitting your proof.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:p-6">
            {submitted ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--app-brand-soft)]">
                  <CheckCircle2 className="h-7 w-7 text-[var(--app-brand)]" />
                </div>

                <h2 className="mt-5 text-2xl font-black tracking-[-0.04em]">
                  Payment proof received.
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
                  We will verify your payment and contact you with the next
                  step.
                </p>

                <Link
                  to="/"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] px-4 py-2.5 text-sm font-bold transition hover:bg-[var(--app-surface-2)]"
                >
                  Back to Femix
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm font-bold">Send payment proof</p>
                  <p className="mt-1.5 text-xs leading-5 text-[var(--app-muted)]">
                    Upload your receipt, transfer confirmation, or other proof
                    of payment.
                  </p>
                </div>

                <label className="mt-5 block cursor-pointer rounded-xl border border-dashed border-[var(--app-border-strong)] bg-[var(--app-surface-2)] p-6 text-center transition hover:border-[var(--app-brand)] hover:bg-[var(--app-brand-soft)]">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,application/pdf"
                    onChange={(e) =>
                      setPaymentProofFile(e.target.files?.[0] ?? null)
                    }
                    className="sr-only"
                  />

                  <Upload className="mx-auto h-6 w-6 text-[var(--app-brand)]" />

                  <p className="mt-3 text-sm font-bold">
                    {paymentProofFile
                      ? paymentProofFile.name
                      : 'Choose payment proof'}
                  </p>

                  <p className="mt-1 text-[11px] text-[var(--app-muted)]">
                    PNG, JPG or PDF · Maximum 5 MB
                  </p>
                </label>

                <button
                  type="button"
                  onClick={handlePaymentProofUpload}
                  disabled={submitting || !paymentProofFile}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-brand)] px-4 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] shadow-[0_10px_25px_rgba(255,90,54,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--app-brand-hover)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {submitting ? 'Submitting...' : 'Submit payment proof'}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>

                <p className="mt-3 text-center text-[11px] leading-5 text-[var(--app-muted)]">
                  Make sure the amount transferred matches the amount shown
                  above.
                </p>
              </>
            )}
          </section>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3">
          <p className="text-[11px] text-[var(--app-muted)]">
            Order
          </p>
          <p className="truncate text-xs font-bold">
            {session.packageName}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Payment;
