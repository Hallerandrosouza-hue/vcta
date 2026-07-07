"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// MOCK DATA
const volumeData = [
  { date: "Seg", conversas: 65, leads: 12 },
  { date: "Ter", conversas: 85, leads: 18 },
  { date: "Qua", conversas: 102, leads: 24 },
  { date: "Qui", conversas: 90, leads: 15 },
  { date: "Sex", conversas: 124, leads: 30 },
  { date: "Sáb", conversas: 45, leads: 5 },
  { date: "Dom", conversas: 30, leads: 2 },
];

const teamPerformanceData = [
  { name: "Agente Vendas IA", fechamentos: 45, tempoMedio: 2 },
  { name: "Suporte Técnico", fechamentos: 0, tempoMedio: 1.5 },
  { name: "Triagem", fechamentos: 10, tempoMedio: 0.5 },
];

export default function ReportsPage() {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground mt-1">
            Métricas avançadas sobre conversões, atendimento e performance da Inteligência Artificial.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="shrink-0">
            <CalendarIcon className="mr-2 h-4 w-4" /> Últimos 7 dias
          </Button>
          <Button className="shrink-0 shadow-sm">
            <Download className="mr-2 h-4 w-4" /> Exportar PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24.5%</div>
            <p className="text-xs text-green-500 mt-1">+4.1% que a semana anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio de Resposta (IA)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.2s</div>
            <p className="text-xs text-green-500 mt-1">-0.3s que a semana anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Satisfação Estimada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground mt-1">Baseado em análise de sentimento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Economia Estimada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">R$ 4.250</div>
            <p className="text-xs text-muted-foreground mt-1">Horas humanas economizadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Volume de Atendimento vs Leads Gerados</CardTitle>
            <CardDescription>Correlação entre conversas e leads qualificados.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorConversas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#0f0f13' : '#ffffff', borderColor: theme === 'dark' ? '#27272a' : '#e5e7eb', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="conversas" name="Conversas" stroke="#7c3aed" strokeWidth={2} fill="url(#colorConversas)" />
                  <Area type="monotone" dataKey="leads" name="Leads" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Performance por Agente de IA</CardTitle>
            <CardDescription>Quantidade de negócios fechados / leads qualificados por agente.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip cursor={{ fill: theme === 'dark' ? '#27272a' : '#f3f4f6' }} contentStyle={{ backgroundColor: theme === 'dark' ? '#0f0f13' : '#ffffff', borderColor: theme === 'dark' ? '#27272a' : '#e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="fechamentos" name="Conversões" fill="#7c3aed" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
