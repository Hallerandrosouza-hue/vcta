// ============================================
// Client Service - Vecta CRM
// ============================================

import api from "./api";
import type { Client, CreateClientRequest, UpdateClientRequest, ClientFilters, ClientHistory } from "@/types/client.types";
import type { PaginatedResponse } from "@/types/tag.types";

export const clientService = {
  async getClients(filters?: ClientFilters): Promise<PaginatedResponse<Client>> {
    const response = await api.get<PaginatedResponse<Client>>("/clients", { params: filters });
    return response.data;
  },

  async getClient(id: string): Promise<Client> {
    const response = await api.get<Client>(`/clients/${id}`);
    return response.data;
  },

  async createClient(data: CreateClientRequest): Promise<Client> {
    const response = await api.post<Client>("/clients", data);
    return response.data;
  },

  async updateClient(id: string, data: UpdateClientRequest): Promise<Client> {
    const response = await api.put<Client>(`/clients/${id}`, data);
    return response.data;
  },

  async deleteClient(id: string): Promise<void> {
    await api.delete(`/clients/${id}`);
  },

  async getClientHistory(id: string, page?: number): Promise<PaginatedResponse<ClientHistory>> {
    const response = await api.get<PaginatedResponse<ClientHistory>>(`/clients/${id}/history`, {
      params: { page },
    });
    return response.data;
  },

  async exportClients(filters?: ClientFilters, format: string = "csv"): Promise<Blob> {
    const response = await api.get("/clients/export", {
      params: { ...filters, format },
      responseType: "blob",
    });
    return response.data;
  },
};
