"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const restore = useAuthStore((state) => state.restore);

  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      const user = localStorage.getItem("user");

      restore(token, user ? JSON.parse(user) : null);
    } finally {
      setLoading(false);
    }
  }, [restore, setLoading]);

  return children;
}
