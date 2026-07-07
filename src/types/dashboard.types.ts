// ============================================
// Dashboard Types - Vecta CRM
// ============================================

export interface DashboardStats {
  conversations_today: number;
  conversations_change: number;
  messages_today: number;
  messages_change: number;
  leads_total: number;
  leads_change: number;
  leads_qualified: number;
  leads_qualified_change: number;
  clients_total: number;
  clients_change: number;
  conversions: number;
  conversions_change: number;
  avg_response_time: number;
  avg_response_time_change: number;
}

export interface ChartDataPoint {
  date: string;
  label: string;
  conversations: number;
  messages: number;
  leads: number;
  conversions: number;
}

export interface SalesFunnelStage {
  stage: string;
  count: number;
  value: number;
  percentage: number;
  color: string;
}

export interface AgentRanking {
  id: string;
  name: string;
  avatar?: string;
  conversations: number;
  messages: number;
  avg_response_time: number;
  satisfaction: number;
  conversions: number;
}

export interface ConnectionStatusSummary {
  id: string;
  name: string;
  number: string;
  status: string;
  messages_today: number;
  last_sync?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  daily_chart: ChartDataPoint[];
  weekly_chart: ChartDataPoint[];
  monthly_chart: ChartDataPoint[];
  sales_funnel: SalesFunnelStage[];
  agent_ranking: AgentRanking[];
  connection_status: ConnectionStatusSummary[];
}
