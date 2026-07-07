"use client";

import { Search, Menu, User as UserIcon, LogOut, Settings } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { NotificationBell } from "./notification-bell";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";

export function Header() {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <Menu size={20} />
        </button>
        
        <div className="relative max-w-md w-full hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar leads, conversas ou clientes..." 
            className="w-full bg-secondary border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationBell />
        
        <div className="h-8 w-[1px] bg-border mx-1" />

        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 hover:bg-secondary p-1.5 rounded-full pr-3 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold border border-primary/30">
              {user ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="text-sm font-medium hidden md:block">
              {user ? user.name : "Usuário"}
            </span>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-scale-in origin-top-right">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-sm truncate">{user?.name || "Usuário"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || "admin@vecta.com"}</p>
                </div>
                
                <div className="p-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-left">
                    <UserIcon size={16} className="text-muted-foreground" />
                    Meu Perfil
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-left">
                    <Settings size={16} className="text-muted-foreground" />
                    Configurações
                  </button>
                  <div className="h-[1px] bg-border my-1" />
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-destructive/10 text-destructive transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Sair da plataforma
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
