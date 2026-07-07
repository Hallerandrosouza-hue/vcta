// ============================================
// Report Types - Vecta CRM
// ============================================

export type ReportType = "leads" | "conversions" | "response_time" | "ai" | "messages" | "team" | "whatsapp";
export type ReportPeriod = "today" | "week" | "month" | "quarter" | "year" | "custom";
export type ExportFormat = "pdf" | "csv" | "xlsx";

export interface ReportFilters {
  type: ReportType;
  period: ReportPeriod;
  date_from?: string;
  date_to?: string;
  agent_id?: string;
  connection_id?: string;
}

export interface ReportData {
  type: ReportType;
  period: ReportPeriod;
  generated_at: string;
  summary: Record<string, number>;
  chart_data: ReportChartData[];
  table_data: Record<string, unknown>[];
}

export interface ReportChartData {
  label: string;
  value: number;
  secondary_value?: number;
  color?: string;
}

export interface ExportReportRequest {
  type: ReportType;
  period: ReportPeriod;
  format: ExportFormat;
  date_from?: string;
  date_to?: string;
}
