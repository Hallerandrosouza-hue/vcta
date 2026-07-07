"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";

interface ChartDataPoint {
  date: string;
  conversations: number;
  messages: number;
}

interface DailyChartProps {
  data: ChartDataPoint[];
}

export function DailyChart({ data }: DailyChartProps) {
  const { theme } = useTheme();
  
  const colors = {
    conversations: {
      stroke: "#7c3aed",
      fill: "url(#colorConversations)"
    },
    messages: {
      stroke: "#10b981",
      fill: "url(#colorMessages)"
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-4 border-border/50">
      <CardHeader>
        <CardTitle>Volume Diário</CardTitle>
        <CardDescription>
          Comparativo de novas conversas e mensagens nos últimos 7 dias.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#0f0f13' : '#ffffff',
                  borderColor: theme === 'dark' ? '#27272a' : '#e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="messages"
                name="Mensagens"
                stroke={colors.messages.stroke}
                strokeWidth={2}
                fillOpacity={1}
                fill={colors.messages.fill}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                name="Conversas"
                stroke={colors.conversations.stroke}
                strokeWidth={2}
                fillOpacity={1}
                fill={colors.conversations.fill}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
