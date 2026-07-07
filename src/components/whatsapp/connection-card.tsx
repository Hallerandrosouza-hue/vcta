"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CONNECTION_STATUS } from "@/lib/constants";
import type { WhatsAppConnection } from "@/types/whatsapp.types";
import { formatRelativeTime } from "@/lib/utils";
import { Smartphone, RefreshCw, Unplug, Bot, MessageSquare, Clock } from "lucide-react";

interface ConnectionCardProps {
  connection: WhatsAppConnection;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onReconnect: (id: string) => void;
}

export function ConnectionCard({ connection, onConnect, onDisconnect, onReconnect }: ConnectionCardProps) {
  const statusConfig = CONNECTION_STATUS[connection.status];

  return (
    <Card className="flex flex-col border-border/50 hover:shadow-md transition-shadow relative overflow-hidden group">
      {/* Decorative top border based on status */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${statusConfig.color}`} />
      
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
              <AvatarImage src={connection.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${connection.name}`} alt={connection.name} />
              <AvatarFallback><Smartphone className="h-6 w-6 text-muted-foreground" /></AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg leading-none">{connection.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{connection.number}</p>
            </div>
          </div>
          <Badge variant="outline" className={statusConfig.color.replace('bg-', 'text-').replace('500', '500 border-current bg-opacity-10')}>
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" /> Mensagens Hoje
            </p>
            <p className="font-medium">{connection.messages_today}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Último Sync
            </p>
            <p className="font-medium">{connection.last_sync ? formatRelativeTime(connection.last_sync) : 'Nunca'}</p>
          </div>
          
          <div className="col-span-2 space-y-1 mt-2 p-3 bg-secondary/50 rounded-md">
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Bot className="h-3.5 w-3.5" /> Agente IA Responsável
            </p>
            <p className="font-medium text-sm flex items-center justify-between">
              {connection.ai_agent_name || "Nenhum agente atribuído"}
              {!connection.ai_agent_id && (
                <span className="text-xs text-primary cursor-pointer hover:underline">Atribuir</span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex gap-2">
        {connection.status === "disconnected" && (
          <Button 
            className="w-full" 
            variant="default"
            onClick={() => onConnect(connection.id)}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Conectar Dispositivo
          </Button>
        )}
        
        {connection.status === "connected" && (
          <>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => onReconnect(connection.id)}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronizar
            </Button>
            <Button 
              size="icon"
              variant="outline"
              className="text-destructive hover:bg-destructive hover:text-white flex-shrink-0"
              onClick={() => onDisconnect(connection.id)}
            >
              <Unplug className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {(connection.status === "connecting" || connection.status === "qr_pending") && (
          <Button 
            className="w-full" 
            variant="outline"
            disabled
          >
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Aguardando...
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
