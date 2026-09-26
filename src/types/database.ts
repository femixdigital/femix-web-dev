export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type CurrencyCode = 'USD' | 'NGN';

export interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  service_type: string;
  budget?: string | null;
  notes?: string | null;
  status: LeadStatus;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  lead_id?: string | null;
  package_name: string;
  amount: number;
  currency: CurrencyCode;
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  status: OrderStatus;
  payment_reference?: string | null;
  requirements?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  summary: string;
  content: string;
  tech_stack: string[];
  featured_image?: string | null;
  demo_url?: string | null;
  is_published: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}
