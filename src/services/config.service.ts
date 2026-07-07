// ============================================
// Config Service - Vecta CRM
// ============================================

import api from "./api";
import type {
  AppConfig,
  CompanyConfig,
  ThemeConfig,
  LanguageConfig,
  APIConfig,
  NotificationConfig,
  LogEntry,
} from "@/types/config.types";
import type { PaginatedResponse } from "@/types/tag.types";

export const configService = {
  async getConfig(): Promise<AppConfig> {
    const response = await api.get<AppConfig>("/config");
    return response.data;
  },

  // Company
  async getCompanyConfig(): Promise<CompanyConfig> {
    const response = await api.get<CompanyConfig>("/config/company");
    return response.data;
  },

  async updateCompanyConfig(data: Partial<CompanyConfig>): Promise<CompanyConfig> {
    const response = await api.put<CompanyConfig>("/config/company", data);
    return response.data;
  },

  // Theme
  async getThemeConfig(): Promise<ThemeConfig> {
    const response = await api.get<ThemeConfig>("/config/theme");
    return response.data;
  },

  async updateThemeConfig(data: Partial<ThemeConfig>): Promise<ThemeConfig> {
    const response = await api.put<ThemeConfig>("/config/theme", data);
    return response.data;
  },

  // Language
  async getLanguageConfig(): Promise<LanguageConfig> {
    const response = await api.get<LanguageConfig>("/config/language");
    return response.data;
  },

  async updateLanguageConfig(data: Partial<LanguageConfig>): Promise<LanguageConfig> {
    const response = await api.put<LanguageConfig>("/config/language", data);
    return response.data;
  },

  // API
  async getAPIConfig(): Promise<APIConfig> {
    const response = await api.get<APIConfig>("/config/api");
    return response.data;
  },

  async updateAPIConfig(data: Partial<APIConfig>): Promise<APIConfig> {
    const response = await api.put<APIConfig>("/config/api", data);
    return response.data;
  },

  // Notifications
  async getNotificationConfig(): Promise<NotificationConfig> {
    const response = await api.get<NotificationConfig>("/config/notifications");
    return response.data;
  },

  async updateNotificationConfig(data: Partial<NotificationConfig>): Promise<NotificationConfig> {
    const response = await api.put<NotificationConfig>("/config/notifications", data);
    return response.data;
  },

  // Logs
  async getLogs(page?: number, level?: string): Promise<PaginatedResponse<LogEntry>> {
    const response = await api.get<PaginatedResponse<LogEntry>>("/config/logs", {
      params: { page, level },
    });
    return response.data;
  },
};
