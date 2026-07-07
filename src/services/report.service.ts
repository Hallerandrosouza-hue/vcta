// ============================================
// Report Service - Vecta CRM
// ============================================

import api from "./api";
import type { ReportData, ReportFilters, ExportReportRequest } from "@/types/report.types";

export const reportService = {
  async getReport(filters: ReportFilters): Promise<ReportData> {
    const response = await api.get<ReportData>("/reports", { params: filters });
    return response.data;
  },

  async exportReport(data: ExportReportRequest): Promise<Blob> {
    const response = await api.post("/reports/export", data, {
      responseType: "blob",
    });
    return response.data;
  },

  async getAvailableReports(): Promise<{ type: string; label: string; description: string }[]> {
    const response = await api.get<{ type: string; label: string; description: string }[]>("/reports/available");
    return response.data;
  },
};
