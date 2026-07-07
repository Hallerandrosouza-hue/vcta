import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex flex-1 relative bg-sidebar flex-col justify-between p-12 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-accent/30 blur-[100px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl shadow-lg glow-purple">
              V
            </div>
            <span className="font-bold text-2xl tracking-tight gradient-text">
              Vecta CRM
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg mt-auto animate-slide-in-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            A revolução do atendimento inteligente.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Conecte suas contas de WhatsApp, deixe a Inteligência Artificial classificar seus leads e foque apenas em fechar vendas.
          </p>

          <div className="mt-12 flex gap-4">
            <div className="glass p-4 rounded-xl flex-1 border-border">
              <p className="text-2xl font-bold text-foreground">3x</p>
              <p className="text-sm text-muted-foreground mt-1">Mais conversões</p>
            </div>
            <div className="glass p-4 rounded-xl flex-1 border-border">
              <p className="text-2xl font-bold text-foreground">-80%</p>
              <p className="text-sm text-muted-foreground mt-1">Tempo de resposta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
