"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema, FormFormValues } from "../schemas/form";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";

interface FormFormProps {
  defaultValues?: Partial<FormFormValues>;
  loading?: boolean;
  onSubmit: (values: FormFormValues) => void;
}

export default function FormForm({
  defaultValues,
  loading,
  onSubmit,
}: FormFormProps) {
  const { watch, ...form } = useForm<FormFormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      slug: ""
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        ...form.getValues(),
        ...defaultValues,
      });
    }
  }, [defaultValues]);

  const name = watch('name')

  useEffect(() => {
    const slug = name.toLowerCase().replace(/\s+/g, '-'); 
    form.setValue("slug", slug)
  }, [name])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        control={form.control}
        name="name"
        label="Name"
        placeholder="Form Name"
        required
      />

      <FormInput
        control={form.control}
        name="slug"
        label="Slug"
        placeholder="Slug"
        disabled
      />
      <Button type="submit" disabled={loading} className="w-full">
        Save Form
      </Button>
    </form>
  );
}
