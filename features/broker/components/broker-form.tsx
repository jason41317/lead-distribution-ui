"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { brokerSchema, BrokerFormValues } from "../schemas/broker";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormSwitch } from "@/components/form/form-switch";
import { FormFieldWrapper } from "@/components/form/form-field-wrapper";
import { cn } from "@/lib/utils";

interface BrokerFormProps {
  defaultValues?: Partial<BrokerFormValues>;
  loading?: boolean;
  onSubmit: (values: BrokerFormValues) => void;
}

const days = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

const timezones = [
  "UTC",
  "Asia/Manila",
  "America/New_York",
  "America/Los_Angeles",
];

export default function BrokerForm({
  defaultValues,
  loading,
  onSubmit,
}: BrokerFormProps) {
  const form = useForm<BrokerFormValues>({
    resolver: zodResolver(brokerSchema),

    defaultValues: {
      name: "",
      active: true,
      dailyCap: 0,
      timezone: "Asia/Manila",
      openingTime: "08:00",
      closingTime: "17:00",
      workingDays: [1, 2, 3, 4, 5],
      ...defaultValues,
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        control={form.control}
        name="name"
        label="Name"
        placeholder="Broker Name"
        required
      />
      <div className="w-1/2">
        <FormInput
          control={form.control}
          name="dailyCap"
          type="number"
          label="Daily Cap"
          min={0}
          placeholder="Daily Cap"
          required
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <FormSelect
            control={form.control}
            name="timezone"
            label="Timezone"
            options={timezones.map((tz) => ({ label: tz, value: tz }))}
            className="w-full"
          />
        </div>

        <div className="flex-1">
          <FormInput
            control={form.control}
            name="openingTime"
            type="time"
            label="Opening Time"
            placeholder="Opening Time"
            required
          />
        </div>

        <div className="flex-1">
          <FormInput
            control={form.control}
            name="closingTime"
            type="time"
            label="Closing Time"
            placeholder="Closing Time"
            required
          />
        </div>
      </div>

      {/* Working Days */}

      <div className="space-y-2">
        <Controller
          control={form.control}
          name="workingDays"
          render={({ field, fieldState }) => (
            <FormFieldWrapper
              id="workingDays"
              label="Working Days"
              required
              error={fieldState.error?.message}
            >
              <div className="flex flex-wrap gap-2">
                {days.map((day, idx) => {
                  const isSelected = field.value?.includes(day.value);
                  return (
                    <div
                      onClick={() => {
                        if (isSelected) {
                          field.onChange(field.value.filter((d) => d !== day.value));
                        } else {
                          field.onChange([...(field.value || []), day.value]);
                        }
                      }}
                      className={cn(
                        isSelected ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800",
                        "px-2 py-1 rounded-full text-xs cursor-pointer",
                      )}
                      key={idx}
                    >
                      {day.label}
                    </div>
                  );
                })}
              </div>
            </FormFieldWrapper>
          )}
        />
      </div>

      <FormSwitch
        control={form.control}
        name="active"
        label="Active"
        disabled={loading}
        required
      />

      <Button type="submit" disabled={loading} className="w-full">
        Save Broker
      </Button>
    </form>
  );
}
