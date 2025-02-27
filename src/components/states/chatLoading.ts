import { create } from "zustand";

export type chatLoadingState = {
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
};

export const useChatLoading = create<chatLoadingState>((set) => ({
  isTyping: false,
  setIsTyping: (value: boolean) =>
    set((state) => ({ ...state, isTyping: value })),
}));
