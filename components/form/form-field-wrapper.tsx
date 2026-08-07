"use client";

import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export function FormFieldWrapper({
  id,
  label,
  required = false,
  error,
  children,
}: FormFieldWrapperProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}

        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      {children}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
