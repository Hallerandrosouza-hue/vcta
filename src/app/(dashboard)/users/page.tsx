"use client";

import { useState } from "react";
import { Plus, Search, User, Shield, Trash2, Edit2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockUsers = [
  { id: "1", name: "Administrador", email: "admin@vecta.com", role: "admin", status: "active", lastLogin: "Agora" },
  { id: "2", name: "João Vendedor", email: "joao@vecta.com", role: "sales", status: "active", lastLogin: "Há 2 horas" },
  { id: "3", name: "Maria Suporte", email: "maria@vecta.com", role: "support", status: "inactive", lastLogin: "Há 5 dias" },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários e Permissões</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o acesso da sua equipe à plataforma.
          </p>
        </div>
        <Button className="shrink-0 shadow-lg glow-purple">
          <Plus className="mr-2 h-4 w-4" /> Convidar Usuário
        </Button>
      </div>

      <Card className="border-border/50">
        <div className="p-4 border-b border-border flex items-center gap-4 bg-secondary/20">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nome ou email..." 
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Último Acesso</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-secondary/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                        <AvatarFallback><User size={14} /></AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.role === 'admin' && <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-none"><Shield size={12} className="mr-1" /> Admin</Badge>}
                    {user.role === 'sales' && <Badge variant="outline" className="border-blue-500/30 text-blue-500 bg-blue-500/10">Vendas</Badge>}
                    {user.role === 'support' && <Badge variant="outline" className="border-green-500/30 text-green-500 bg-green-500/10">Suporte</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-muted'}`} />
                      <span className="text-sm">{user.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Editar">
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Resetar Senha">
                        <Key size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" title="Remover">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
