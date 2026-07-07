"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { authService } from "@/services/auth.service";
import { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken } from "@/services/api";
import type { User, LoginRequest, AuthResponse } from "@/types/auth.types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const loadUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    loadUser();
  }, [loadUser]);

  const login = async (data: LoginRequest) => {
    const response: AuthResponse = await authService.login(data);
    setAccessToken(response.access_token);
    setRefreshToken(response.refresh_token);
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Continue logout even if API fails
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch {
      // Silently fail
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
