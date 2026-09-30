import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Upload, Wallet } from 'lucide-react';
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

  if (!session) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-[var(--app-bg)] text-[var(--app-text)]">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl items-center px-4 py-16 sm:px-6">
          <div className="w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-7 text-center sm:p-10">
            <CreditCard className="mx-auto h-8 w-8 text-[var(--app-brand)]" />

            <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">
              Payment details unavailable
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--app-muted)]">
              Start with a project estimate first. Once your quote request is
              submitted, your payment details will appear here.
            </p>

            <Link
              to="/estimator"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--app-brand)] px-5 py-3 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)]"
            >
              Get a project estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[var(--app-bg)] text-[var(--app-text)]">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          to="/estimator"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-muted)] transition hover:text-[var(--app-text-strong)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to estimate
        </Link>

        <div className="mt-8 max-w-3xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--app-brand-bright)]">
            FEMIX WEB DEV / PAYMENT
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.055em] sm:text-6xl">
            Complete your payment.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--app-muted)]">
            Transfer the exact amount below to the Femix OPay account, then
            send your payment confirmation for verification.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]">
            <div className="border-b border-[var(--app-border)] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--app-brand-soft)]">
                  <Wallet className="h-5 w-5 text-[var(--app-brand)]" />
                </span>

                <div>
                  <p className="text-sm font-bold">Transfer to OPay</p>
                  <p className="mt-0.5 text-xs text-[var(--app-muted)]">
                    Use the details below
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-5 border-b border-[var(--app-border)] py-4">
                <span className="text-sm text-[var(--app-muted)]">Bank</span>
                <span className="text-sm font-bold">OPay</span>
              </div>

              <div className="flex items-center justify-between gap-5 border-b border-[var(--app-border)] py-4">
                <span className="text-sm text-[var(--app-muted)]">
                  Account name
                </span>
                <span className="text-right text-sm font-bold">
                  WASIU FEMI NUHN
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 border-b border-[var(--app-border)] py-4">
                <span className="text-sm text-[var(--app-muted)]">
                  Account number
                </span>
                <span className="text-sm font-extrabold tracking-wide">
                  611 585 7333
                </span>
              </div>

              <div className="pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--app-muted)]">
                  Amount to pay
                </p>

                <p className="mt-2 text-4xl font-extrabold tracking-[-0.045em] text-[var(--app-brand)]">
                  {formatNGN(session.amount)}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 sm:p-7">
            {submitted ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--app-brand-soft)]">
                  <CheckCircle2 className="h-7 w-7 text-[var(--app-brand)]" />
                </div>

                <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.035em]">
                  Payment proof received.
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
                  We will verify your payment and contact you with the next
                  step.
                </p>

                <Link
                  to="/"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] px-4 py-2.5 text-sm font-bold transition hover:bg-[var(--app-surface-2)]"
                >
                  Back to Femix
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm font-bold">Send payment proof</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
                    Upload your receipt, transfer confirmation, or other proof
                    of payment.
                  </p>
                </div>

                <label className="mt-6 block cursor-pointer rounded-xl border border-dashed border-[var(--app-border-strong)] bg-[var(--app-surface-2)] p-7 text-center transition hover:border-[var(--app-brand)]">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,application/pdf"
                    onChange={(e) =>
                      setPaymentProofFile(e.target.files?.[0] ?? null)
                    }
                    className="sr-only"
                  />

                  <Upload className="mx-auto h-6 w-6 text-[var(--app-brand)]" />

                  <p className="mt-3 text-sm font-semibold">
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
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--app-brand)] px-4 py-3.5 text-sm font-bold text-[var(--app-brand-contrast)] transition hover:bg-[var(--app-brand-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit payment proof'}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>

                <p className="mt-4 text-center text-[11px] leading-5 text-[var(--app-muted)]">
                  Make sure the amount transferred matches the amount shown
                  above.
                </p>
              </>
            )}
          </section>
        </div>

        <div className="mt-6 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5">
          <p className="text-xs leading-5 text-[var(--app-muted)]">
            Order: <span className="font-semibold text-[var(--app-text)]">{session.packageName}</span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Payment;
