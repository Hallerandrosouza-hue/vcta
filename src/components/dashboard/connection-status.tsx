"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CONNECTION_STATUS } from "@/lib/constants";
import type { ConnectionStatusSummary } from "@/types/dashboard.types";
import { formatRelativeTime } from "@/lib/utils";

interface ConnectionStatusListProps {
  connections: ConnectionStatusSummary[];
}

export function ConnectionStatusList({ connections }: ConnectionStatusListProps) {
  return (
    <Card className="col-span-1 lg:col-span-3 border-border/50 flex flex-col">
      <CardHeader>
        <CardTitle>Status das Conexões</CardTitle>
        <CardDescription>
          Números de WhatsApp conectados ao sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-6">
          {connections.map((conn) => {
            const statusConfig = CONNECTION_STATUS[conn.status as keyof typeof CONNECTION_STATUS];
            
            return (
              <div key={conn.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${conn.name}`} alt={conn.name} />
                      <AvatarFallback>{conn.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span 
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                        conn.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                      }`} 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{conn.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{conn.number}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className={statusConfig.color.replace('bg-', 'text-').replace('500', '500 border-current bg-opacity-10')}>
                    {statusConfig.label}
                  </Badge>
                  {conn.last_sync && (
                    <span className="text-[10px] text-muted-foreground">
                      Sync: {formatRelativeTime(conn.last_sync)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
