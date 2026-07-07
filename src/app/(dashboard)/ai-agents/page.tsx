"use client";

import { useState } from "react";
import { Bot, Plus, Settings, Volume2, Database, MessageSquare, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockAgents = [
  { id: "1", name: "Suporte Técnico", status: "active", whatsapp_id: "1", role: "Responder dúvidas técnicas e solucionar problemas de acesso." },
  { id: "2", name: "Vendas V1", status: "active", whatsapp_id: "2", role: "Qualificar leads e realizar agendamento de reuniões comerciais." },
  { id: "3", name: "Triagem", status: "inactive", whatsapp_id: null, role: "Apenas coletar nome, email e transferir para o setor responsável." },
];

export default function AiAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState(mockAgents[0]);

  return (
    <div className="space-y-6 h-[calc(100vh-theme(spacing.24))] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agentes de IA</h1>
          <p className="text-muted-foreground mt-1">
            Configure o comportamento, tom de voz e base de conhecimento dos seus assistentes.
          </p>
        </div>
        <Button className="shrink-0 shadow-lg glow-purple">
          <Plus className="mr-2 h-4 w-4" /> Novo Agente
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        {/* Left column: Agent List */}
        <div className="w-full lg:w-[350px] flex flex-col gap-4 shrink-0 overflow-y-auto">
          {mockAgents.map(agent => (
            <Card 
              key={agent.id} 
              className={`cursor-pointer transition-all ${selectedAgent.id === agent.id ? 'border-primary shadow-md bg-secondary/20' : 'hover:border-primary/50'}`}
              onClick={() => setSelectedAgent(agent)}
            >
              <CardContent className="p-4 flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${agent.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                  <Bot size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold truncate pr-2">{agent.name}</h3>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${agent.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-muted'}`} />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{agent.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right column: Agent Config */}
        <Card className="flex-1 border-border/50 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedAgent.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={selectedAgent.status === 'active' ? 'text-green-500 border-green-500/30' : 'text-muted-foreground'}>
                    {selectedAgent.status === 'active' ? 'Ativo e Operando' : 'Inativo'}
                  </Badge>
                  {selectedAgent.whatsapp_id && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      Conectado ao WhatsApp 
                      <Badge variant="secondary" className="text-[10px]">Suporte Principal</Badge>
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                <Trash2 size={16} className="mr-2" /> Excluir
              </Button>
              <Button size="sm">
                <Save size={16} className="mr-2" /> Salvar
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl space-y-8">
              
              {/* Identidade e Papel */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings size={18} className="text-primary" /> Identidade e Papel
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome do Agente</label>
                    <Input defaultValue={selectedAgent.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instrução do Sistema (System Prompt)</label>
                    <textarea 
                      className="w-full h-32 p-3 rounded-md bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      defaultValue={`Você é o ${selectedAgent.name}. Seu papel principal é: ${selectedAgent.role}\n\nRegras:\n1. Responda de forma clara e objetiva.\n2. Nunca ofereça descontos que não estão na base de conhecimento.\n3. Se não souber a resposta, peça para aguardar um atendente humano.`}
                    />
                  </div>
                </div>
              </section>

              {/* Tom de Voz */}
              <section className="space-y-4 pt-4 border-t border-border/50">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Volume2 size={18} className="text-primary" /> Tom de Voz
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estilo de Comunicação</label>
                    <Select defaultValue="professional">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Profissional e Direto</SelectItem>
                        <SelectItem value="friendly">Amigável e Empático</SelectItem>
                        <SelectItem value="persuasive">Persuasivo (Focado em Vendas)</SelectItem>
                        <SelectItem value="fun">Descontraído (Usa emojis)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tamanho Médio das Respostas</label>
                    <Select defaultValue="short">
                      <SelectTrigger>
                        <SelectValue placeholder="Tamanho da resposta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Curtas (1-2 parágrafos)</SelectItem>
                        <SelectItem value="medium">Médias (bem explicativas)</SelectItem>
                        <SelectItem value="long">Longas (Detalhadas)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              {/* Base de Conhecimento */}
              <section className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Database size={18} className="text-primary" /> Base de Conhecimento
                  </h3>
                  <Button variant="outline" size="sm">
                    <Plus size={14} className="mr-1" /> Adicionar Arquivo
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 border border-border rounded-lg bg-background flex items-start justify-between group">
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">PDF</div>
                      <div>
                        <p className="text-sm font-medium">manual_produto_v2.pdf</p>
                        <p className="text-xs text-muted-foreground">Sincronizado há 2 dias</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100"><Trash2 size={14}/></Button>
                  </div>
                  
                  <div className="p-3 border border-border rounded-lg bg-background flex items-start justify-between group">
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded bg-green-500/10 text-green-500 flex items-center justify-center font-bold text-xs shrink-0">TXT</div>
                      <div>
                        <p className="text-sm font-medium">faq_perguntas_frequentes.txt</p>
                        <p className="text-xs text-muted-foreground">Sincronizado hoje</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100"><Trash2 size={14}/></Button>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
