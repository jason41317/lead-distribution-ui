"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Switch } from "@/components/ui/switch";

import { FormFieldWrapper } from "./form-field-wrapper";

interface FormSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled = false,
  required = false,
}: FormSwitchProps<T>) {
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
          <div className="flex items-center rounded-lg">
            <div>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>

            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </div>
        </FormFieldWrapper>
      )}
    />
  );
}
