"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });

  const rememberValue = watch("remember");

  const onSubmit = async (data: LoginForm) => {
    try {
      setError(null);
      // IMPORTANTE (Integração Backend): Chama o authService.login que faz POST para /auth/login
      // Como não temos backend, vamos simular o login para fins de demonstração
      
      // Simulando delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock auth response (since we don't have the real backend running yet)
      // If we had the real backend, we would do: await login(data);
      if (data.email === "admin@vecta.com" && data.password === "123456") {
        router.push("/");
      } else {
        setError("Credenciais inválidas. Use admin@vecta.com / 123456");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Ocorreu um erro ao fazer login.");
      } else {
        setError("Ocorreu um erro ao fazer login.");
      }
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Bem-vindo de volta</h2>
        <p className="text-muted-foreground">
          Insira suas credenciais para acessar sua conta.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link 
              href="/forgot-password" 
              className="text-sm text-primary hover:underline font-medium"
            >
              Esqueci a senha
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.password && (
            <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 py-2">
          <Checkbox 
            id="remember" 
            checked={rememberValue} 
            onCheckedChange={(checked) => setValue("remember", checked as boolean)} 
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
          >
            Lembrar meu acesso por 30 dias
          </Label>
        </div>

        <Button 
          type="submit" 
          className="w-full h-11 text-base font-medium shadow-lg hover:shadow-primary/25 transition-all" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              Entrar na Plataforma
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
