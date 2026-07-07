"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import * as LucideIcons from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 relative z-20",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Header Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3 overflow-hidden w-full">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg glow-purple">
            V
          </div>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight gradient-text whitespace-nowrap animate-fade-in">
              Vecta CRM
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ElementType;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon size={20} className={cn("flex-shrink-0", isActive && "text-primary")} />
              
              {!collapsed && (
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
              )}

              {!collapsed && (item as any).badge && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-semibold">
                  3
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer collapse button */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-sidebar-foreground hover:bg-secondary transition-colors"
        >
          {collapsed ? <LucideIcons.ChevronRight size={20} /> : <LucideIcons.ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
}
