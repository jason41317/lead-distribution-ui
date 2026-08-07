"use client";

import { Trash2, Plus } from "lucide-react";
import { useFieldArray, Control, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormSwitch } from "@/components/form/form-switch";

import { DistributionFormValues } from "../schemas/distribution";

import { Broker } from "@/features/broker";

interface Props {
  control: Control<DistributionFormValues>;
  brokers: Broker[];
}

export function DistributionBrokers({ control, brokers }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "brokers",
  });

  const selectedBrokers =
    useWatch({
      control,
      name: "brokers",
    }) ?? [];

  const getAvailableBrokers = (currentIndex: number) => {
    const selectedIds = selectedBrokers
      .filter((_, index) => index !== currentIndex)
      .map((broker) => broker?.brokerId)
      .filter(Boolean);

    return brokers.filter((broker) => !selectedIds.includes(broker.id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Brokers</h3>

        <Button
          type="button"
          size="sm"
          onClick={() =>
            getAvailableBrokers(-1).length > 0
              ? append({
                  brokerId: 0,
                  percentage: 1,
                  active: true,
                })
              : null
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Broker
        </Button>
      </div>

      {fields.map((field, index) => {
        const availableBrokers = getAvailableBrokers(index);

        return (
          <div key={field.id} className="rounded-lg border p-4 space-y-4">
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <FormSelect
                  control={control}
                  name={`brokers.${index}.brokerId`}
                  label="Broker"
                  options={availableBrokers.map((broker) => ({
                    label: broker.name,
                    value: broker.id,
                  }))}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end mt-3">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                control={control}
                name={`brokers.${index}.percentage`}
                label="Percentage"
                type="number"
                min={1}
              />

              <FormSwitch
                control={control}
                name={`brokers.${index}.active`}
                label="Active"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
