"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import Image from "next/image";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCode: string | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export function QRCodeModal({ isOpen, onClose, qrCode, isLoading, onRefresh }: QRCodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conectar WhatsApp</DialogTitle>
          <DialogDescription>
            Abra o WhatsApp no seu celular, vá em Aparelhos Conectados e aponte a câmera para a tela.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-xl my-4 min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p>Gerando código QR seguro...</p>
            </div>
          ) : qrCode ? (
            <div className="relative group">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <img 
                  src={qrCode} 
                  alt="WhatsApp QR Code" 
                  width={256} 
                  height={256}
                  className="rounded-lg"
                />
              </div>
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                <Button variant="secondary" onClick={onRefresh} className="shadow-lg">
                  <RefreshCw className="mr-2 h-4 w-4" /> Atualizar QR Code
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-destructive">
              <p>Erro ao carregar o QR Code.</p>
              <Button variant="outline" onClick={onRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" /> Tentar Novamente
              </Button>
            </div>
          )}
        </div>

        <div className="text-sm text-center text-muted-foreground">
          <p>Dica: O código expira em 20 segundos. Clique na imagem para atualizar se necessário.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
