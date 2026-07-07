// ============================================
// Client Types - Vecta CRM
// ============================================

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  cpf_cnpj?: string;
  company?: string;
  city?: string;
  state?: string;
  address?: string;
  notes?: string;
  tags: string[];
  total_purchases: number;
  total_value: number;
  last_purchase?: string;
  conversation_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateClientRequest {
  name: string;
  phone: string;
  email?: string;
  cpf_cnpj?: string;
  company?: string;
  city?: string;
  state?: string;
  address?: string;
  notes?: string;
  tags?: string[];
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> {
  dummy?: string;
}

export interface ClientFilters {
  search?: string;
  city?: string;
  state?: string;
  tags?: string[];
  date_from?: string;
  date_to?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface ClientHistory {
  id: string;
  client_id: string;
  type: "message" | "purchase" | "note" | "tag" | "status_change";
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}
