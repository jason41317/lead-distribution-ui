"use client";

import { useState } from "react";

import { PageContainer, PageHeader } from "@/components/common";

import FormTable from "@/features/form/components/form-table";
import FormDialog from "@/features/form/components/form-dialog";
import {
  Form,
  FormFormValues,
  useCreateForm,
  useDeleteForm,
  useUpdateForm,
} from "@/features/form";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import FormToolBar from "@/features/form/components/form-toolbar";

export default function DistributionPage() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedForm, setSelectedForm] = useState<Form | undefined>();

  const createForm = useCreateForm();
  const updateForm = useUpdateForm();
  const deleteForm = useDeleteForm();

  const handleCreate = () => {
    setSelectedForm(undefined);
    setOpen(true);
  };

  const handleEdit = (form: Form) => {
    setSelectedForm(form);
    setOpen(true);
  };

  const handleDelete = (form: Form) => {
    setSelectedForm(form);
    setDeleteOpen(true);
  };

  const handleSubmit = (values: FormFormValues) => {
    if (selectedForm) {
      updateForm.mutate(
        {
          id: selectedForm.id,
          data: values,
        },
        {
          onSuccess() {
            toast.success("Form updated successfully.");
          },
        },
      );
    } else {
      createForm.mutate(values, {
        onSuccess() {
          toast.success("Form created successfully.");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message ?? error?.message ?? "An error occurred.");
        },
      });
    }

    setOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader title="Forms" description="Manage forms." />

      <FormToolBar
        onAdd={() => handleCreate()}
      />

      <FormTable
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormDialog
        open={open}
        form={selectedForm}
        loading={createForm.isPending}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Form"
        description={`Are you sure you want to delete "${selectedForm?.name}"?`}
        confirmText="Delete"
        loading={deleteForm.isPending}
        onConfirm={() => {
          if (!selectedForm) return;

          deleteForm.mutate(selectedForm.id, {
            onSuccess: () => {
              // setSelectedForm(undefined);
              setDeleteOpen(false);
              toast.success("Form deleted successfully.");
            },
          });
        }}
      />
    </PageContainer>
  );
}
