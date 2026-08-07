"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";

import {
  LeadFormValues,
  LeadSchema,
} from "../../../../features/lead/schemas/lead";

interface LeadFormProps {
  loading?: boolean;
  onSubmit: (values: LeadFormValues) => void;
}

export function LeadForm({ loading = false, onSubmit }: LeadFormProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(LeadSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormInput
        control={form.control}
        name="name"
        label="Full Name"
        placeholder="John Doe"
        required
      />

      <FormInput
        control={form.control}
        name="email"
        label="Email Address"
        type="email"
        placeholder="john@email.com"
        required
      />

      <FormInput
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder="+63 912 345 6789"
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
