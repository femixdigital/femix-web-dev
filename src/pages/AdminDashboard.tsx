import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';
import { Loader2, Mail, ShoppingBag, RefreshCw, CheckCircle, Clock } from 'lucide-react';

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  service_type: string;
  budget: string;
  notes: string | null;
  status: string;
  created_at: string;
}

interface Order {
  id: string;
  package_name: string;
  amount: number;
  customer_name: string;
  customer_email: string;
  status: string;
  created_at: string;
}

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'leads' | 'orders'>('leads');
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, ordersRes] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
      ]);

      if (leadsRes.error) throw leadsRes.error;
      if (ordersRes.error) throw ordersRes.error;

      setLeads(leadsRes.data || []);
      setOrders(ordersRes.data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch dashboard data.';
      showToast('Error Loading Data', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Management Dashboard</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Monitor real-time leads and package purchases from Supabase.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      <div className="flex space-x-2 border-b border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'leads'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Leads ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
          <p className="text-slate-400 text-xs">Syncing live records...</p>
        </div>
      ) : activeTab === 'leads' ? (
        <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No leads recorded yet.</div>
          ) : (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{lead.full_name}</div>
                      <div className="text-slate-400 text-[11px]">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{lead.service_type}</td>
                    <td className="px-4 py-3 text-slate-300">{lead.budget}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-medium">
                        <Clock className="w-3 h-3" />
                        <span className="capitalize">{lead.status || 'new'}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-[11px]">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No package orders submitted yet.</div>
          ) : (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{order.customer_name}</div>
                      <div className="text-slate-400 text-[11px]">{order.customer_email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{order.package_name}</td>
                    <td className="px-4 py-3 font-semibold text-white">
                      ${order.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-medium">
                        <CheckCircle className="w-3 h-3" />
                        <span className="capitalize">{order.status || 'pending'}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-[11px]">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
