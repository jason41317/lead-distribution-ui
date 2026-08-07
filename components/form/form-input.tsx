"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormFieldWrapper } from "./form-field-wrapper";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  min?: number;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  className,
  min
}: FormInputProps<T>) {
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
          <Input
            id={name}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              field.onChange(
                type === "number"
                  ? e.target.value === ""
                    ? undefined
                    : Number(e.target.value)
                  : e.target.value,
              );
            }}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(fieldState.error && "border-destructive", className)}
            min={min}
          />
        </FormFieldWrapper>
      )}
    />
  );
}
