// ============================================
// User Types - Vecta CRM
// ============================================

import type { UserRole } from "./auth.types";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  is_active: boolean;
  permissions: UserPermissions;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface UserPermissions {
  dashboard: boolean;
  conversations: boolean;
  leads: boolean;
  clients: boolean;
  tags: boolean;
  automations: boolean;
  ai_agents: boolean;
  whatsapp: boolean;
  reports: boolean;
  users: boolean;
  settings: boolean;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  permissions?: Partial<UserPermissions>;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  is_active?: boolean;
  permissions?: Partial<UserPermissions>;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  is_active?: boolean;
  page?: number;
  per_page?: number;
}
