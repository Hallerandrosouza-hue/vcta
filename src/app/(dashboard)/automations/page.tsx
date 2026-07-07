"use client";

import { useState } from "react";
import { Plus, Play, Pause, Settings, MoreVertical, Zap, Clock, MessageSquare, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// MOCK DATA
const mockAutomations = [
  { id: "1", name: "Mensagem de Boas-vindas", status: "active", trigger: "Novo Lead via WhatsApp", action: "Enviar mensagem modelo 'Bem-vindo'", runs: 1245 },
  { id: "2", name: "Lembrete de Reunião", status: "active", trigger: "24h antes da reunião", action: "Enviar mensagem de confirmação", runs: 342 },
  { id: "3", name: "Recuperação de Inativos", status: "paused", trigger: "Sem resposta por 7 dias", action: "Enviar promoção de desconto", runs: 0 },
];

export default function AutomationsPage() {
  const [selectedAutomation, setSelectedAutomation] = useState(mockAutomations[0]);

  return (
    <div className="space-y-6 h-[calc(100vh-theme(spacing.24))] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automações</h1>
          <p className="text-muted-foreground mt-1">
            Crie fluxos automatizados para economizar tempo e engajar seus leads.
          </p>
        </div>
        <Button className="shrink-0 shadow-lg glow-purple">
          <Plus className="mr-2 h-4 w-4" /> Novo Fluxo
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        {/* Left Column: Automation List */}
        <div className="w-full lg:w-[350px] flex flex-col gap-4 shrink-0 overflow-y-auto">
          {mockAutomations.map(auto => (
            <Card 
              key={auto.id} 
              className={`cursor-pointer transition-all ${selectedAutomation.id === auto.id ? 'border-primary shadow-md bg-secondary/20' : 'hover:border-primary/50'}`}
              onClick={() => setSelectedAutomation(auto)}
            >
              <CardContent className="p-4 flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${auto.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                  <Zap size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold truncate pr-2">{auto.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{auto.trigger}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column: Automation Builder / Viewer */}
        <Card className="flex-1 border-border/50 flex flex-col overflow-hidden bg-secondary/5 relative">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")` }} 
          />
          
          <div className="p-6 border-b border-border bg-card/80 backdrop-blur-sm flex justify-between items-center shrink-0 z-10">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {selectedAutomation.name}
                <Badge variant={selectedAutomation.status === 'active' ? 'default' : 'secondary'}>
                  {selectedAutomation.status === 'active' ? 'Ativo' : 'Pausado'}
                </Badge>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Executado {selectedAutomation.runs} vezes</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className={selectedAutomation.status === 'active' ? 'text-orange-500 hover:text-orange-600' : 'text-green-500 hover:text-green-600'}>
                {selectedAutomation.status === 'active' ? <><Pause size={16} className="mr-2"/> Pausar</> : <><Play size={16} className="mr-2"/> Ativar</>}
              </Button>
              <Button size="icon" variant="ghost"><MoreVertical size={16}/></Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 flex flex-col items-center justify-start gap-6 z-10">
            {/* Trigger Node */}
            <div className="w-[300px] bg-card border border-border rounded-xl shadow-sm p-4 relative group hover:border-primary/50 transition-colors">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                <Zap size={16} />
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" className="h-6 w-6"><Settings size={12}/></Button>
              </div>
              <h4 className="font-semibold text-sm mb-1 ml-4 text-blue-500 uppercase tracking-wider">Gatilho (Quando)</h4>
              <p className="text-sm">{selectedAutomation.trigger}</p>
            </div>

            {/* Connection Arrow */}
            <div className="h-8 border-l-2 border-dashed border-border flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-muted-foreground z-10 border border-border mt-4">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>

            {/* Condition Node (Mocked for visual complexity) */}
            <div className="w-[300px] bg-card border border-border rounded-xl shadow-sm p-4 relative group hover:border-primary/50 transition-colors">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
                <Clock size={16} />
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" className="h-6 w-6"><Settings size={12}/></Button>
              </div>
              <h4 className="font-semibold text-sm mb-1 ml-4 text-orange-500 uppercase tracking-wider">Condição (Se)</h4>
              <p className="text-sm">Lead não foi contatado nos últimos 5 minutos</p>
            </div>

            {/* Connection Arrow */}
            <div className="h-8 border-l-2 border-dashed border-border flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-muted-foreground z-10 border border-border mt-4">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>

            {/* Action Node */}
            <div className="w-[300px] bg-card border border-border rounded-xl shadow-sm p-4 relative group hover:border-primary/50 transition-colors">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md">
                <MessageSquare size={16} />
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" className="h-6 w-6"><Settings size={12}/></Button>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive hover:text-destructive"><Trash2 size={12}/></Button>
              </div>
              <h4 className="font-semibold text-sm mb-1 ml-4 text-green-500 uppercase tracking-wider">Ação (Então)</h4>
              <p className="text-sm">{selectedAutomation.action}</p>
            </div>

            <Button variant="outline" className="mt-4 border-dashed border-2 hover:bg-secondary rounded-full w-12 h-12 p-0 flex items-center justify-center">
              <Plus size={24} className="text-muted-foreground" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
