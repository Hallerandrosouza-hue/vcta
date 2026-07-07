// ============================================
// API Client - Vecta CRM
// Axios instance with interceptors for auth
// ============================================

import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/lib/constants";

// Create Axios instance
// IMPORTANTE (Integração Backend): Esta é a instância principal do Axios que se comunicará com a API Python FastAPI.
// A URL base (API_URL) é configurada em src/lib/constants.ts e lida do .env local.
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Token management
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem("vecta_access_token", token);
  } else {
    localStorage.removeItem("vecta_access_token");
  }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("vecta_access_token");
  }
  return accessToken;
}

export function setRefreshToken(token: string | null) {
  if (token) {
    localStorage.setItem("vecta_refresh_token", token);
  } else {
    localStorage.removeItem("vecta_refresh_token");
  }
}

export function getRefreshToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("vecta_refresh_token");
  }
  return null;
}

// Request interceptor - inject Bearer token
// IMPORTANTE (Integração Backend): O backend (FastAPI) deve esperar um header 'Authorization' com 'Bearer <token>'.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 and refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        setAccessToken(null);
        setRefreshToken(null);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      // IMPORTANTE (Integração Backend): Quando o token JWT expirar, a API Python deve retornar HTTP 401.
      // O frontend tentará usar o refresh_token batendo neste endpoint: POST /auth/refresh
      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token: newRefreshToken } = response.data;
        setAccessToken(access_token);
        setRefreshToken(newRefreshToken);
        processQueue(null, access_token);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        setAccessToken(null);
        setRefreshToken(null);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
