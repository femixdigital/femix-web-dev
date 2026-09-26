import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useToast } from './Toast';
import { supabase } from '../lib/supabase';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
  amount?: number;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  packageName = 'Custom Development',
  amount = 0,
}) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    requirements: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.client_name.trim() || !formData.client_email.trim()) {
      showToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('orders').insert([
        {
          package_name: packageName,
          amount: amount,
          currency: 'USD',
          client_name: formData.client_name,
          client_email: formData.client_email,
          client_phone: formData.client_phone || null,
          requirements: formData.requirements || null,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      showToast(
        'Order Placed!',
        `Your order for ${packageName} has been successfully logged. We will contact you shortly.`,
        'success'
      );

      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        requirements: '',
      });
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred while submitting your order.';
      showToast('Order Failed', message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Place Order</h3>
        <p className="text-xs sm:text-sm text-cyan-400 font-mono mb-6">
          {packageName} — ${amount} USD
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              disabled={loading}
              value={formData.client_email}
              onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              disabled={loading}
              value={formData.client_phone}
              onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Project Requirements
            </label>
            <textarea
              rows={3}
              disabled={loading}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none disabled:opacity-50"
              placeholder="Tell us brief details about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Order Request</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
