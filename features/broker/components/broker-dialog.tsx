"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import BrokerForm from "./broker-form";
import { Broker } from "../types/broker";
import { BrokerFormValues } from "../schemas/broker";

interface BrokerDialogProps {
  open: boolean;
  broker?: Broker;
  loading?: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (values: BrokerFormValues) => void;
}

export default function BrokerDialog({
  open,
  broker,
  loading,
  onOpenChange,
  onSubmit,
}: BrokerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{broker ? "Edit Broker" : "Add Broker"}</DialogTitle>
        </DialogHeader>

        <BrokerForm
          loading={loading}
          defaultValues={broker as BrokerFormValues}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
