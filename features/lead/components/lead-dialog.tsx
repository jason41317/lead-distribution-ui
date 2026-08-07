"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// import LeadForm from "./lead-form";
import { Lead } from "../types/lead";
import { LeadFormValues } from "../schemas/lead";

interface LeadDialogProps {
  open: boolean;
  lead?: Lead;
  loading?: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (values: LeadFormValues) => void;
}

export default function LeadDialog({
  open,
  lead,
  loading,
  onOpenChange,
  onSubmit,
}: LeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{lead ? "Edit Lead" : "Add Lead"}</DialogTitle>
        </DialogHeader>

        {/* <LeadForm
          loading={loading}
          defaultValues={lead as LeadFormValues}
          onSubmit={onSubmit}
        /> */}
      </DialogContent>
    </Dialog>
  );
}
