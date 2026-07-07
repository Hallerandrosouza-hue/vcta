// ============================================
// WhatsApp Types - Vecta CRM
// ============================================

// IMPORTANTE (Integração Backend): Os status de conexão do WhatsApp. O backend FastAPI deve retornar exatamente estas strings.
export type ConnectionStatus = "connected" | "disconnected" | "connecting" | "qr_pending";

export interface WhatsAppConnection {
  id: string;
  number: string;
  name: string;
  photo?: string;
  status: ConnectionStatus;
  ai_agent_id?: string;
  ai_agent_name?: string;
  online_since?: string;
  last_sync?: string;
  messages_today: number;
  conversations_today: number;
  created_at: string;
  updated_at: string;
}

export interface QRCodeResponse {
  qr_code: string;
  expires_at: string;
  connection_id: string;
}

export interface ConnectWhatsAppRequest {
  name: string;
  ai_agent_id?: string;
}

export interface UpdateConnectionRequest {
  name?: string;
  ai_agent_id?: string;
}

export interface WhatsAppSyncStatus {
  connection_id: string;
  total_contacts: number;
  synced_contacts: number;
  total_messages: number;
  synced_messages: number;
  is_syncing: boolean;
  last_sync: string;
}
