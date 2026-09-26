import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Loader2,
  Mail,
  Package,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Users,
  Download,
} from 'lucide-react';

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

  // Search & Filter state
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');

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

  // Export functions
  const downloadCSV = (data: Record<string, any>[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((field) => JSON.stringify(row[field] ?? '', (_, v) => (v === null ? '' : v)))
          .join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    a.click();
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer_name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.package_name.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || (o.status || 'pending') === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.message.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = leadStatusFilter === 'all' || (l.status || 'new') === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const activeLeadsCount = leads.filter((l) => l.status === 'new' || l.status === 'contacted').length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-xs sm:text-sm">Metrics and operational backend management</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            ${totalRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Gross total orders</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Orders</span>
            <Package className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {orders.length}
          </div>
          <p className="text-[11px] text-slate-500">Submitted packages</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Leads</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {activeLeadsCount}
          </div>
          <p className="text-[11px] text-slate-500">New & contacted</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Avg Order Value</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            ${avgOrderValue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Per client project</p>
        </div>
      </div>

      {/* Orders Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-white font-bold text-lg">
            <Package className="w-5 h-5 text-cyan-400" />
            <h2>Client Orders ({filteredOrders.length})</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="relative flex-grow sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search orders..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none"
              >
                <option value="all" className="bg-slate-900">All Status</option>
                <option value="pending" className="bg-slate-900">Pending</option>
                <option value="in_progress" className="bg-slate-900">In Progress</option>
                <option value="completed" className="bg-slate-900">Completed</option>
                <option value="cancelled" className="bg-slate-900">Cancelled</option>
              </select>
            </div>
            <button
              onClick={() => downloadCSV(filteredOrders, 'orders_export')}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl px-3 py-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>
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
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">No matching orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
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

      {/* Leads Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-white font-bold text-lg">
            <Mail className="w-5 h-5 text-cyan-400" />
            <h2>Contact Inquiries ({filteredLeads.length})</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="relative flex-grow sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search leads..."
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none"
              >
                <option value="all" className="bg-slate-900">All Status</option>
                <option value="new" className="bg-slate-900">New</option>
                <option value="contacted" className="bg-slate-900">Contacted</option>
                <option value="qualified" className="bg-slate-900">Qualified</option>
                <option value="closed" className="bg-slate-900">Closed</option>
              </select>
            </div>
            <button
              onClick={() => downloadCSV(filteredLeads, 'leads_export')}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl px-3 py-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>
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
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500">No matching leads found.</td>
                </tr>
              ) : (
                filteredLeads.map((l) => (
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
