// ============================================
// Automation Service - Vecta CRM
// ============================================

import api from "./api";
import type { Automation, CreateAutomationRequest, UpdateAutomationRequest } from "@/types/automation.types";

export const automationService = {
  async getAutomations(): Promise<Automation[]> {
    const response = await api.get<Automation[]>("/automations");
    return response.data;
  },

  async getAutomation(id: string): Promise<Automation> {
    const response = await api.get<Automation>(`/automations/${id}`);
    return response.data;
  },

  async createAutomation(data: CreateAutomationRequest): Promise<Automation> {
    const response = await api.post<Automation>("/automations", data);
    return response.data;
  },

  async updateAutomation(id: string, data: UpdateAutomationRequest): Promise<Automation> {
    const response = await api.put<Automation>(`/automations/${id}`, data);
    return response.data;
  },

  async deleteAutomation(id: string): Promise<void> {
    await api.delete(`/automations/${id}`);
  },

  async activateAutomation(id: string): Promise<void> {
    await api.post(`/automations/${id}/activate`);
  },

  async deactivateAutomation(id: string): Promise<void> {
    await api.post(`/automations/${id}/deactivate`);
  },

  async executeAutomation(id: string): Promise<void> {
    await api.post(`/automations/${id}/execute`);
  },
};
