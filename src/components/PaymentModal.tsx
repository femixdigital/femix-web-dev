import { useState, type FormEvent } from 'react';
import { CreditCard, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  amount: number;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

export default function PaymentModal({ isOpen, onClose, packageName, amount }: PaymentModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePaystackPayment = (e: FormEvent) => {
    e.preventDefault();

    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => triggerPaystack();
      document.body.appendChild(script);
    } else {
      triggerPaystack();
    }
  };

  const triggerPaystack = () => {
    const paystackPublicKey = 'pk_test_sample_key';

    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: paystackPublicKey,
        email: email,
        amount: amount * 100,
        currency: 'NGN',
        ref: 'FMX_' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
          custom_fields: [
            {
              display_name: 'Client Name',
              variable_name: 'client_name',
              value: name,
            },
            {
              display_name: 'Package Ordered',
              variable_name: 'package_ordered',
              value: packageName,
            },
          ],
        },
        callback: async function () {
          // Record successful payment lead in Supabase
          try {
            if (import.meta.env.VITE_SUPABASE_URL) {
              await supabase.from('leads').insert([
                {
                  name: name,
                  email: email,
                  package_name: packageName,
                  amount: amount,
                  status: 'paid_deposit',
                },
              ]);
            }
          } catch (err) {
            console.error('Error logging payment to Supabase:', err);
          }
          setPaymentSuccess(true);
        },
        onClose: function () {
          console.log('Payment modal closed');
        },
      });
      handler.openIframe();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="crypto-card w-full max-w-md p-6 sm:p-8 rounded-2xl relative border border-[#00e599]/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentSuccess ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-[#00e599]/10 border border-[#00e599] flex items-center justify-center text-[#00e599] mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase text-white">Deposit Received!</h3>
            <p className="text-xs text-slate-400">
              Thank you for ordering the <strong className="text-white">{packageName}</strong>. Our engineering team has been notified and will reach out via WhatsApp/Email immediately.
            </p>
            <button
              onClick={() => {
                setPaymentSuccess(false);
                onClose();
              }}
              className="glow-button w-full py-3 rounded-lg text-xs uppercase tracking-wider mt-4"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#00e599]">
              <CreditCard className="w-5 h-5" />
              <span className="text-xs font-bold tracking-wider uppercase">Paystack Checkout</span>
            </div>

            <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-1">
              Order {packageName}
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Total Amount: <span className="text-[#00e599] font-bold">₦{amount.toLocaleString()}</span>
            </p>

            <form onSubmit={handlePaystackPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#0b0e14] border border-[#1e2638] rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00e599] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-[#0b0e14] border border-[#1e2638] rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00e599] text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full glow-button py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Pay ₦{amount.toLocaleString()} via Paystack</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00e599]" />
                <span>Secured 256-bit payment gateway via Paystack</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
