"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, User, Calendar, MessageSquare, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";

// MOCK DATA
const mockColumns = [
  { id: "new", title: "Novos Leads", color: "bg-blue-500" },
  { id: "contacted", title: "Em Contato", color: "bg-yellow-500" },
  { id: "qualified", title: "Qualificados", color: "bg-purple-500" },
  { id: "proposal", title: "Proposta Enviada", color: "bg-orange-500" },
  { id: "won", title: "Venda Fechada", color: "bg-green-500" },
];

const mockLeads = [
  {
    id: "1",
    name: "João Silva",
    company: "Silva Imports",
    value: 5000,
    status: "new",
    score: 85,
    lastContact: new Date().toISOString(),
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=João Silva",
    tags: ["Prioridade", "E-commerce"],
  },
  {
    id: "2",
    name: "Maria Oliveira",
    company: "Tech Solutions",
    value: 12000,
    status: "qualified",
    score: 92,
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Maria Oliveira",
    tags: ["Enterprise"],
  },
  {
    id: "3",
    name: "Carlos Mendes",
    company: "Mendes Consultoria",
    value: 3500,
    status: "contacted",
    score: 65,
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Carlos Mendes",
    tags: ["Dúvida Plano"],
  },
  {
    id: "4",
    name: "Ana Pereira",
    company: "Loja Virtual",
    value: 8900,
    status: "proposal",
    score: 88,
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Ana Pereira",
    tags: ["Desconto Solicitado"],
  },
];

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getLeadsByStatus = (status: string) => {
    return mockLeads.filter(
      (lead) => lead.status === status && 
      (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className="space-y-6 h-[calc(100vh-theme(spacing.24))] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline de Vendas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus leads e acompanhe o funil de conversão.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar lead ou empresa..." 
              className="pl-9 bg-secondary border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0"><Filter size={18} /></Button>
          <Button className="shrink-0 shadow-lg glow-purple">
            <Plus className="mr-2 h-4 w-4" /> Novo Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 h-full min-w-max px-1">
          {mockColumns.map((col) => {
            const columnLeads = getLeadsByStatus(col.id);
            const totalValue = columnLeads.reduce((acc, lead) => acc + lead.value, 0);

            return (
              <div key={col.id} className="w-[320px] flex flex-col h-full bg-secondary/30 rounded-xl border border-border/50">
                {/* Column Header */}
                <div className="p-4 flex items-center justify-between shrink-0 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${col.color} shadow-sm`} />
                    <h3 className="font-semibold text-sm">{col.title}</h3>
                    <Badge variant="secondary" className="ml-1 text-xs">{columnLeads.length}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>

                <div className="px-4 py-2 text-xs font-medium text-muted-foreground flex justify-between shrink-0">
                  <span>Valor Estimado</span>
                  <span className="text-foreground">{formatCurrency(totalValue)}</span>
                </div>

                {/* Column Cards */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {columnLeads.map((lead) => (
                    <Card key={lead.id} className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border border-border">
                              <AvatarImage src={lead.avatar} />
                              <AvatarFallback><User size={14} /></AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-sm font-semibold leading-none">{lead.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{lead.company}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge variant="outline" className={`text-[10px] ${lead.score > 80 ? 'border-green-500/50 text-green-500 bg-green-500/10' : 'border-primary/50 text-primary bg-primary/10'}`}>
                              Score: {lead.score}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                          <div className="flex items-center gap-1 font-medium text-foreground">
                            <DollarSign size={14} className="text-muted-foreground" />
                            {formatCurrency(lead.value)}
                          </div>
                          <div className="flex items-center gap-1" title="Último contato">
                            <MessageSquare size={12} />
                            {formatRelativeTime(lead.lastContact)}
                          </div>
                        </div>

                        {lead.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {lead.tags.map(tag => (
                              <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground uppercase font-medium tracking-wider">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {columnLeads.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground/50">
                      Arrastar lead para cá
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
