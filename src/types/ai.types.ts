// ============================================
// AI Agent Types - Vecta CRM
// ============================================

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  model: string;
  temperature: number;
  max_tokens: number;
  prompt: string;
  objective: string;
  personality: string;
  language: string;
  specialty: string;
  schedule_start?: string;
  schedule_end?: string;
  schedule_days?: number[];
  is_active: boolean;
  connections_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateAIAgentRequest {
  name: string;
  description: string;
  model: string;
  temperature: number;
  max_tokens?: number;
  prompt: string;
  objective?: string;
  personality?: string;
  language?: string;
  specialty?: string;
  schedule_start?: string;
  schedule_end?: string;
  schedule_days?: number[];
}

export interface UpdateAIAgentRequest extends Partial<CreateAIAgentRequest> {
  is_active?: boolean;
}

export interface AIAnalysisRequest {
  conversation_id: string;
  messages: string[];
}

export interface AIAnalysisResponse {
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
  intent: string;
  interest: string;
  product: string;
  purchase_chance: number;
  urgency: "low" | "medium" | "high" | "critical";
  next_step: string;
  lead_score: number;
  classification: string;
  auto_tags: string[];
}

export interface OpenAIConfig {
  api_key: string;
  model: string;
  temperature: number;
  max_tokens: number;
  global_prompt: string;
}

export interface TestOpenAIRequest {
  api_key: string;
  model: string;
  prompt?: string;
}

export interface TestOpenAIResponse {
  success: boolean;
  message: string;
  model_info?: {
    model: string;
    tokens_used: number;
    response_time_ms: number;
  };
}
