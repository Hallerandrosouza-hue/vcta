"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { useWebSocket } from "@/providers/websocket-provider";
import { formatRelativeTime } from "@/lib/utils";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2); // Example static

  // IMPORTANTE (Integração Backend): Os eventos de notificação virão via WebSocket
  // O hook useWebSocket já está preparado para assinar eventos.

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-scale-in origin-top-right">
            <div className="p-3 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold text-sm">Notificações</h3>
              {unreadCount > 0 && (
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-xs text-primary hover:underline"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>
            
            <div className="max-h-[300px] overflow-y-auto">
              <div className="p-3 border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors">
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Novo lead quente: João Silva</p>
                    <p className="text-xs text-muted-foreground mt-1">Interesse em automação via WhatsApp.</p>
                    <p className="text-xs text-muted-foreground mt-2">5 minutos atrás</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 hover:bg-secondary/50 cursor-pointer transition-colors opacity-70">
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-transparent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Conexão WhatsApp desconectada</p>
                    <p className="text-xs text-muted-foreground mt-1">O número Suporte Principal perdeu a conexão.</p>
                    <p className="text-xs text-muted-foreground mt-2">2 horas atrás</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
