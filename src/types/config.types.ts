// ============================================
// Config Types - Vecta CRM
// ============================================

export interface CompanyConfig {
  name: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  timezone: string;
}

export interface ThemeConfig {
  mode: "light" | "dark" | "system";
  primary_color: string;
  accent_color: string;
}

export interface LanguageConfig {
  language: string;
  date_format: string;
  currency: string;
}

export interface APIConfig {
  python_api_url: string;
  python_api_key?: string;
  timeout: number;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  status: "connected" | "disconnected" | "error";
}

export interface NotificationConfig {
  email_notifications: boolean;
  push_notifications: boolean;
  sound_enabled: boolean;
  new_message: boolean;
  new_lead: boolean;
  lead_qualified: boolean;
  connection_lost: boolean;
}

export interface LogEntry {
  id: string;
  level: "info" | "warning" | "error";
  message: string;
  source: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface AppConfig {
  company: CompanyConfig;
  theme: ThemeConfig;
  language: LanguageConfig;
  api: APIConfig;
  database: DatabaseConfig;
  notifications: NotificationConfig;
}
