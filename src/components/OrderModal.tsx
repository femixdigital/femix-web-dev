import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useToast } from './Toast';

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
    if (!formData.client_name || !formData.client_email) {
      showToast('Validation Error', 'Please fill in required fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      showToast(
        'Order Received!',
        `Your order for ${packageName} has been logged. We will reach out shortly.`,
        'success'
      );
      onClose();
    } catch (err) {
      showToast('Submission Failed', 'An error occurred while placing your order.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full transition-colors"
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
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
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
              value={formData.client_email}
              onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.client_phone}
              onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Project Requirements
            </label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              placeholder="Tell us brief details about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {loading ? (
              <span>Processing...</span>
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
