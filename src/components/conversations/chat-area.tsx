"use client";

import { useState } from "react";
import { Search, MoreVertical, Paperclip, Mic, Smile, Send, Check, CheckCheck, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatAreaProps {
  conversationId: string | null;
  onToggleContactPanel: () => void;
}

// MOCK DATA
const mockMessages = [
  { id: "1", text: "Olá! Gostaria de saber mais sobre os planos do Vecta.", sender: "contact", time: "10:30", status: "read" },
  { id: "2", text: "Olá João! Tudo bem? Claro, vou te passar as informações.", sender: "user", time: "10:32", status: "read" },
  { id: "3", text: "Temos 3 planos principais: Básico, Pro e Enterprise. O plano Pro é o mais escolhido por ter a IA ilimitada.", sender: "user", time: "10:33", status: "read" },
  { id: "4", text: "A IA consegue analisar os leads automaticamente?", sender: "contact", time: "10:35", status: "read" },
  { id: "5", text: "Exatamente! Ela lê as mensagens e já atribui um Lead Score e etiquetas automáticas.", sender: "ai", time: "10:35", status: "delivered" },
  { id: "6", text: "Que legal! Qual o valor do Pro?", sender: "contact", time: "10:38", status: "read" },
];

export function ChatArea({ conversationId, onToggleContactPanel }: ChatAreaProps) {
  const [inputText, setInputText] = useState("");

  if (!conversationId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <Bot size={48} />
        </div>
        <h2 className="text-2xl font-bold">Vecta Web</h2>
        <p className="text-muted-foreground mt-2 max-w-md text-center">
          Selecione uma conversa para começar a enviar mensagens. 
          Suas mensagens serão processadas e analisadas pela nossa IA em tempo real.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background relative overflow-hidden">
      {/* Chat Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      {/* Header */}
      <div className="h-16 px-6 py-3 border-b border-border bg-card flex items-center justify-between z-10 shrink-0 shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onToggleContactPanel}
        >
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=João Silva" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">João Silva</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Online agora
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
            <Search size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground rounded-full lg:hidden"
            onClick={onToggleContactPanel}
          >
            <MoreVertical size={20} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {/* Date separator */}
          <div className="flex justify-center my-2">
            <span className="bg-secondary text-muted-foreground text-xs font-medium px-3 py-1 rounded-md shadow-sm">
              Hoje
            </span>
          </div>

          {mockMessages.map((msg) => {
            const isMe = msg.sender === "user" || msg.sender === "ai";
            const isAI = msg.sender === "ai";

            return (
              <div key={msg.id} className={cn("flex max-w-[80%]", isMe ? "ml-auto" : "mr-auto")}>
                <div className={cn(
                  "p-3 rounded-2xl relative shadow-sm",
                  isMe ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border/50 rounded-tl-sm",
                  isAI && "bg-gradient-to-r from-primary to-accent border-none text-white shadow-purple-500/20 shadow-lg"
                )}>
                  {isAI && (
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">
                      <Bot size={12} /> Resposta da IA
                    </div>
                  )}
                  <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
                  
                  <div className={cn(
                    "flex items-center justify-end gap-1 mt-1 text-[11px]",
                    isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    <span>{msg.time}</span>
                    {isMe && (
                      msg.status === "read" ? <CheckCheck size={14} className="text-blue-300" /> : <Check size={14} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border z-10 shrink-0">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0 rounded-full h-12 w-12 hover:bg-secondary">
            <Smile size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0 rounded-full h-12 w-12 hover:bg-secondary">
            <Paperclip size={24} />
          </Button>
          
          <div className="flex-1 bg-secondary rounded-2xl relative">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite uma mensagem..."
              className="w-full bg-transparent border-none min-h-[48px] focus-visible:ring-0 px-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (inputText.trim()) setInputText('');
                }
              }}
            />
          </div>

          {inputText.trim() ? (
            <Button size="icon" className="shrink-0 rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-md">
              <Send size={20} className="ml-1" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0 rounded-full h-12 w-12 hover:bg-secondary">
              <Mic size={24} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
