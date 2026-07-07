"use client";

import { useState } from "react";
import { ConversationList } from "@/components/conversations/conversation-list";
import { ChatArea } from "@/components/conversations/chat-area";
import { ContactPanel } from "@/components/conversations/contact-panel";

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showContactPanel, setShowContactPanel] = useState(true);

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    // On mobile, selecting a conversation should probably hide the list
    // This logic can be added later with a responsive hook
  };

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16)-theme(spacing.12))] bg-background border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Coluna 1: Lista */}
      <ConversationList 
        onSelect={handleSelectConversation} 
        selectedId={selectedConversation} 
      />

      {/* Coluna 2: Chat */}
      <ChatArea 
        conversationId={selectedConversation} 
        onToggleContactPanel={() => setShowContactPanel(!showContactPanel)} 
      />

      {/* Coluna 3: Painel Lateral (Info + IA) */}
      {selectedConversation && (
        <ContactPanel 
          isOpen={showContactPanel} 
          onClose={() => setShowContactPanel(false)} 
        />
      )}
    </div>
  );
}
