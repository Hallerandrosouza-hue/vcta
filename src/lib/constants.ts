export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws";

export const LEAD_CLASSIFICATIONS = {
  cold: { label: "Frio", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  warm: { label: "Morno", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  hot: { label: "Quente", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  client: { label: "Cliente", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  supplier: { label: "Fornecedor", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  partner: { label: "Parceiro", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  spam: { label: "Spam", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  competitor: { label: "Concorrente", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
} as const;

export const SENTIMENT_MAP = {
  positive: { label: "Positivo", emoji: "😊", color: "text-green-400" },
  neutral: { label: "Neutro", emoji: "😐", color: "text-yellow-400" },
  negative: { label: "Negativo", emoji: "😞", color: "text-red-400" },
} as const;

export const USER_ROLES = {
  admin: { label: "Administrador", color: "bg-purple-500/20 text-purple-400" },
  supervisor: { label: "Supervisor", color: "bg-blue-500/20 text-blue-400" },
  agent: { label: "Atendente", color: "bg-green-500/20 text-green-400" },
} as const;

export const CONNECTION_STATUS = {
  connected: { label: "Conectado", color: "bg-green-500" },
  disconnected: { label: "Desconectado", color: "bg-red-500" },
  connecting: { label: "Conectando", color: "bg-yellow-500" },
  qr_pending: { label: "Aguardando QR", color: "bg-blue-500" },
} as const;

export const OPENAI_MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
] as const;

export const KANBAN_COLUMNS = [
  { id: "new", label: "Novos", color: "border-blue-500" },
  { id: "contacted", label: "Contatados", color: "border-yellow-500" },
  { id: "qualified", label: "Qualificados", color: "border-purple-500" },
  { id: "proposal", label: "Proposta", color: "border-cyan-500" },
  { id: "negotiation", label: "Negociação", color: "border-orange-500" },
  { id: "won", label: "Ganho", color: "border-green-500" },
  { id: "lost", label: "Perdido", color: "border-red-500" },
] as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
  { label: "Conversas", href: "/conversations", icon: "MessageSquare", badge: true },
  { label: "Leads", href: "/leads", icon: "UserPlus" },
  { label: "Clientes", href: "/clients", icon: "Users" },
  { label: "Etiquetas", href: "/tags", icon: "Tag" },
  { label: "Automações", href: "/automations", icon: "Workflow" },
  { label: "Agentes IA", href: "/ai-agents", icon: "Bot" },
  { label: "WhatsApp", href: "/whatsapp", icon: "Smartphone" },
  { label: "Relatórios", href: "/reports", icon: "BarChart3" },
  { label: "Usuários", href: "/users", icon: "UserCog" },
  { label: "Configurações", href: "/settings", icon: "Settings" },
] as const;
