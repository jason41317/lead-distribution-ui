"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LeadSchema, LeadFormValues } from "../schemas/lead";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { Broker } from "@/features/broker";

interface LeadFormProps {
  defaultValues?: Partial<LeadFormValues>;
  loading?: boolean;
  onSubmit: (values: LeadFormValues) => void;
  brokers: Broker[]
}

export default function LeadForm({
  defaultValues,
  loading,
  onSubmit,
  brokers
}: LeadFormProps) {
  const { watch, ...form } = useForm<LeadFormValues>({
    resolver: zodResolver(LeadSchema)
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        ...form.getValues(),
        ...defaultValues,
      });
    }
  }, [defaultValues]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormSelect
        control={form.control}
        name="brokerId"
        label="Broker"
        options={brokers.map((broker) => ({
          label: broker.name,
          value: broker.id,
        }))}
        className="w-full"
      />

      <Button type="submit" disabled={loading} className="w-full">
        Save Lead
      </Button>
    </form>
  );
}
