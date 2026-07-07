"use client";

import { useState } from "react";
import { Plus, Search, Tag as TagIcon, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatRelativeTime } from "@/lib/utils";

const mockTags = [
  { id: "1", name: "Novo Lead", color: "bg-blue-500", autoApply: true, trigger: "Primeira mensagem", leadsCount: 145, lastUsed: new Date().toISOString() },
  { id: "2", name: "Prioridade", color: "bg-red-500", autoApply: true, trigger: "Palavra-chave: 'urgente'", leadsCount: 32, lastUsed: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "3", name: "Cliente VIP", color: "bg-purple-500", autoApply: false, trigger: "Manual", leadsCount: 89, lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: "4", name: "Reclamação", color: "bg-orange-500", autoApply: true, trigger: "Análise de Sentimento (Negativo)", leadsCount: 12, lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

export default function TagsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTags = mockTags.filter(tag => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Etiquetas e Automações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as tags do CRM e defina regras para a IA aplicá-las automaticamente.
          </p>
        </div>
        <Button className="shrink-0 shadow-lg glow-purple">
          <Plus className="mr-2 h-4 w-4" /> Criar Nova Tag
        </Button>
      </div>

      <Card className="border-border/50">
        <div className="p-4 border-b border-border flex items-center gap-4 bg-secondary/20">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar etiquetas..." 
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
                <TableHead>Etiqueta</TableHead>
                <TableHead>Aplicação da IA</TableHead>
                <TableHead>Gatilho (Regra)</TableHead>
                <TableHead className="text-right">Leads com a Tag</TableHead>
                <TableHead className="text-right">Último Uso</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTags.map((tag) => (
                <TableRow key={tag.id} className="hover:bg-secondary/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TagIcon size={16} className={tag.color.replace('bg-', 'text-')} />
                      <Badge variant="outline" className={`border-${tag.color.replace('bg-', '')}/30 bg-${tag.color.replace('bg-', '')}/10 text-${tag.color.replace('bg-', '')}`}>
                        {tag.name}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {tag.autoApply ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Automática</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">Manual</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {tag.trigger}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {tag.leadsCount}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {formatRelativeTime(tag.lastUsed)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredTags.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Nenhuma etiqueta encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
