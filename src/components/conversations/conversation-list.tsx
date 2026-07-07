"use client";

import { useState } from "react";
import { Search, Filter, Hash, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatRelativeTime } from "@/lib/utils";

interface ConversationListProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
}

// MOCK DATA
const mockConversations = [
  {
    id: "1",
    name: "João Silva",
    lastMessage: "Gostaria de saber mais sobre os planos",
    time: new Date().toISOString(),
    unread: 2,
    tags: [{ name: "Novo Lead", color: "bg-blue-500" }],
    isOnline: true,
  },
  {
    id: "2",
    name: "Maria Oliveira",
    lastMessage: "Perfeito, vou assinar o plano Anual.",
    time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unread: 0,
    tags: [{ name: "Cliente", color: "bg-green-500" }, { name: "VIP", color: "bg-purple-500" }],
    isOnline: false,
  },
  {
    id: "3",
    name: "Carlos Mendes (Empresa XYZ)",
    lastMessage: "Pode me enviar a proposta em PDF?",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unread: 1,
    tags: [{ name: "Negociação", color: "bg-orange-500" }],
    isOnline: true,
  },
  {
    id: "4",
    name: "Ana Pereira",
    lastMessage: "Obrigada pelo suporte!",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unread: 0,
    tags: [{ name: "Suporte", color: "bg-gray-500" }],
    isOnline: false,
  },
];

export function ConversationList({ onSelect, selectedId }: ConversationListProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col h-full border-r border-border bg-card w-full max-w-[350px] xl:max-w-[400px]">
      {/* Header & Search */}
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight">Conversas</h2>
          <div className="flex gap-2 text-muted-foreground">
            <button className="p-1.5 hover:bg-secondary rounded-md transition-colors"><Filter size={18} /></button>
            <button className="p-1.5 hover:bg-secondary rounded-md transition-colors"><MoreVertical size={18} /></button>
          </div>
        </div>
        
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ou começar nova conversa" 
            className="pl-9 bg-secondary border-none"
          />
        </div>

        {/* Quick filters / Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer whitespace-nowrap">Todas</Badge>
          <Badge variant="secondary" className="cursor-pointer whitespace-nowrap">Não lidas</Badge>
          <Badge variant="secondary" className="cursor-pointer whitespace-nowrap">Grupos</Badge>
          <Badge variant="secondary" className="cursor-pointer whitespace-nowrap">IA Ativa</Badge>
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {mockConversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={cn(
                "flex items-start gap-3 p-4 border-b border-border/50 text-left transition-colors hover:bg-secondary/50",
                selectedId === chat.id ? "bg-secondary" : ""
              )}
            >
              <div className="relative flex-shrink-0">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${chat.name}`} />
                  <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-sm truncate pr-2">{chat.name}</h3>
                  <span className={cn(
                    "text-xs flex-shrink-0",
                    chat.unread > 0 ? "text-primary font-medium" : "text-muted-foreground"
                  )}>
                    {formatRelativeTime(chat.time)}
                  </span>
                </div>
                
                <p className={cn(
                  "text-sm truncate",
                  chat.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {chat.lastMessage}
                </p>

                <div className="flex gap-1 mt-2 overflow-hidden">
                  {chat.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={cn("text-[10px] px-1.5 py-0.5 rounded-sm bg-opacity-20 flex-shrink-0", tag.color.replace('bg-', 'text-'))}
                      style={{ backgroundColor: `var(--color-${tag.color.replace('bg-', '')}-500, rgba(124, 58, 237, 0.1))` }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {chat.unread > 0 && (
                <div className="flex-shrink-0 mt-6">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {chat.unread}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
