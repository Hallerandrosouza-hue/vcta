// ============================================
// Auth Service - Vecta CRM
// ============================================

import api from "./api";
import type {
  LoginRequest,
  AuthResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  User,
} from "@/types/auth.types";

export const authService = {
  // IMPORTANTE (Integração Backend): O endpoint POST /auth/login na API FastAPI 
  // deve receber { email, password } e retornar { access_token, refresh_token, token_type, expires_in, user }
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await api.post("/auth/forgot-password", data);
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await api.post("/auth/reset-password", data);
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>("/auth/profile");
    return response.data;
  },

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await api.put<User>("/auth/profile", data);
    return response.data;
  },

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await api.post("/auth/change-password", data);
  },
};
