// ============================================
// Lead Types - Vecta CRM
// ============================================

export type LeadClassification = "cold" | "warm" | "hot" | "client" | "supplier" | "partner" | "spam" | "competitor";
export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  state?: string;
  source?: string;
  score: number;
  classification: LeadClassification;
  status: LeadStatus;
  estimated_value?: number;
  assigned_to?: string;
  assigned_name?: string;
  notes?: string;
  tags: string[];
  conversation_id?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFilters {
  search?: string;
  classification?: LeadClassification;
  status?: LeadStatus;
  assigned_to?: string;
  min_score?: number;
  max_score?: number;
  source?: string;
  tags?: string[];
  date_from?: string;
  date_to?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface CreateLeadRequest {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  state?: string;
  source?: string;
  estimated_value?: number;
  assigned_to?: string;
  notes?: string;
  tags?: string[];
}

export interface UpdateLeadRequest extends Partial<CreateLeadRequest> {
  classification?: LeadClassification;
  status?: LeadStatus;
  score?: number;
}

export interface LeadKanbanColumn {
  id: LeadStatus;
  label: string;
  leads: Lead[];
  total_value: number;
}
