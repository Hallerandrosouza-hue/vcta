// ============================================
// AI Service - Vecta CRM
// ============================================

import api from "./api";
import type {
  AIAgent,
  CreateAIAgentRequest,
  UpdateAIAgentRequest,
  AIAnalysisRequest,
  AIAnalysisResponse,
  OpenAIConfig,
  TestOpenAIRequest,
  TestOpenAIResponse,
} from "@/types/ai.types";

export const aiService = {
  // AI Agents
  async getAgents(): Promise<AIAgent[]> {
    const response = await api.get<AIAgent[]>("/ai/agents");
    return response.data;
  },

  async getAgent(id: string): Promise<AIAgent> {
    const response = await api.get<AIAgent>(`/ai/agents/${id}`);
    return response.data;
  },

  async createAgent(data: CreateAIAgentRequest): Promise<AIAgent> {
    const response = await api.post<AIAgent>("/ai/agents", data);
    return response.data;
  },

  async updateAgent(id: string, data: UpdateAIAgentRequest): Promise<AIAgent> {
    const response = await api.put<AIAgent>(`/ai/agents/${id}`, data);
    return response.data;
  },

  async deleteAgent(id: string): Promise<void> {
    await api.delete(`/ai/agents/${id}`);
  },

  // AI Analysis
  async analyzeConversation(data: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const response = await api.post<AIAnalysisResponse>("/ai/analyze", data);
    return response.data;
  },

  async getConversationAnalysis(conversationId: string): Promise<AIAnalysisResponse> {
    const response = await api.get<AIAnalysisResponse>(`/ai/analysis/${conversationId}`);
    return response.data;
  },

  // OpenAI Config
  async getOpenAIConfig(): Promise<OpenAIConfig> {
    const response = await api.get<OpenAIConfig>("/ai/config/openai");
    return response.data;
  },

  async updateOpenAIConfig(data: Partial<OpenAIConfig>): Promise<OpenAIConfig> {
    const response = await api.put<OpenAIConfig>("/ai/config/openai", data);
    return response.data;
  },

  async testOpenAIConnection(data: TestOpenAIRequest): Promise<TestOpenAIResponse> {
    const response = await api.post<TestOpenAIResponse>("/ai/config/openai/test", data);
    return response.data;
  },
};
