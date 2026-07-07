// ============================================
// Dashboard Service - Vecta CRM
// ============================================

import api from "./api";
import type { DashboardData, DashboardStats, ChartDataPoint, SalesFunnelStage, AgentRanking, ConnectionStatusSummary } from "@/types/dashboard.types";

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    const response = await api.get<DashboardData>("/dashboard");
    return response.data;
  },

  async getStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>("/dashboard/stats");
    return response.data;
  },

  async getDailyChart(days?: number): Promise<ChartDataPoint[]> {
    const response = await api.get<ChartDataPoint[]>("/dashboard/charts/daily", {
      params: { days },
    });
    return response.data;
  },

  async getWeeklyChart(weeks?: number): Promise<ChartDataPoint[]> {
    const response = await api.get<ChartDataPoint[]>("/dashboard/charts/weekly", {
      params: { weeks },
    });
    return response.data;
  },

  async getMonthlyChart(months?: number): Promise<ChartDataPoint[]> {
    const response = await api.get<ChartDataPoint[]>("/dashboard/charts/monthly", {
      params: { months },
    });
    return response.data;
  },

  async getSalesFunnel(): Promise<SalesFunnelStage[]> {
    const response = await api.get<SalesFunnelStage[]>("/dashboard/sales-funnel");
    return response.data;
  },

  async getAgentRanking(): Promise<AgentRanking[]> {
    const response = await api.get<AgentRanking[]>("/dashboard/agent-ranking");
    return response.data;
  },

  async getConnectionStatus(): Promise<ConnectionStatusSummary[]> {
    const response = await api.get<ConnectionStatusSummary[]>("/dashboard/connection-status");
    return response.data;
  },
};
