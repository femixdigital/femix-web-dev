import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Download,
  LogOut,
  Mail,
  RefreshCw,
  Shield,
  ShoppingBag,
  Trash2,
  TrendingUp,
  Users,
  XCircle,
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
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  payment_reference: string | null;
  payment_status: 'unpaid' | 'proof_submitted' | 'verified' | 'rejected';
  payment_proof_path: string | null;
  payment_submitted_at: string | null;
  payment_verified_at: string | null;
  payment_verified_by: string | null;
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
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(currentSession);
      setAuthLoading(false);

      if (!currentSession?.user) {
        setAdminLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', currentSession.user.id)
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

    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch admin data.';

      showToast('Sync error', message, 'error');
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
      'Logged out',
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
        'Lead deleted',
        'The lead was removed successfully.',
        'success',
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete lead.';

      showToast('Delete failed', message, 'error');
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm('Delete this order permanently?')) return;

    try {
      const { error } = await supabase.from('orders').delete().eq('id', id);

      if (error) throw error;

      setOrders((current) => current.filter((order) => order.id !== id));

      showToast(
        'Order deleted',
        'The order was removed successfully.',
        'success',
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete order.';

      showToast('Delete failed', message, 'error');
    }
  };

  const updateOrder = async (
    id: string,
    changes: Partial<Pick<Order, 'status' | 'payment_status'>>,
  ) => {
    const updateData: Record<string, unknown> = { ...changes };

    if (changes.payment_status === 'verified') {
      updateData.payment_verified_at = new Date().toISOString();
      updateData.payment_verified_by = session?.user.id ?? null;
    }

    if (changes.payment_status === 'rejected') {
      updateData.payment_verified_at = null;
      updateData.payment_verified_by = null;
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to update order:', error);
      alert(`Failed to update order: ${error.message}`);
      return;
    }

    setOrders((current) =>
      current.map((order) =>
        order.id === id ? (data as Order) : order,
      ),
    );
  };

  const viewPaymentProof = async (order: Order) => {
    if (!order.payment_proof_path) {
      alert('No payment proof has been uploaded for this order.');
      return;
    }

    const { data, error } = await supabase.storage
      .from('payment-proofs')
      .createSignedUrl(order.payment_proof_path, 300);

    if (error || !data?.signedUrl) {
      console.error('Failed to create payment proof URL:', error);
      alert(
        `Unable to open payment proof: ${
          error?.message || 'No signed URL was created.'
        }`,
      );
      return;
    }

    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  };

  const exportCSV = (
    type: 'leads' | 'orders',
    headers: string[],
    rows: (string | number)[][],
  ) => {
    if (rows.length === 0) {
      showToast(
        'Nothing to export',
        `No ${type} records are currently available.`,
        'error',
      );
      return;
    }

    const escapeCSV = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

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
    link.download = `${type}_export_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      'CSV exported',
      `Successfully exported ${rows.length} ${type} records.`,
      'success',
    );
  };

  const exportLeadsCSV = () =>
    exportCSV(
      'leads',
      [
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
      ],
      leads.map((lead) => [
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
      ]),
    );

  const exportOrdersCSV = () =>
    exportCSV(
      'orders',
      [
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
      ],
      orders.map((order) => [
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
      ]),
    );

  const totalOrderValue = useMemo(
    () =>
      orders.reduce(
        (total, order) =>
          total + (order.currency === 'NGN' ? Number(order.amount || 0) : 0),
        0,
      ),
    [orders],
  );

  const pendingOrders = orders.filter((order) =>
    ['pending', 'new', 'quote'].includes(order.status.toLowerCase()),
  ).length;

  const paidOrders = orders.filter((order) =>
    ['paid', 'completed', 'success'].includes(order.status.toLowerCase()),
  ).length;

  const activeCount = activeTab === 'leads' ? leads.length : orders.length;

  if (authLoading || adminLoading) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] px-5 py-16 text-[var(--app-text)] sm:px-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-[var(--app-muted)]">
            <RefreshCw className="h-4 w-4 animate-spin text-[var(--app-brand)]" />
            Checking secure admin access...
          </div>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <AdminLogin
        onSuccess={async () => {
          const {
            data: { session: currentSession },
          } = await supabase.auth.getSession();

          setSession(currentSession);

          if (currentSession?.user) {
            const { data, error } = await supabase
              .from('admin_users')
              .select('user_id')
              .eq('user_id', currentSession.user.id)
              .maybeSingle();

            if (error) {
              console.error('Admin membership check failed:', error);
              setIsAdmin(false);
            } else {
              setIsAdmin(Boolean(data));
            }
          } else {
            setIsAdmin(false);
          }

          setAuthLoading(false);
          setAdminLoading(false);
        }}
      />
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] px-5 py-16 text-[var(--app-text)] sm:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
          <section className="w-full rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-8 text-center shadow-xl sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
              <Shield className="h-6 w-6" />
            </div>

            <h1 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Admin access required
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--app-muted)]">
              Your Supabase account is authenticated, but it has not been
              granted administrator access.
            </p>

            <button
              onClick={handleSignOut}
              className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-5 py-3 text-sm font-bold transition hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--app-bg)] px-3 py-6 text-[var(--app-text)] sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <section className="relative overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm transition-shadow duration-300 sm:rounded-3xl sm:p-7 lg:p-8 dark:shadow-black/20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--app-brand-soft)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[var(--app-brand)]/8 blur-3xl" />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface-2)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                <Shield className="h-3 w-3" />
                Private workspace
              </div>

              <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Admin workspace
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--app-muted)]">
                Manage website enquiries, project orders and business activity
                from one secure workspace.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-[var(--app-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--app-brand)]" />
                {session.user?.email}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={fetchData}
                disabled={loadingData}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] px-4 py-3 text-sm font-extrabold shadow-sm transition hover:border-[var(--app-brand)] hover:text-[var(--app-brand)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loadingData ? 'animate-spin' : ''}`}
                />
                {loadingData ? 'Syncing...' : 'Sync data'}
              </button>

              <button
                onClick={handleSignOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] px-4 py-3 text-sm font-extrabold text-[var(--app-muted)] shadow-sm transition hover:border-rose-400/30 hover:text-rose-500"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Client leads"
            value={leads.length}
            caption="Website enquiries"
            icon={<Users className="h-5 w-5" />}
            tone="brand"
          />

          <MetricCard
            label="Project orders"
            value={orders.length}
            caption={`${pendingOrders} currently pending`}
            icon={<ShoppingBag className="h-5 w-5" />}
            tone="neutral"
          />

          <MetricCard
            label="Paid / completed"
            value={paidOrders}
            caption="Recorded successful orders"
            icon={<CheckCircle2 className="h-5 w-5" />}
            tone="brand"
          />

          <MetricCard
            label="Order value"
            value={formatMoney(totalOrderValue, 'NGN')}
            caption="NGN orders only"
            icon={<TrendingUp className="h-5 w-5" />}
            tone="neutral"
          />
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] shadow-sm sm:rounded-3xl dark:shadow-black/20">
          <div className="flex flex-col gap-4 border-b border-[var(--app-border)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--app-brand)]">
                Records
              </p>
              <h2 className="mt-1 text-lg font-extrabold">
                Business activity
              </h2>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-1 shadow-sm">
                <TabButton
                  active={activeTab === 'leads'}
                  onClick={() => setActiveTab('leads')}
                  icon={<Users className="h-3.5 w-3.5" />}
                  label="Leads"
                  count={leads.length}
                />

                <TabButton
                  active={activeTab === 'orders'}
                  onClick={() => setActiveTab('orders')}
                  icon={<ShoppingBag className="h-3.5 w-3.5" />}
                  label="Orders"
                  count={orders.length}
                />
              </div>

              <button
                onClick={
                  activeTab === 'leads' ? exportLeadsCSV : exportOrdersCSV
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] px-4 py-2.5 text-xs font-extrabold shadow-sm transition hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
              >
                <Download className="h-3.5 w-3.5" />
                Export {activeTab}
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {activeTab === 'leads' ? (
            <LeadTable leads={leads} onDelete={deleteLead} />
          ) : (
            <OrderTable
              orders={orders}
              onDelete={deleteOrder}
              onUpdate={updateOrder}
              onViewProof={viewPaymentProof}
            />
          )}

          <div className="border-t border-[var(--app-border)] px-4 py-3 text-xs text-[var(--app-muted)] sm:px-4">
            Showing {activeCount} {activeTab} record
            {activeCount === 1 ? '' : 's'}.
          </div>
        </section>
      </div>
    </main>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string | number;
  caption: string;
  icon: React.ReactNode;
  tone: 'brand' | 'neutral';
}> = ({ label, value, caption, icon, tone }) => {
  const toneClasses = {
    brand: 'bg-[var(--app-brand-soft)] text-[var(--app-brand)]',
    neutral: 'bg-[var(--app-surface-3)] text-[var(--app-text)]',
  };

  return (
    <div className="group rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--app-brand)]/30 hover:shadow-lg sm:p-5 dark:shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-[var(--app-muted)]">{label}</p>
          <p className="mt-4 break-words text-2xl font-extrabold tracking-[-0.045em] sm:text-3xl">
            {value}
          </p>
        </div>

        <div className={`rounded-2xl p-3.5 transition-transform duration-200 group-hover:scale-105 ${toneClasses[tone]}`}>{icon}</div>
      </div>

      <p className="mt-3 text-xs text-[var(--app-muted)]">{caption}</p>
    </div>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}> = ({ active, onClick, icon, label, count }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-extrabold shadow-sm transition ${
      active
        ? 'bg-[var(--app-brand)] text-white shadow-sm'
        : 'text-[var(--app-muted)] hover:text-[var(--app-text)]'
    }`}
  >
    {icon}
    {label}
    <span
      className={`rounded-full px-1.5 py-0.5 text-[10px] ${
        active
          ? 'bg-white/15 text-white'
          : 'bg-[var(--app-bg)] text-[var(--app-muted)]'
      }`}
    >
      {count}
    </span>
  </button>
);

const LeadTable: React.FC<{
  leads: Lead[];
  onDelete: (id: string) => void;
}> = ({ leads, onDelete }) => {
  if (leads.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-7 w-7" />}
        title="No leads yet"
        description="New website enquiries will appear here."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
      {leads.map((lead) => (
        <article
          key={lead.id}
          className="group flex min-w-0 flex-col rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--app-brand)]/40 hover:shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--app-brand-soft)] text-sm font-extrabold text-[var(--app-brand)]">
              {(lead.full_name || "C")
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="break-words text-sm font-extrabold text-[var(--app-text)]">
                {lead.full_name || "Unnamed client"}
              </h3>
              <p className="mt-1 break-all text-xs text-[var(--app-muted)]">
                {lead.email}
              </p>
            </div>
            <StatusBadge status={lead.status || "new"} />
          </div>

          <div className="my-5 h-px bg-[var(--app-border)]" />

          <dl className="grid grid-cols-2 gap-x-3 gap-y-4 text-xs">
            <div className="min-w-0">
              <dt className="mb-1.5 font-semibold text-[var(--app-muted)]">Service</dt>
              <dd className="break-words font-bold text-[var(--app-text)]">
                {lead.service_type || "Not specified"}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="mb-1.5 font-semibold text-[var(--app-muted)]">Budget</dt>
              <dd className="break-words font-bold text-[var(--app-text)]">
                {lead.budget || "Not specified"}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="mb-1.5 font-semibold text-[var(--app-muted)]">Phone</dt>
              <dd className="break-words font-medium text-[var(--app-text)]">
                {lead.phone || "Not provided"}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="mb-1.5 font-semibold text-[var(--app-muted)]">Received</dt>
              <dd className="break-words font-medium text-[var(--app-text)]">
                {formatDate(lead.created_at)}
              </dd>
            </div>
          </dl>

          {lead.notes && (
            <div className="mt-4 rounded-xl bg-[var(--app-surface-2)] p-3">
              <p className="mb-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--app-muted)]">
                Client notes
              </p>
              <p className="whitespace-pre-wrap break-words text-xs leading-5 text-[var(--app-text)]">
                {lead.notes}
              </p>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span className="flex min-w-0 items-center gap-1.5 text-[11px] text-[var(--app-muted)]">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{lead.email}</span>
            </span>
            <DeleteButton onClick={() => onDelete(lead.id)} />
          </div>
        </article>
      ))}
    </div>
  );
};

const OrderTable: React.FC<{
  orders: Order[];
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    changes: Partial<Pick<Order, "status" | "payment_status">>,
  ) => void;
  onViewProof: (order: Order) => void;
}> = ({ orders, onDelete, onUpdate, onViewProof }) => {
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="h-7 w-7" />}
        title="No orders yet"
        description="Project orders will appear here when submitted."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
      {orders.map((order) => (
        <article
          key={order.id}
          className="flex min-w-0 flex-col rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--app-brand)]/40 hover:shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--app-brand-soft)] text-[var(--app-brand)]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="break-words text-sm font-extrabold text-[var(--app-text)]">
                {order.client_name}
              </h3>
              <p className="mt-1 break-all text-xs text-[var(--app-muted)]">
                {order.client_email}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[var(--app-brand-soft)] p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--app-muted)]">
              Order amount
            </p>
            <p className="mt-1 break-words text-2xl font-extrabold tracking-tight text-[var(--app-brand)]">
              {formatMoney(order.amount, order.currency)}
            </p>
            <p className="mt-1 break-words text-xs text-[var(--app-muted)]">
              {order.package_name}
            </p>
          </div>

          <div className="mt-5">
            <label
              htmlFor={`order-status-${order.id}`}
              className="mb-2 block text-xs font-bold text-[var(--app-muted)]"
            >
              Order status
            </label>
            <select
              id={`order-status-${order.id}`}
              value={order.status}
              onChange={(e) =>
                onUpdate(order.id, {
                  status: e.target.value as Order["status"],
                })
              }
              className="w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2.5 text-xs font-bold text-[var(--app-text)] outline-none transition focus:border-[var(--app-brand)] focus:ring-2 focus:ring-[var(--app-brand)]/15"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="mt-4 rounded-xl border border-[var(--app-border)] p-3">
            <p className="mb-2 text-xs font-bold text-[var(--app-muted)]">Payment</p>
            <StatusBadge status={order.payment_status} />

            {order.payment_status === "proof_submitted" &&
              order.payment_proof_path && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => onViewProof(order)}
                    className="rounded-lg border border-[var(--app-border)] px-3 py-2 text-[11px] font-extrabold transition hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
                  >
                    View proof
                  </button>
                  <button
                    onClick={() =>
                      onUpdate(order.id, { payment_status: "verified" })
                    }
                    className="rounded-lg bg-[var(--app-brand)] px-3 py-2 text-[11px] font-extrabold text-white transition hover:opacity-90"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() =>
                      onUpdate(order.id, { payment_status: "rejected" })
                    }
                    className="rounded-lg border border-rose-400/40 px-3 py-2 text-[11px] font-extrabold text-rose-600 transition hover:bg-rose-500/10"
                  >
                    Reject
                  </button>
                </div>
              )}

            {order.payment_status !== "proof_submitted" &&
              order.payment_proof_path && (
                <button
                  onClick={() => onViewProof(order)}
                  className="mt-3 rounded-lg border border-[var(--app-border)] px-3 py-2 text-[11px] font-extrabold transition hover:border-[var(--app-brand)] hover:text-[var(--app-brand)]"
                >
                  View proof
                </button>
              )}
          </div>

          <dl className="mt-4 space-y-3 text-xs">
            <div className="flex items-start justify-between gap-3">
              <dt className="shrink-0 text-[var(--app-muted)]">Payment reference</dt>
              <dd className="break-all text-right font-medium text-[var(--app-text)]">
                {order.payment_reference || "Not paid"}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt className="shrink-0 text-[var(--app-muted)]">Order date</dt>
              <dd className="text-right font-medium text-[var(--app-text)]">
                {formatDate(order.created_at)}
              </dd>
            </div>
            {order.client_phone && (
              <div className="flex items-start justify-between gap-3">
                <dt className="shrink-0 text-[var(--app-muted)]">Phone</dt>
                <dd className="break-all text-right font-medium text-[var(--app-text)]">
                  {order.client_phone}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-auto flex justify-end pt-5">
            <DeleteButton onClick={() => onDelete(order.id)} />
          </div>
        </article>
      ))}
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const normalized = status.toLowerCase();

  const success = ['paid', 'completed', 'success', 'approved'].includes(
    normalized,
  );

  const danger = ['cancelled', 'canceled', 'failed', 'rejected'].includes(
    normalized,
  );

  const classes = success
    ? 'bg-[var(--app-brand-soft)] text-[var(--app-brand)]'
    : danger
      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300'
      : 'bg-[var(--app-surface-3)] text-[var(--app-text)]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold capitalize ${classes}`}
    >
      {success ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : danger ? (
        <XCircle className="h-3 w-3" />
      ) : (
        <BarChart3 className="h-3 w-3" />
      )}
      {status || 'new'}
    </span>
  );
};

const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] px-3 py-2 text-[11px] font-bold text-[var(--app-muted)] shadow-sm transition-all duration-200 hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-500"
  >
    <Trash2 className="h-3 w-3" />
    Delete
  </button>
);

const EmptyState: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="px-6 py-20 text-center text-[var(--app-muted)]">
    <div className="flex justify-center">{icon}</div>
    <p className="mt-4 text-sm font-extrabold">{title}</p>
    <p className="mt-1 text-xs">{description}</p>
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
