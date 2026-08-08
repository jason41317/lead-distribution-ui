"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Broker } from "../types/broker";
import LeadTable from "@/features/lead/components/lead-table";

interface BrokerLeadDialogProps {
  open: boolean;
  broker?: Broker;
  onOpenChange: (open: boolean) => void;
}

export default function BrokerLeadDialog({
  open,
  broker,
  onOpenChange,
}: BrokerLeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl overflow-y-auto max-h-200">
        <DialogHeader>
          <DialogTitle>Leads</DialogTitle>
        </DialogHeader>

        <LeadTable
          onEdit={() => {}}
          brokerId={String(broker?.id) ?? ''}
          showAction={false}
        />
      </DialogContent>
    </Dialog>
  );
}
