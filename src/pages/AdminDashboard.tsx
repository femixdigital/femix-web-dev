import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Mail, Package, RefreshCw } from 'lucide-react';

interface ContactLead {
  id: string;
  name: string;
  email: string;
  message: string;
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
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, ordersRes] = await Promise.all([
        supabase.from('contact_leads').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
      ]);

      if (leadsRes.data) setLeads(leadsRes.data);
      if (ordersRes.data) setOrders(ordersRes.data);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateLeadStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('contact_leads')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
    }
    setUpdatingId(null);
  };

  const updateOrderStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
      );
    }
    setUpdatingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Management</h1>
          <p className="text-slate-400 text-xs sm:text-sm">Manage inquiries and orders stored in Supabase</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Orders Table */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-white font-bold text-lg">
          <Package className="w-5 h-5 text-cyan-400" />
          <h2>Client Orders ({orders.length})</h2>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-800/50 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Package</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">No orders found.</td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-800/30">
                    <td className="p-4 font-medium text-white">
                      {o.customer_name}
                      <div className="text-[11px] text-slate-500">{o.customer_email}</div>
                    </td>
                    <td className="p-4 text-cyan-400 font-semibold">{o.package_name}</td>
                    <td className="p-4 font-mono">${o.amount}</td>
                    <td className="p-4">
                      <select
                        value={o.status || 'pending'}
                        disabled={updatingId === o.id}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="bg-slate-800 text-slate-200 text-xs border border-slate-700 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      {new Date(o.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Leads Table */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-white font-bold text-lg">
          <Mail className="w-5 h-5 text-cyan-400" />
          <h2>Contact Inquiries ({leads.length})</h2>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-800/50 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500">No leads found.</td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-800/30">
                    <td className="p-4 font-medium text-white">
                      {l.name}
                      <div className="text-[11px] text-slate-500">{l.email}</div>
                    </td>
                    <td className="p-4 text-slate-300 max-w-xs truncate">{l.message}</td>
                    <td className="p-4">
                      <select
                        value={l.status || 'new'}
                        disabled={updatingId === l.id}
                        onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                        className="bg-slate-800 text-slate-200 text-xs border border-slate-700 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
