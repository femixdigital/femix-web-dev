import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Database,
  Download,
  FileText,
  LogOut,
  Mail,
  RefreshCw,
  Shield,
  ShoppingBag,
  Trash2,
  Users,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';
import { AdminLogin } from '../components/AdminLogin';

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  service_type: string | null;
  budget: string | null;
  notes: string | null;
  status: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  lead_id: string | null;
  package_name: string;
  amount: number | null;
  currency: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  status: string;
  payment_reference: string | null;
  requirements: string | null;
  created_at: string;
  updated_at: string;
}

type Tab = 'leads' | 'orders';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();

  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initialiseAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(session);
      setAuthLoading(false);

      if (!session?.user) {
        setAdminLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error('Admin membership check failed:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(Boolean(data));
      }

      setAdminLoading(false);
    };

    initialiseAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    if (!session || !isAdmin) return;

    setLoadingData(true);

    try {
      const [leadsRes, ordersRes] = await Promise.all([
        supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false }),

        supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (leadsRes.error) throw leadsRes.error;
      if (ordersRes.error) throw ordersRes.error;

      setLeads((leadsRes.data || []) as Lead[]);
      setOrders((ordersRes.data || []) as Order[]);

      showToast(
        'Data Refreshed',
        'Latest leads and orders have been synchronized.',
        'success',
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch admin data.';

      showToast('Sync Error', message, 'error');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);

    showToast(
      'Logged Out',
      'You have been safely signed out of the admin panel.',
      'success',
    );
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm('Delete this lead permanently?')) return;

    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);

      if (error) throw error;

      setLeads((current) => current.filter((lead) => lead.id !== id));

      showToast(
        'Lead Deleted',
        'The lead was removed successfully.',
        'success',
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete lead.';

      showToast('Delete Failed', message, 'error');
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm('Delete this order permanently?')) return;

    try {
      const { error } = await supabase.from('orders').delete().eq('id', id);

      if (error) throw error;

      setOrders((current) => current.filter((order) => order.id !== id));

      showToast(
        'Order Deleted',
        'The order was removed successfully.',
        'success',
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete order.';

      showToast('Delete Failed', message, 'error');
    }
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) {
      showToast('Export Error', 'No lead records available.', 'error');
      return;
    }

    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'Service',
      'Budget',
      'Notes',
      'Status',
      'Source',
      'Date',
    ];

    const rows = leads.map((lead) => [
      lead.id,
      lead.full_name,
      lead.email,
      lead.phone || '',
      lead.service_type || '',
      lead.budget || '',
      lead.notes || '',
      lead.status || '',
      lead.source,
      lead.created_at,
    ]);

    downloadCSV(
      headers,
      rows,
      `leads_export_${new Date().toISOString().slice(0, 10)}.csv`,
    );

    showToast(
      'CSV Exported',
      `Successfully exported ${leads.length} lead records.`,
      'success',
    );
  };

  const exportOrdersCSV = () => {
    if (orders.length === 0) {
      showToast('Export Error', 'No order records available.', 'error');
      return;
    }

    const headers = [
      'ID',
      'Client Name',
      'Email',
      'Phone',
      'Package',
      'Amount',
      'Currency',
      'Status',
      'Payment Reference',
      'Requirements',
      'Date',
    ];

    const rows = orders.map((order) => [
      order.id,
      order.client_name,
      order.client_email,
      order.client_phone || '',
      order.package_name,
      order.amount ?? '',
      order.currency,
      order.status,
      order.payment_reference || '',
      order.requirements || '',
      order.created_at,
    ]);

    downloadCSV(
      headers,
      rows,
      `orders_export_${new Date().toISOString().slice(0, 10)}.csv`,
    );

    showToast(
      'CSV Exported',
      `Successfully exported ${orders.length} order records.`,
      'success',
    );
  };

  const downloadCSV = (
    headers: string[],
    rows: (string | number)[][],
    filename: string,
  ) => {
    const escapeCSV = (value: string | number) => {
      const stringValue = String(value);
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) => row.map(escapeCSV).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (authLoading || adminLoading) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-[#0c0c0b] px-5 py-16 text-white sm:px-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-white/45">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Checking secure admin access...</span>
          </div>
        </div>
      </main>
    );
  }

  if (!session) {
    return <AdminLogin onSuccess={() => window.location.reload()} />;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-[#0c0c0b] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
          <section className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Shield className="h-5 w-5 text-white/60" />
            </div>

            <h1 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
              Admin access required
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Your Supabase account is authenticated, but it has not been
              granted administrator access.
            </p>

            <button
              onClick={handleSignOut}
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-semibold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </section>
        </div>
      </main>
    );
  }

  const activeCount = activeTab === 'leads' ? leads.length : orders.length;

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
                Manage client enquiries and project orders from one secure
                workspace.
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
                Client leads
              </span>
              <Users className="h-4 w-4 text-white/30" />
            </div>

            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {leads.length}
            </p>

            <p className="mt-1 text-xs text-white/30">
              Website enquiries received
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/40">
                Project orders
              </span>
              <ShoppingBag className="h-4 w-4 text-white/30" />
            </div>

            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {orders.length}
            </p>

            <p className="mt-1 text-xs text-white/30">
              Orders currently recorded
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
                onClick={() => setActiveTab('leads')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition sm:flex-none ${
                  activeTab === 'leads'
                    ? 'bg-white text-[#0c0c0b]'
                    : 'text-white/45 hover:text-white'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>Leads</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    activeTab === 'leads'
                      ? 'bg-black/10 text-black/60'
                      : 'bg-white/10 text-white/45'
                  }`}
                >
                  {leads.length}
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
                <span>Orders</span>
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
                activeTab === 'leads' ? exportLeadsCSV : exportOrdersCSV
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-white/60 transition hover:bg-white/[0.07] hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>
                {activeTab === 'leads' ? 'Export leads' : 'Export orders'}
              </span>
              <ArrowUpRight className="h-3 w-3 text-white/30" />
            </button>
          </div>

          <div className="pt-5">
            {activeTab === 'leads' ? (
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
                        Client submissions from the website contact form.
                      </p>
                    </div>
                  </div>
                </div>

                {leads.length === 0 ? (
                  <EmptyState
                    icon={<Users className="h-7 w-7 text-white/20" />}
                    title="No leads yet."
                    description="New website enquiries will appear here."
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        <tr>
                          <th className="px-5 py-4">Client</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Service</th>
                          <th className="px-5 py-4">Budget</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Date</th>
                          <th className="px-5 py-4 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/[0.07]">
                        {leads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="transition hover:bg-white/[0.025]"
                          >
                            <td className="px-5 py-5">
                              <div>
                                <span className="font-semibold text-white">
                                  {lead.full_name}
                                </span>

                                {lead.phone && (
                                  <p className="mt-1 text-[11px] text-white/30">
                                    {lead.phone}
                                  </p>
                                )}
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              <div className="flex items-center gap-2 text-white/50">
                                <Mail className="h-3.5 w-3.5 shrink-0 text-white/25" />
                                <span>{lead.email}</span>
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              <span className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-white/50">
                                {lead.service_type || 'Not specified'}
                              </span>
                            </td>

                            <td className="px-5 py-5 text-white/50">
                              {lead.budget || 'Not specified'}
                            </td>

                            <td className="px-5 py-5">
                              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold capitalize text-white/55">
                                {lead.status || 'new'}
                              </span>
                            </td>

                            <td className="px-5 py-5 text-white/35">
                              {formatDate(lead.created_at)}
                            </td>

                            <td className="px-5 py-5 text-right">
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white/40 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
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
                        Project orders
                      </h2>
                      <p className="mt-1 text-xs text-white/35">
                        Orders and approved project records.
                      </p>
                    </div>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <EmptyState
                    icon={<ShoppingBag className="h-7 w-7 text-white/20" />}
                    title="No orders yet."
                    description="Project orders will appear here when submitted."
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        <tr>
                          <th className="px-5 py-4">Client</th>
                          <th className="px-5 py-4">Package</th>
                          <th className="px-5 py-4">Amount</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Payment Ref.</th>
                          <th className="px-5 py-4">Date</th>
                          <th className="px-5 py-4 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/[0.07]">
                        {orders.map((order) => (
                          <tr
                            key={order.id}
                            className="transition hover:bg-white/[0.025]"
                          >
                            <td className="px-5 py-5">
                              <div>
                                <span className="font-semibold text-white">
                                  {order.client_name}
                                </span>
                                <p className="mt-1 text-[11px] text-white/30">
                                  {order.client_email}
                                </p>
                              </div>
                            </td>

                            <td className="px-5 py-5 text-white/55">
                              {order.package_name}
                            </td>

                            <td className="px-5 py-5 font-medium text-white/70">
                              {formatMoney(order.amount, order.currency)}
                            </td>

                            <td className="px-5 py-5">
                              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold capitalize text-white/55">
                                {order.status}
                              </span>
                            </td>

                            <td className="px-5 py-5 text-white/35">
                              {order.payment_reference || 'Not paid'}
                            </td>

                            <td className="px-5 py-5 text-white/35">
                              {formatDate(order.created_at)}
                            </td>

                            <td className="px-5 py-5 text-right">
                              <button
                                onClick={() => deleteOrder(order.id)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white/40 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
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

const EmptyState: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="px-6 py-20 text-center">
    <div className="flex justify-center">{icon}</div>
    <p className="mt-4 text-sm font-medium text-white/50">{title}</p>
    <p className="mt-1 text-xs text-white/25">{description}</p>
  </div>
);

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const formatMoney = (amount: number | null, currency: string) => {
  if (amount === null || amount === undefined) {
    return 'Quote pending';
  }

  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
};
