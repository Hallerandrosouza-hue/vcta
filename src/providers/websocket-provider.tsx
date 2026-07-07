"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { WS_URL } from "@/lib/constants";
import { getAccessToken } from "@/services/api";
import type { WebSocketMessage } from "@/types/tag.types";

interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
  sendMessage: (message: WebSocketMessage) => void;
  subscribe: (type: string, callback: (payload: unknown) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const listenersRef = useRef<Map<string, Set<(payload: unknown) => void>>>(new Map());
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10;

  useEffect(() => {
    function connect() {
      const token = getAccessToken();
      if (!token) return;

      try {
        const ws = new WebSocket(`${WS_URL}?token=${token}`);

        ws.onopen = () => {
          setIsConnected(true);
          reconnectAttemptsRef.current = 0;
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            handleMessage(data);
          } catch (err) {
            console.error("Error parsing websocket message", err);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          wsRef.current = null;

          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current++;
              connect();
            }, delay);
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error", error);
          ws.close();
        };

        wsRef.current = ws;
      } catch (err) {
        console.error("Error connecting to websocket", err);
      }
    }

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [handleMessage]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  const subscribe = useCallback((type: string, callback: (payload: unknown) => void) => {
    if (!listenersRef.current.has(type)) {
      listenersRef.current.set(type, new Set());
    }
    listenersRef.current.get(type)!.add(callback);

    return () => {
      listenersRef.current.get(type)?.delete(callback);
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        lastMessage,
        sendMessage,
        subscribe,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}
