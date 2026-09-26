import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';
import { Download, RefreshCw, Trash2, Mail, DollarSign, Calendar, Layers } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Order {
  id: string;
  client_name: string;
  client_email: string;
  pages: number;
  has_auth: boolean;
  has_database: boolean;
  has_payments: boolean;
  estimated_total: number;
  status: string;
  created_at: string;
}

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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
    } catch (err: any) {
      showToast('Fetch Error', err.message || 'Failed to load dashboard data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleManualRefresh = () => {
    fetchData();
    showToast('Refreshed', 'Dashboard data updated.', 'info');
  };

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;

      setLeads((prev) => prev.filter((l) => l.id !== id));
      showToast('Lead Deleted', 'Inquiry record has been removed.', 'info');
    } catch (err: any) {
      showToast('Delete Failed', err.message || 'Could not delete lead.', 'error');
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (error) throw error;

      setOrders((prev) => prev.filter((o) => o.id !== id));
      showToast('Order Deleted', 'Project quote order removed.', 'info');
    } catch (err: any) {
      showToast('Delete Failed', err.message || 'Could not delete order.', 'error');
    }
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) {
      showToast('Export Skipped', 'No lead records available to export.', 'info');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Message', 'Created At'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      l.created_at,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Export Downloaded', `${filename} generated with ${leads.length} leads.`, 'success');
  };

  const exportOrdersCSV = () => {
    if (orders.length === 0) {
      showToast('Export Skipped', 'No order records available to export.', 'info');
      return;
    }

    const headers = ['ID', 'Client Name', 'Client Email', 'Pages', 'Auth', 'Database', 'Payments', 'Total ($)', 'Status', 'Created At'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.client_name.replace(/"/g, '""')}"`,
      `"${o.client_email.replace(/"/g, '""')}"`,
      o.pages,
      o.has_auth ? 'Yes' : 'No',
      o.has_database ? 'Yes' : 'No',
      o.has_payments ? 'Yes' : 'No',
      o.estimated_total,
      o.status,
      o.created_at,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `orders_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Export Downloaded', `${filename} generated with ${orders.length} orders.`, 'success');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage incoming client inquiries and custom project orders.
          </p>
        </div>
        <button
          onClick={handleManualRefresh}
          className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs px-4 py-2 rounded-xl transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Orders Table Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Project Quote Orders ({orders.length})</h2>
          </div>
          <button
            onClick={exportOrdersCSV}
            className="flex items-center space-x-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs px-3 py-1.5 rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Orders CSV</span>
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Client</th>
                  <th className="p-4">Scope</th>
                  <th className="p-4">Estimate</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500">
                      No project orders submitted yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4">
                        <div className="font-semibold text-white">{o.client_name}</div>
                        <div className="text-slate-500">{o.client_email}</div>
                      </td>
                      <td className="p-4 space-y-1">
                        <div className="flex items-center space-x-1 text-slate-300">
                          <Layers className="w-3 h-3 text-cyan-400" />
                          <span>{o.pages} pages</span>
                        </div>
                        <div className="text-[10px] text-slate-500 space-x-1">
                          {o.has_auth && <span className="bg-slate-800 px-1.5 py-0.5 rounded">Auth</span>}
                          {o.has_database && <span className="bg-slate-800 px-1.5 py-0.5 rounded">DB</span>}
                          {o.has_payments && <span className="bg-slate-800 px-1.5 py-0.5 rounded">Stripe</span>}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-cyan-400 text-sm">${o.estimated_total}</span>
                      </td>
                      <td className="p-4 text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(o.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteOrder(o.id)}
                          className="text-slate-500 hover:text-rose-400 transition p-1.5 rounded-lg hover:bg-rose-500/10"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Leads Table Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Contact Inquiries ({leads.length})</h2>
          </div>
          <button
            onClick={exportLeadsCSV}
            className="flex items-center space-x-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs px-3 py-1.5 rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Leads CSV</span>
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-slate-500">
                      No contact inquiries submitted yet.
                    </td>
                  </tr>
                ) : (
                  leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4">
                        <div className="font-semibold text-white">{l.name}</div>
                        <div className="text-slate-500">{l.email}</div>
                      </td>
                      <td className="p-4 max-w-xs truncate text-slate-400" title={l.message}>
                        {l.message}
                      </td>
                      <td className="p-4 text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(l.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteLead(l.id)}
                          className="text-slate-500 hover:text-rose-400 transition p-1.5 rounded-lg hover:bg-rose-500/10"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
