"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { FormFieldWrapper } from "./form-field-wrapper";

// 1. Updated: Accept string or number for option values
interface SelectOption {
  label: string;
  value: string | number; 
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  disabled = false,
  required = false,
  className,
}: FormSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const stringValue = field.value !== undefined && field.value !== null 
          ? String(field.value) 
          : "";

        return (
          <FormFieldWrapper
            id={name}
            label={label}
            required={required}
            error={fieldState.error?.message}
          >
            <Select
              value={stringValue}
              onValueChange={(newValue) => {
                const isFormValueNumber = typeof field.value === "number";
                const isOptionOriginallyNumber = options.some(
                  (opt) => String(opt.value) === newValue && typeof opt.value === "number"
                );

                if (isFormValueNumber || isOptionOriginallyNumber) {
                  field.onChange(Number(newValue));
                } else {
                  field.onChange(newValue);
                }
              }}
              disabled={disabled}
            >
              <SelectTrigger
                className={cn(
                  fieldState.error && "border-destructive",
                  className,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={String(option.value)} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldWrapper>
        );
      }}
    />
  );
}
