// ============================================
// Lead Service - Vecta CRM
// ============================================

import api from "./api";
import type {
  Lead,
  LeadFilters,
  CreateLeadRequest,
  UpdateLeadRequest,
  LeadKanbanColumn,
} from "@/types/lead.types";
import type { PaginatedResponse } from "@/types/tag.types";

export const leadService = {
  async getLeads(filters?: LeadFilters): Promise<PaginatedResponse<Lead>> {
    const response = await api.get<PaginatedResponse<Lead>>("/leads", { params: filters });
    return response.data;
  },

  async getLead(id: string): Promise<Lead> {
    const response = await api.get<Lead>(`/leads/${id}`);
    return response.data;
  },

  async createLead(data: CreateLeadRequest): Promise<Lead> {
    const response = await api.post<Lead>("/leads", data);
    return response.data;
  },

  async updateLead(id: string, data: UpdateLeadRequest): Promise<Lead> {
    const response = await api.put<Lead>(`/leads/${id}`, data);
    return response.data;
  },

  async deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },

  async getKanban(): Promise<LeadKanbanColumn[]> {
    const response = await api.get<LeadKanbanColumn[]>("/leads/kanban");
    return response.data;
  },

  async updateLeadStatus(id: string, status: string): Promise<Lead> {
    const response = await api.patch<Lead>(`/leads/${id}/status`, { status });
    return response.data;
  },

  async bulkUpdateStatus(ids: string[], status: string): Promise<void> {
    await api.post("/leads/bulk/status", { ids, status });
  },

  async exportLeads(filters?: LeadFilters, format: string = "csv"): Promise<Blob> {
    const response = await api.get("/leads/export", {
      params: { ...filters, format },
      responseType: "blob",
    });
    return response.data;
  },
};
