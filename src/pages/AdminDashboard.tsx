import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';
import { AdminLogin } from '../components/AdminLogin';
import {
  Shield,
  Users,
  ShoppingBag,
  Download,
  RefreshCw,
  Trash2,
  Mail,
  Layers,
  Clock,
  LogOut,
  ArrowUpRight,
  Database,
  FileText,
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

  const fetchData = async () => {
    if (!session) return;

    setLoadingData(true);

    try {
      const [contactsRes, ordersRes] = await Promise.all([
        supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (contactsRes.error) throw contactsRes.error;
      if (ordersRes.error) throw ordersRes.error;

      setContacts(contactsRes.data || []);
      setOrders(ordersRes.data || []);

      showToast(
        'Data Refreshed',
        'Successfully synchronized latest records.',
        'success',
      );
    } catch (err: any) {
      showToast(
        'Sync Error',
        err.message || 'Failed to fetch admin data.',
        'error',
      );
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
    showToast(
      'Logged Out',
      'You have been safely signed out of the admin panel.',
      'success',
    );
  };

  const deleteContact = async (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this contact message?',
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContacts(contacts.filter((c) => c.id !== id));

      showToast(
        'Record Deleted',
        'Contact message removed.',
        'success',
      );
    } catch (err: any) {
      showToast(
        'Delete Failed',
        err.message,
        'error',
      );
    }
  };

  const deleteOrder = async (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this quote order?',
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setOrders(orders.filter((o) => o.id !== id));

      showToast(
        'Record Deleted',
        'Quote order removed.',
        'success',
      );
    } catch (err: any) {
      showToast(
        'Delete Failed',
        err.message,
        'error',
      );
    }
  };

  const exportContactsCSV = () => {
    if (contacts.length === 0) {
      showToast(
        'Export Error',
        'No contact records available to export.',
        'error',
      );
      return;
    }

    const headers = [
      'ID',
      'Name',
      'Email',
      'Project Type',
      'Budget',
      'Message',
      'Date',
    ];

    const rows = contacts.map((c) => [
      c.id,
      c.name,
      c.email,
      c.project_type,
      c.budget,
      `"${c.message}"`,
      c.created_at,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((e) => e.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `contacts_export_${new Date().toISOString().slice(0, 10)}.csv`,
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(
      'CSV Exported',
      `Successfully exported ${contacts.length} contact records.`,
      'success',
    );
  };

  const exportOrdersCSV = () => {
    if (orders.length === 0) {
      showToast(
        'Export Error',
        'No order records available to export.',
        'error',
      );
      return;
    }

    const headers = [
      'ID',
      'Client Name',
      'Email',
      'Pages',
      'Auth',
      'Database',
      'Payments',
      'Total',
      'Status',
      'Date',
    ];

    const rows = orders.map((o) => [
      o.id,
      o.client_name,
      o.client_email,
      o.pages,
      o.has_auth,
      o.has_database,
      o.has_payments,
      o.estimated_total,
      o.status,
      o.created_at,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((e) => e.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');

    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute(
      'download',
      `orders_export_${new Date().toISOString().slice(0, 10)}.csv`,
    );

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    showToast(
      'CSV Exported',
      `Successfully exported ${orders.length} order records.`,
      'success',
    );
  };

  if (authLoading) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-[#0c0c0b] px-5 py-16 text-white sm:px-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-white/45">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Checking secure session...</span>
          </div>
        </div>
      </main>
    );
  }

  if (!session) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  const activeCount =
    activeTab === 'contacts' ? contacts.length : orders.length;

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#0c0c0b] px-5 py-10 text-white sm:px-8 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="border-b border-white/10 pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                <Shield className="h-3.5 w-3.5" />
                Private workspace
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Admin dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                Manage incoming enquiries and project estimates from one
                secure workspace.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/35">
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>{session.user?.email}</span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button
                onClick={fetchData}
                disabled={loadingData}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${
                    loadingData ? 'animate-spin' : ''
                  }`}
                />
                <span>{loadingData ? 'Syncing...' : 'Sync data'}</span>
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-xs font-semibold text-white/45 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 py-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/40">
                Contact leads
              </span>
              <Users className="h-4 w-4 text-white/30" />
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {contacts.length}
            </p>
            <p className="mt-1 text-xs text-white/30">
              Client enquiries received
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/40">
                Estimator quotes
              </span>
              <ShoppingBag className="h-4 w-4 text-white/30" />
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {orders.length}
            </p>
            <p className="mt-1 text-xs text-white/30">
              Project estimates submitted
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/40">
                Current view
              </span>
              <Database className="h-4 w-4 text-white/30" />
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {activeCount}
            </p>
            <p className="mt-1 text-xs capitalize text-white/30">
              {activeTab} records displayed
            </p>
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full rounded-xl border border-white/10 bg-white/[0.02] p-1 sm:w-auto">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition sm:flex-none ${
                  activeTab === 'contacts'
                    ? 'bg-white text-[#0c0c0b]'
                    : 'text-white/45 hover:text-white'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>Contact leads</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    activeTab === 'contacts'
                      ? 'bg-black/10 text-black/60'
                      : 'bg-white/10 text-white/45'
                  }`}
                >
                  {contacts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition sm:flex-none ${
                  activeTab === 'orders'
                    ? 'bg-white text-[#0c0c0b]'
                    : 'text-white/45 hover:text-white'
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Estimator quotes</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    activeTab === 'orders'
                      ? 'bg-black/10 text-black/60'
                      : 'bg-white/10 text-white/45'
                  }`}
                >
                  {orders.length}
                </span>
              </button>
            </div>

            <button
              onClick={
                activeTab === 'contacts'
                  ? exportContactsCSV
                  : exportOrdersCSV
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-white/60 transition hover:bg-white/[0.07] hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>
                {activeTab === 'contacts'
                  ? 'Export contacts'
                  : 'Export orders'}
              </span>
              <ArrowUpRight className="h-3 w-3 text-white/30" />
            </button>
          </div>

          <div className="pt-5">
            {activeTab === 'contacts' ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <FileText className="h-4 w-4 text-white/60" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-white">
                        Incoming enquiries
                      </h2>
                      <p className="mt-1 text-xs text-white/35">
                        Contact submissions from potential clients.
                      </p>
                    </div>
                  </div>
                </div>

                {contacts.length === 0 ? (
                  <div className="px-6 py-20 text-center">
                    <Users className="mx-auto h-7 w-7 text-white/20" />
                    <p className="mt-4 text-sm font-medium text-white/50">
                      No contact submissions yet.
                    </p>
                    <p className="mt-1 text-xs text-white/25">
                      New enquiries will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        <tr>
                          <th className="px-5 py-4">Client</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Project</th>
                          <th className="px-5 py-4">Budget</th>
                          <th className="px-5 py-4">Message</th>
                          <th className="px-5 py-4">Date</th>
                          <th className="px-5 py-4 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/[0.07]">
                        {contacts.map((c) => (
                          <tr
                            key={c.id}
                            className="transition hover:bg-white/[0.025]"
                          >
                            <td className="px-5 py-5">
                              <span className="font-semibold text-white">
                                {c.name}
                              </span>
                            </td>

                            <td className="px-5 py-5">
                              <div className="flex items-center gap-2 text-white/50">
                                <Mail className="h-3.5 w-3.5 shrink-0 text-white/25" />
                                <span>{c.email}</span>
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              <span className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-white/50">
                                {c.project_type}
                              </span>
                            </td>

                            <td className="px-5 py-5 font-medium text-white/70">
                              {c.budget}
                            </td>

                            <td className="max-w-xs px-5 py-5">
                              <p className="truncate text-white/40">
                                {c.message}
                              </p>
                            </td>

                            <td className="whitespace-nowrap px-5 py-5 text-white/30">
                              {new Date(c.created_at).toLocaleDateString()}
                            </td>

                            <td className="px-5 py-5 text-right">
                              <button
                                onClick={() => deleteContact(c.id)}
                                className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-white/35 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
                                title="Delete Contact"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
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
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <ShoppingBag className="h-4 w-4 text-white/60" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-white">
                        Estimator quotes
                      </h2>
                      <p className="mt-1 text-xs text-white/35">
                        Project estimates submitted through the calculator.
                      </p>
                    </div>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="px-6 py-20 text-center">
                    <ShoppingBag className="mx-auto h-7 w-7 text-white/20" />
                    <p className="mt-4 text-sm font-medium text-white/50">
                      No estimator quotes yet.
                    </p>
                    <p className="mt-1 text-xs text-white/25">
                      New project estimates will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        <tr>
                          <th className="px-5 py-4">Client</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Build</th>
                          <th className="px-5 py-4">Estimate</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Date</th>
                          <th className="px-5 py-4 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/[0.07]">
                        {orders.map((o) => (
                          <tr
                            key={o.id}
                            className="transition hover:bg-white/[0.025]"
                          >
                            <td className="px-5 py-5">
                              <span className="font-semibold text-white">
                                {o.client_name}
                              </span>
                            </td>

                            <td className="px-5 py-5">
                              <div className="flex items-center gap-2 text-white/50">
                                <Mail className="h-3.5 w-3.5 shrink-0 text-white/25" />
                                <span>{o.client_email}</span>
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              <div className="flex items-center gap-2 text-white/70">
                                <Layers className="h-3.5 w-3.5 text-white/30" />
                                <span>{o.pages} custom pages</span>
                              </div>

                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {o.has_auth && (
                                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/40">
                                    Auth
                                  </span>
                                )}

                                {o.has_database && (
                                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/40">
                                    Database
                                  </span>
                                )}

                                {o.has_payments && (
                                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/40">
                                    Payments
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              <span className="text-base font-semibold tracking-[-0.02em] text-white">
                                ${o.estimated_total}
                              </span>
                            </td>

                            <td className="px-5 py-5">
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/45">
                                <Clock className="h-3 w-3" />
                                {o.status}
                              </span>
                            </td>

                            <td className="whitespace-nowrap px-5 py-5 text-white/30">
                              {new Date(o.created_at).toLocaleDateString()}
                            </td>

                            <td className="px-5 py-5 text-right">
                              <button
                                onClick={() => deleteOrder(o.id)}
                                className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-white/35 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
                                title="Delete Order"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
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
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
