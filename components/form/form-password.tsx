"use client";

import { useState } from "react";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FormFieldWrapper } from "./form-field-wrapper";

interface FormPasswordProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export function FormPassword<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
}: FormPasswordProps<T>) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldWrapper
          id={name}
          label={label}
          required={required}
          error={fieldState.error?.message}
        >
          <div className="relative">
            <Input
              {...field}
              value={field.value ?? ""}
              id={name}
              type={show ? "text" : "password"}
              placeholder={placeholder}
              className="pr-10"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </FormFieldWrapper>
      )}
    />
  );
}
