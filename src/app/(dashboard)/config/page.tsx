"use client";

import { Save, Globe, Lock, Bell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfigPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as preferências da conta e do sistema.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Perfil da Empresa */}
        <Card className="border-border/50">
          <CardHeader className="bg-secondary/20 border-b border-border/50 pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><Globe size={18} className="text-primary"/> Perfil da Empresa</CardTitle>
            <CardDescription>Informações públicas que aparecem nos orçamentos e comunicações.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome da Empresa</label>
              <Input defaultValue="Vecta Inc." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CNPJ</label>
              <Input defaultValue="00.000.000/0001-00" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Endereço Completo</label>
              <Input defaultValue="Av. Paulista, 1000 - São Paulo, SP" />
            </div>
          </CardContent>
        </Card>

        {/* Integrações */}
        <Card className="border-border/50">
          <CardHeader className="bg-secondary/20 border-b border-border/50 pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><Lock size={18} className="text-primary"/> Segurança e API</CardTitle>
            <CardDescription>Gerencie tokens de acesso para integrações externas.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Webhook URL Principal</label>
              <Input defaultValue="https://api.vecta.com/v1/webhook" disabled />
              <p className="text-xs text-muted-foreground">Envie dados para cá para acionar automações via sistemas de terceiros.</p>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium">Token de API (Bearer)</label>
              <div className="flex gap-2">
                <Input defaultValue="vct_live_8f92a3b4c5d6e7f8g9h0i1j2k3l4m5n6" type="password" />
                <Button variant="outline">Revelar</Button>
                <Button variant="secondary">Gerar Novo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="border-border/50">
          <CardHeader className="bg-secondary/20 border-b border-border/50 pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><Bell size={18} className="text-primary"/> Notificações</CardTitle>
            <CardDescription>Escolha como deseja ser avisado sobre eventos importantes.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid gap-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Novos Leads</p>
                <p className="text-sm text-muted-foreground">Aviso visual na tela e som.</p>
              </div>
              <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Ativado</Button>
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Mensagens de Suporte</p>
                <p className="text-sm text-muted-foreground">Receber notificação quando o agente transferir.</p>
              </div>
              <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Ativado</Button>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <Button variant="ghost">Cancelar Alterações</Button>
        <Button className="shadow-md"><Save className="w-4 h-4 mr-2"/> Salvar Configurações</Button>
      </div>
    </div>
  );
}
