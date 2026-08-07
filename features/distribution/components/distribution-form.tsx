"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  distributionSchema,
  DistributionFormValues,
} from "../schemas/distribution";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { Form } from "@/features/form";
import { DistributionBrokers } from "./distribution-brokers";
import { Broker } from "@/features/broker";

interface FormFormProps {
  defaultValues?: Partial<DistributionFormValues>;
  loading?: boolean;
  onSubmit: (values: DistributionFormValues) => void;
  forms: Form[];
  brokers: Broker[];

}

export default function DistributionForm({
  defaultValues,
  loading,
  onSubmit,
  forms,
  brokers
}: FormFormProps) {
  const distributionForm = useForm<DistributionFormValues>({
    resolver: zodResolver(distributionSchema),

    defaultValues: {
      name: "",
      formId: forms.length > 0 ? forms[0].id : 0,
      brokers: [],
    },
  });

  useEffect(() => {
    if (defaultValues) {
      distributionForm.reset({
        ...distributionForm.getValues(),
        ...defaultValues,
      });
    }
  }, [defaultValues]);

  return (
    <form
      onSubmit={distributionForm.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="flex gap-2">
        <div className="flex-1">
          <FormInput
            control={distributionForm.control}
            name="name"
            label="Name"
            placeholder="Form Name"
            required
          />
        </div>
        <div className="flex-1">
          {/* {distributionForm.getValues('formId')} */}
          <FormSelect
            control={distributionForm.control}
            name="formId"
            label="Form"
            placeholder="Form"
            options={forms.map((form) => {
              return { label: form.name, value: String(form.id) };
            })}
            className="w-full"
            required
          />
        </div>
      </div>
      <DistributionBrokers
        control={distributionForm.control}
        brokers={brokers}
      />
      <Button type="submit" disabled={loading} className="w-full">
        Save Distribution
      </Button>
    </form>
  );
}
