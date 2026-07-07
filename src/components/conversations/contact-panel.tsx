"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Sparkles, BrainCircuit, User, Phone, Briefcase, Tag as TagIcon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="w-full md:w-[320px] lg:w-[380px] h-full border-l border-border bg-card flex flex-col flex-shrink-0 animate-slide-in-right">
      <div className="h-16 px-4 flex items-center justify-between border-b border-border shrink-0">
        <h2 className="font-semibold flex items-center gap-2">
          <User size={18} /> Detalhes do Contato
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          <X size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Contact Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=João Silva" />
              <AvatarFallback className="text-2xl">JS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">João Silva</h3>
              <p className="text-muted-foreground text-sm flex items-center justify-center gap-1 mt-1">
                <Phone size={14} /> +55 11 98765-4321
              </p>
            </div>
          </div>

          {/* AI Analysis Panel */}
          <Card className="border-primary/30 bg-primary/5 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                <BrainCircuit size={16} /> Análise da IA
                <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary text-[10px]">Ao vivo</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Lead Score</span>
                  <span className="font-bold text-primary">85/100</span>
                </div>
                <Progress value={85} className="h-2 bg-primary/20" />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-background rounded-md p-2 border border-border">
                  <span className="text-muted-foreground block mb-0.5">Sentimento</span>
                  <span className="font-medium text-green-500 flex items-center gap-1">😊 Positivo</span>
                </div>
                <div className="bg-background rounded-md p-2 border border-border">
                  <span className="text-muted-foreground block mb-0.5">Urgência</span>
                  <span className="font-medium text-orange-500">🔥 Alta</span>
                </div>
                <div className="bg-background rounded-md p-2 border border-border col-span-2">
                  <span className="text-muted-foreground block mb-0.5">Intenção</span>
                  <span className="font-medium">Deseja assinar Plano Pro hoje.</span>
                </div>
              </div>

              <div className="bg-accent/30 rounded-md p-3 text-sm border border-primary/20">
                <span className="font-semibold text-primary flex items-center gap-1 mb-1">
                  <Sparkles size={14} /> Recomendação
                </span>
                <p>Envie o link de checkout do Plano Pro com cupom de 10% para fechar agora.</p>
              </div>
            </CardContent>
          </Card>

          {/* CRM Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Informações CRM</h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <Briefcase size={16} />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Empresa</p>
                  <p className="font-medium">Não informada</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <TagIcon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs mb-1">Etiquetas</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-blue-500 border-blue-500/30 bg-blue-500/10">Novo Lead</Badge>
                    <Badge variant="outline" className="text-red-500 border-red-500/30 bg-red-500/10">Quente</Badge>
                    <Badge variant="outline" className="border-dashed cursor-pointer hover:bg-secondary">
                      + Adicionar
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            <Button variant="outline" className="w-full justify-between">
              Criar Tarefa <ChevronRight size={16} className="text-muted-foreground" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Ver Histórico Completo <ChevronRight size={16} className="text-muted-foreground" />
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
