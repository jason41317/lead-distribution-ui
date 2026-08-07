"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FormForm from "./form-form";
import { Form } from "../types/form";
import { FormFormValues } from "../schemas/form";

interface FormDialogProps {
  open: boolean;
  form?: Form;
  loading?: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormFormValues) => void;
}

export default function FormDialog({
  open,
  form,
  loading,
  onOpenChange,
  onSubmit,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{form ? "Edit Form" : "Add Form"}</DialogTitle>
        </DialogHeader>

        <FormForm
          loading={loading}
          defaultValues={form as FormFormValues}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
