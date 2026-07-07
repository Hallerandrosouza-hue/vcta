// ============================================
// Users Service - Vecta CRM
// ============================================

import api from "./api";
import type { UserAccount, CreateUserRequest, UpdateUserRequest, UserFilters } from "@/types/user.types";
import type { PaginatedResponse } from "@/types/tag.types";

export const usersService = {
  async getUsers(filters?: UserFilters): Promise<PaginatedResponse<UserAccount>> {
    const response = await api.get<PaginatedResponse<UserAccount>>("/users", { params: filters });
    return response.data;
  },

  async getUser(id: string): Promise<UserAccount> {
    const response = await api.get<UserAccount>(`/users/${id}`);
    return response.data;
  },

  async createUser(data: CreateUserRequest): Promise<UserAccount> {
    const response = await api.post<UserAccount>("/users", data);
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<UserAccount> {
    const response = await api.put<UserAccount>(`/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async activateUser(id: string): Promise<void> {
    await api.post(`/users/${id}/activate`);
  },

  async deactivateUser(id: string): Promise<void> {
    await api.post(`/users/${id}/deactivate`);
  },

  async resetUserPassword(id: string): Promise<void> {
    await api.post(`/users/${id}/reset-password`);
  },
};
