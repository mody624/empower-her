import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (!user) throw new Error('Invalid credentials');
        
        const { password: _, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword });
      },
      signup: async (email: string, password: string, name: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some((u: any) => u.email === email)) {
          throw new Error('Email already exists');
        }
        
        const newUser = {
          id: crypto.randomUUID(),
          email,
          password,
          name,
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);