import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';
import { AdminLogin } from '../components/AdminLogin';
import { 
  Shield, Users, ShoppingBag, Download, RefreshCw, Trash2, 
  Mail, Layers, Clock, LogOut 
} from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  project_type: string;
  budget: string;
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
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<'contacts' | 'orders'>('contacts');
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  // Check active Supabase session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch data when authenticated
  const fetchData = async () => {
    if (!session) return;
    setLoadingData(true);
    try {
      const [contactsRes, ordersRes] = await Promise.all([
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
      ]);

      if (contactsRes.error) throw contactsRes.error;
      if (ordersRes.error) throw ordersRes.error;

      setContacts(contactsRes.data || []);
      setOrders(ordersRes.data || []);
      showToast('Data Refreshed', 'Successfully synchronized latest records.', 'success');
    } catch (err: any) {
      showToast('Sync Error', err.message || 'Failed to fetch admin data.', 'error');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    showToast('Logged Out', 'You have been safely signed out of the admin panel.', 'success');
  };

  const deleteContact = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    try {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
      setContacts(contacts.filter(c => c.id !== id));
      showToast('Record Deleted', 'Contact message removed.', 'success');
    } catch (err: any) {
      showToast('Delete Failed', err.message, 'error');
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this quote order?')) return;
    try {
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (error) throw error;
      setOrders(orders.filter(o => o.id !== id));
      showToast('Record Deleted', 'Quote order removed.', 'success');
    } catch (err: any) {
      showToast('Delete Failed', err.message, 'error');
    }
  };

  const exportContactsCSV = () => {
    if (contacts.length === 0) {
      showToast('Export Error', 'No contact records available to export.', 'error');
      return;
    }
    const headers = ['ID', 'Name', 'Email', 'Project Type', 'Budget', 'Message', 'Date'];
    const rows = contacts.map(c => [c.id, c.name, c.email, c.project_type, c.budget, `"${c.message}"`, c.created_at]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `contacts_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Exported', `Successfully exported ${contacts.length} contact records.`, 'success');
  };

  const exportOrdersCSV = () => {
    if (orders.length === 0) {
      showToast('Export Error', 'No order records available to export.', 'error');
      return;
    }
    const headers = ['ID', 'Client Name', 'Email', 'Pages', 'Auth', 'Database', 'Payments', 'Total', 'Status', 'Date'];
    const rows = orders.map(o => [o.id, o.client_name, o.client_email, o.pages, o.has_auth, o.has_database, o.has_payments, o.estimated_total, o.status, o.created_at]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', `orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    showToast('CSV Exported', `Successfully exported ${orders.length} order records.`, 'success');
  };

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl space-y-8">
      {/* Admin Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white">Secure Admin Dashboard</h1>
            <p className="text-xs text-slate-400">Signed in as {session.user?.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={fetchData}
            disabled={loadingData}
            className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span>Sync Data</span>
          </button>

          <button
            onClick={handleSignOut}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold px-4 py-2 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs & Export Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'contacts'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Contact Leads ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Estimator Quotes ({orders.length})</span>
          </button>
        </div>

        <div>
          {activeTab === 'contacts' ? (
            <button
              onClick={exportContactsCSV}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Contacts CSV</span>
            </button>
          ) : (
            <button
              onClick={exportOrdersCSV}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Orders CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'contacts' ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Incoming Client Contact Submissions
          </div>
          {contacts.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">No contact submissions found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Project Type</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4 font-bold text-white">{c.name}</td>
                      <td className="p-4 font-mono text-cyan-400 flex items-center space-x-1.5 pt-4.5">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span>{c.email}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">
                          {c.project_type}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-emerald-400">{c.budget}</td>
                      <td className="p-4 max-w-xs truncate text-slate-400">{c.message}</td>
                      <td className="p-4 text-slate-500">{new Date(c.created_at).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteContact(c.id)}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                          title="Delete Contact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Cost Estimator Quotes & Orders
          </div>
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">No estimator quote submissions found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Pages & Add-ons</th>
                    <th className="p-4">Total Estimate</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4 font-bold text-white">{o.client_name}</td>
                      <td className="p-4 font-mono text-cyan-400 flex items-center space-x-1.5 pt-4.5">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span>{o.client_email}</span>
                      </td>
                      <td className="p-4 space-y-1">
                        <div className="font-semibold text-white flex items-center space-x-1">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{o.pages} Custom Pages</span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {o.has_auth && <span className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400">Auth</span>}
                          {o.has_database && <span className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400">DB</span>}
                          {o.has_payments && <span className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400">Stripe</span>}
                        </div>
                      </td>
                      <td className="p-4 font-black text-emerald-400 text-sm">${o.estimated_total}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase">
                          <Clock className="w-3 h-3" />
                          <span>{o.status}</span>
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteOrder(o.id)}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                          title="Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
