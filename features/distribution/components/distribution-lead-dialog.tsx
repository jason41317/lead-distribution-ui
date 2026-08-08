"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lead } from "@/features/lead";

import LeadTable from "@/features/lead/components/lead-table";

interface DistributionLeadDialogProps {
  open: boolean;
  formId: string;
  onOpenChange: (open: boolean) => void;
  onEdit: (lead: Lead) => void;
}

export default function DistributionLeadDialog({
  open,
  formId,
  onOpenChange,
  onEdit
}: DistributionLeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl overflow-y-auto sm:max-h-200">
        <DialogHeader>
          <DialogTitle>Leads</DialogTitle>
        </DialogHeader>

        <LeadTable
          onEdit={onEdit}
          formId={String(formId)}
        />
      </DialogContent>
    </Dialog>
  );
}
