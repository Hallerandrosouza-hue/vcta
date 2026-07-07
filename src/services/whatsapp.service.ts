// ============================================
// WhatsApp Service - Vecta CRM
// ============================================

import api from "./api";
import type {
  WhatsAppConnection,
  QRCodeResponse,
  ConnectWhatsAppRequest,
  UpdateConnectionRequest,
  WhatsAppSyncStatus,
  ConnectionStatus,
} from "@/types/whatsapp.types";
import type { PaginatedResponse } from "@/types/tag.types";

export const whatsappService = {
  async getConnections(): Promise<WhatsAppConnection[]> {
    const response = await api.get<WhatsAppConnection[]>("/whatsapp/connections");
    return response.data;
  },

  async getConnection(id: string): Promise<WhatsAppConnection> {
    const response = await api.get<WhatsAppConnection>(`/whatsapp/connections/${id}`);
    return response.data;
  },

  async createConnection(data: ConnectWhatsAppRequest): Promise<WhatsAppConnection> {
    const response = await api.post<WhatsAppConnection>("/whatsapp/connections", data);
    return response.data;
  },

  async updateConnection(id: string, data: UpdateConnectionRequest): Promise<WhatsAppConnection> {
    const response = await api.put<WhatsAppConnection>(`/whatsapp/connections/${id}`, data);
    return response.data;
  },

  async deleteConnection(id: string): Promise<void> {
    await api.delete(`/whatsapp/connections/${id}`);
  },

  async getQRCode(id: string): Promise<QRCodeResponse> {
    const response = await api.get<QRCodeResponse>(`/whatsapp/connections/${id}/qr-code`);
    return response.data;
  },

  async connect(id: string): Promise<QRCodeResponse> {
    const response = await api.post<QRCodeResponse>(`/whatsapp/connections/${id}/connect`);
    return response.data;
  },

  async disconnect(id: string): Promise<void> {
    await api.post(`/whatsapp/connections/${id}/disconnect`);
  },

  async reconnect(id: string): Promise<void> {
    await api.post(`/whatsapp/connections/${id}/reconnect`);
  },

  async getStatus(id: string): Promise<ConnectionStatus> {
    const response = await api.get<{ status: ConnectionStatus }>(`/whatsapp/connections/${id}/status`);
    return response.data.status;
  },

  async getSyncStatus(id: string): Promise<WhatsAppSyncStatus> {
    const response = await api.get<WhatsAppSyncStatus>(`/whatsapp/connections/${id}/sync`);
    return response.data;
  },
};
