// ============================================
// Tag Service - Vecta CRM
// ============================================

import api from "./api";
import type { Tag, CreateTagRequest, UpdateTagRequest } from "@/types/tag.types";

export const tagService = {
  async getTags(): Promise<Tag[]> {
    const response = await api.get<Tag[]>("/tags");
    return response.data;
  },

  async getTag(id: string): Promise<Tag> {
    const response = await api.get<Tag>(`/tags/${id}`);
    return response.data;
  },

  async createTag(data: CreateTagRequest): Promise<Tag> {
    const response = await api.post<Tag>("/tags", data);
    return response.data;
  },

  async updateTag(id: string, data: UpdateTagRequest): Promise<Tag> {
    const response = await api.put<Tag>(`/tags/${id}`, data);
    return response.data;
  },

  async deleteTag(id: string): Promise<void> {
    await api.delete(`/tags/${id}`);
  },
};
