import { create } from "zustand";

export type Message = {
  content: string;
  role: "user" | "assistant";
};

export type Conversation = {
  id: string;
  messages: Message[];
};

type ConversationState = {
  conversation: Conversation;
  setConversation: (conversation: Conversation) => void;
  addMessage: (message: Message) => void;
  addChunkToMessage: ({
    chunk,
    role,
  }: {
    chunk: string;
    role: Message["role"];
  }) => void;
  updateConversationId: (conversationId: string) => void;
};

export const useConversation = create<ConversationState>((set) => ({
  conversation: {
    id: "",
    messages: [
      {
        id: "1",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        role: "assistant",
      },
    ],
  },
  setConversation: (conversation) =>
    set((state) => ({ ...state, conversation })),

  addMessage: (message: Message) =>
    set((state) => ({
      ...state,
      conversation: {
        ...state.conversation,
        messages: [...state.conversation.messages, message],
      },
    })),

  addChunkToMessage: ({ chunk, role }) =>
    set((state) => {
      const lastMessageIndex = state.conversation.messages.length - 1;
      if (lastMessageIndex < 0) {
        return state;
      }
      const messagesWithoutLast = state.conversation.messages.slice(
        0,
        lastMessageIndex
      );

      const lastMessage = state.conversation.messages[lastMessageIndex];

      const updatedMessage = {
        ...lastMessage,
        role,
        content: chunk,
      };

      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: [...messagesWithoutLast, updatedMessage],
        },
      };
    }),
  updateConversationId: (conversationId) =>
    set((state) => ({
      ...state,
      conversation: {
        ...state.conversation,
        id: conversationId,
      },
    })),
}));
