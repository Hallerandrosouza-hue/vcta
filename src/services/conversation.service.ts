// ============================================
// Conversation Service - Vecta CRM
// ============================================

import api from "./api";
import type {
  Conversation,
  ConversationFilters,
  Message,
  SendMessageRequest,
  Contact,
  Tag,
} from "@/types/conversation.types";
import type { PaginatedResponse } from "@/types/tag.types";

export const conversationService = {
  async getConversations(filters?: ConversationFilters): Promise<PaginatedResponse<Conversation>> {
    const response = await api.get<PaginatedResponse<Conversation>>("/conversations", {
      params: filters,
    });
    return response.data;
  },

  async getConversation(id: string): Promise<Conversation> {
    const response = await api.get<Conversation>(`/conversations/${id}`);
    return response.data;
  },

  async getMessages(conversationId: string, page?: number): Promise<PaginatedResponse<Message>> {
    const response = await api.get<PaginatedResponse<Message>>(`/conversations/${conversationId}/messages`, {
      params: { page },
    });
    return response.data;
  },

  async sendMessage(data: SendMessageRequest): Promise<Message> {
    const response = await api.post<Message>(`/conversations/${data.conversation_id}/messages`, data);
    return response.data;
  },

  async markAsRead(conversationId: string): Promise<void> {
    await api.post(`/conversations/${conversationId}/read`);
  },

  async pinConversation(conversationId: string): Promise<void> {
    await api.post(`/conversations/${conversationId}/pin`);
  },

  async unpinConversation(conversationId: string): Promise<void> {
    await api.post(`/conversations/${conversationId}/unpin`);
  },

  async archiveConversation(conversationId: string): Promise<void> {
    await api.post(`/conversations/${conversationId}/archive`);
  },

  async assignConversation(conversationId: string, userId: string): Promise<void> {
    await api.post(`/conversations/${conversationId}/assign`, { user_id: userId });
  },

  // Contact
  async getContact(conversationId: string): Promise<Contact> {
    const response = await api.get<Contact>(`/conversations/${conversationId}/contact`);
    return response.data;
  },

  async updateContact(conversationId: string, data: Partial<Contact>): Promise<Contact> {
    const response = await api.put<Contact>(`/conversations/${conversationId}/contact`, data);
    return response.data;
  },

  // Tags
  async addTag(conversationId: string, tagId: string): Promise<void> {
    await api.post(`/conversations/${conversationId}/tags`, { tag_id: tagId });
  },

  async removeTag(conversationId: string, tagId: string): Promise<void> {
    await api.delete(`/conversations/${conversationId}/tags/${tagId}`);
  },

  // Notes
  async addNote(conversationId: string, note: string): Promise<void> {
    await api.post(`/conversations/${conversationId}/notes`, { note });
  },

  // Media upload
  async uploadMedia(conversationId: string, file: File): Promise<{ url: string; type: string }> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<{ url: string; type: string }>(
      `/conversations/${conversationId}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },
};
