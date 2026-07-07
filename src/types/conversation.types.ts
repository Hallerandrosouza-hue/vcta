// ============================================
// Conversation Types - Vecta CRM
// ============================================

export type MessageType = "text" | "audio" | "image" | "video" | "document" | "sticker" | "location";
export type MessageStatus = "sent" | "delivered" | "read" | "failed";
export type MessageSender = "user" | "contact" | "ai" | "system";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  company?: string;
  city?: string;
  state?: string;
  notes?: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  auto_generated?: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  sender: MessageSender;
  sender_name?: string;
  media_url?: string;
  media_mime_type?: string;
  media_filename?: string;
  reply_to?: string;
  timestamp: string;
  is_forwarded?: boolean;
}

export interface Conversation {
  id: string;
  contact: Contact;
  whatsapp_connection_id: string;
  last_message?: Message;
  unread_count: number;
  is_pinned: boolean;
  is_archived: boolean;
  is_muted: boolean;
  tags: Tag[];
  assigned_to?: string;
  assigned_name?: string;
  ai_analysis?: AIConversationAnalysis;
  status: "open" | "closed" | "pending";
  created_at: string;
  updated_at: string;
}

export interface AIConversationAnalysis {
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
  intent: string;
  interest: string;
  product: string;
  purchase_chance: number;
  urgency: "low" | "medium" | "high" | "critical";
  next_step: string;
  lead_score: number;
  classification: string;
  auto_tags: string[];
  analyzed_at: string;
}

export interface ConversationFilters {
  search?: string;
  tags?: string[];
  status?: string;
  assigned_to?: string;
  is_pinned?: boolean;
  is_archived?: boolean;
  whatsapp_connection_id?: string;
  page?: number;
  per_page?: number;
}

export interface SendMessageRequest {
  conversation_id: string;
  content: string;
  type: MessageType;
  media_url?: string;
  reply_to?: string;
}
