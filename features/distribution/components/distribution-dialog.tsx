"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import DistributionForm from "./distribution-form";
import { Distribution } from "../types/distribution";
import { DistributionFormValues } from "../schemas/distribution";
import { Form } from "@/features/form";
import { Broker } from "@/features/broker";

interface FormDialogProps {
  open: boolean;
  distribution?: Distribution;
  loading?: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (values: DistributionFormValues) => void;
  forms: Form[];
  brokers: Broker[]
}

export default function FormDialog({
  open,
  distribution,
  loading,
  onOpenChange,
  onSubmit,
  forms,
  brokers
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl overflow-y-auto sm:max-h-200">
        <DialogHeader>
          <DialogTitle>{distribution ? "Edit Distribution" : "Add Distribution"}</DialogTitle>
        </DialogHeader>
    
        <DistributionForm
          forms={forms}
          loading={loading}
          defaultValues={distribution as DistributionFormValues}
          onSubmit={onSubmit}
          brokers={brokers}
        />
      </DialogContent>
    </Dialog>
  );
}
