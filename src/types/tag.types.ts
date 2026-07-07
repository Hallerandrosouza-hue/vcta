// ============================================
// Tag Types - Vecta CRM
// ============================================

export interface TagFilters {
  dummy?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  description?: string;
  auto_generated: boolean;
  auto_rule?: string;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTagRequest {
  name: string;
  color: string;
  description?: string;
  auto_rule?: string;
}

export interface UpdateTagRequest extends Partial<CreateTagRequest> {
  dummy?: string;
}

// ============================================
// Common / Shared Types
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface TriggerConfig {
  type: "keyword" | "intent" | "inactivity";
  value: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: string;
}
