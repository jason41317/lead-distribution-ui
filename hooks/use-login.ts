"use client";

import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
  });
}
