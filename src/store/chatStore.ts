import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../types';
import { useAuthStore } from './authStore';

interface ChatState {
  messagesByUser: Record<string, Message[]>;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messagesByUser: {},
      addMessage: (content, role) =>
        set((state) => {
          const userId = useAuthStore.getState().user?.id;
          if (!userId) return state;

          const userMessages = state.messagesByUser[userId] || [];
          return {
            messagesByUser: {
              ...state.messagesByUser,
              [userId]: [
                ...userMessages,
                {
                  id: crypto.randomUUID(),
                  content,
                  role,
                  timestamp: Date.now(),
                },
              ],
            },
          };
        }),
      clearMessages: () =>
        set((state) => {
          const userId = useAuthStore.getState().user?.id;
          if (!userId) return state;

          const { [userId]: _, ...restMessages } = state.messagesByUser;
          return {
            messagesByUser: restMessages,
          };
        }),
    }),
    {
      name: 'chat-storage',
    }
  )
);