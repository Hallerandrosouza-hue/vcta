"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { DailyChart } from "@/components/dashboard/daily-chart";
import { ConnectionStatusList } from "@/components/dashboard/connection-status";

// MOCK DATA since we don't have the backend running yet
const mockStats = {
  conversations_today: 124,
  conversations_change: 12.5,
  messages_today: 845,
  messages_change: 8.2,
  leads_total: 45,
  leads_change: 22.4,
  leads_qualified: 12,
  leads_qualified_change: 5.1,
};

const mockChartData = [
  { date: "Seg", conversations: 65, messages: 400 },
  { date: "Ter", conversations: 85, messages: 520 },
  { date: "Qua", conversations: 102, messages: 680 },
  { date: "Qui", conversations: 90, messages: 590 },
  { date: "Sex", conversations: 124, messages: 845 },
  { date: "Sáb", conversations: 45, messages: 210 },
  { date: "Dom", conversations: 30, messages: 150 },
];

const mockConnections = [
  {
    id: "1",
    name: "Suporte Principal",
    number: "+55 11 99999-9999",
    status: "connected",
    messages_today: 520,
    last_sync: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Vendas São Paulo",
    number: "+55 11 98888-8888",
    status: "connected",
    messages_today: 325,
    last_sync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "3",
    name: "Parcerias",
    number: "+55 11 97777-7777",
    status: "disconnected",
    messages_today: 0,
    last_sync: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral das suas operações de atendimento e vendas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Conversas Hoje"
          value={mockStats.conversations_today}
          change={mockStats.conversations_change}
          icon="MessageSquare"
        />
        <StatCard
          title="Mensagens Trocadas"
          value={mockStats.messages_today}
          change={mockStats.messages_change}
          icon="MessageCircle"
        />
        <StatCard
          title="Novos Leads"
          value={mockStats.leads_total}
          change={mockStats.leads_change}
          icon="UserPlus"
        />
        <StatCard
          title="Leads Qualificados"
          value={mockStats.leads_qualified}
          change={mockStats.leads_qualified_change}
          icon="CheckCircle"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <DailyChart data={mockChartData} />
        <ConnectionStatusList connections={mockConnections} />
      </div>
      
      {/* Aqui virão mais gráficos na Fase 2: Funil de Vendas e Ranking de Agentes */}
    </div>
  );
}
