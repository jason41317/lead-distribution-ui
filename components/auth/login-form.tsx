"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FormInput, FormPassword } from "@/components/form";

import { useLogin } from "@/hooks/use-login";
import { useAuthStore } from "@/stores/auth";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const mutation = useLogin();

  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const response = await mutation.mutateAsync(values);

      login(response.data.data.token, response.data.data.user);

      toast.success("Welcome back!");

      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Login failed.");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Lead Distribution</CardTitle>

        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="john@example.com"
            required
          />

          <FormPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
