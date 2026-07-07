"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, SmartphoneNfc } from "lucide-react";
import { ConnectionCard } from "@/components/whatsapp/connection-card";
import { QRCodeModal } from "@/components/whatsapp/qr-code-modal";
import type { WhatsAppConnection } from "@/types/whatsapp.types";

// MOCK DATA
const mockConnections: WhatsAppConnection[] = [
  {
    id: "1",
    name: "Suporte Principal",
    number: "+55 11 99999-9999",
    status: "connected",
    ai_agent_id: "agent-1",
    ai_agent_name: "Assistente de Suporte V1",
    messages_today: 520,
    conversations_today: 45,
    last_sync: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Vendas São Paulo",
    number: "+55 11 98888-8888",
    status: "connected",
    ai_agent_id: "agent-2",
    ai_agent_name: "Fechador de Vendas IA",
    messages_today: 325,
    conversations_today: 80,
    last_sync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Parcerias",
    number: "+55 11 97777-7777",
    status: "disconnected",
    messages_today: 0,
    conversations_today: 0,
    last_sync: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function WhatsAppPage() {
  const [connections, setConnections] = useState<WhatsAppConnection[]>(mockConnections);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(null);
  const [isQrLoading, setIsQrLoading] = useState(false);
  
  // Fake QR Code for demonstration
  const fakeQr = "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=https://vecta.crm/connect/fake-qr-code-data";

  const handleConnect = (id: string) => {
    setActiveConnectionId(id);
    setIsQrLoading(true);
    setQrModalOpen(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsQrLoading(false);
      
      // Simulate connection successful after 5 seconds
      setTimeout(() => {
        setConnections(prev => prev.map(c => 
          c.id === id ? { ...c, status: "connected" } : c
        ));
        setQrModalOpen(false);
      }, 5000);
    }, 1500);
  };

  const handleDisconnect = (id: string) => {
    setConnections(prev => prev.map(c => 
      c.id === id ? { ...c, status: "disconnected" } : c
    ));
  };

  const handleReconnect = (id: string) => {
    // Just simulate a sync
    setConnections(prev => prev.map(c => 
      c.id === id ? { ...c, last_sync: new Date().toISOString() } : c
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus números conectados e atribua Agentes de IA a cada linha.
          </p>
        </div>
        <Button className="flex-shrink-0 shadow-lg glow-purple">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Número
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((conn) => (
          <ConnectionCard
            key={conn.id}
            connection={conn}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onReconnect={handleReconnect}
          />
        ))}

        {/* Placeholder Card for "Add New" */}
        <div className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer min-h-[300px]">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <SmartphoneNfc className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-lg">Nova Conexão</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-[200px]">
            Conecte um novo número de WhatsApp para escalar seu atendimento.
          </p>
          <Button variant="outline">
            Configurar Agora
          </Button>
        </div>
      </div>

      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        qrCode={fakeQr}
        isLoading={isQrLoading}
        onRefresh={() => handleConnect(activeConnectionId!)}
      />
    </div>
  );
}
