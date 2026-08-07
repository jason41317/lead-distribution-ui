import { create } from "zustand";
import { User } from "@/types/auth";

interface AuthState {
  token: string | null;
  user: User | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;
  restore: (token: string | null, user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  isAuthenticated: false,
  isLoading: true,

  login(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      token,
      user,
      isAuthenticated: true,
    });
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  restore(token, user) {
    set({
      token,
      user,
      isAuthenticated: !!token,
    });
  },

  setLoading(loading) {
    set({
      isLoading: loading,
    });
  },
}));
