"use client";

import { useState } from "react";

import { PageContainer, PageHeader } from "@/components/common";

import LeadToolbar from "@/features/lead/components/lead-toolbar";
import LeadTable from "@/features/lead/components/lead-table";
import { useDebounce } from "@/hooks/use-debounce";
import LeadDialog from "@/features/lead/components/lead-dialog";
import {
  Lead,
  LeadFormValues,
  useCreateLead,
  useDeleteLead,
  useUpdateLead,
} from "@/features/lead";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";

export default function LeadsPage() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();

  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();

  const handleCreate = () => {
    setSelectedLead(undefined);
    setOpen(true);
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setOpen(true);
  };

  const handleDelete = (lead: Lead) => {
    setSelectedLead(lead);
    setDeleteOpen(true);
  };

  const handleSubmit = (values: LeadFormValues) => {
    if (selectedLead) {
      updateLead.mutate(
        {
          id: selectedLead.id,
          data: values,
        },
        {
          onSuccess() {
            toast.success("Lead updated successfully.");
          },
        },
      );
    } else {
      createLead.mutate(values, {
        onSuccess() {
          toast.success("Lead created successfully.");
        },
      });
    }

    setOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader title="Leads" description="Manage lead accounts." />

      <LeadToolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={() => handleCreate()}
      />

      <LeadTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        search={debouncedSearch}
      />

      <LeadDialog
        open={open}
        lead={selectedLead}
        loading={createLead.isPending}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Lead"
        description={`Are you sure you want to delete "${selectedLead?.name}"?`}
        confirmText="Delete"
        loading={deleteLead.isPending}
        onConfirm={() => {
          if (!selectedLead) return;

          deleteLead.mutate(selectedLead.id, {
            onSuccess: () => {
              // setSelectedLead(undefined);
              setDeleteOpen(false);
              toast.success("Lead deleted successfully.");
            },
          });
        }}
      />
    </PageContainer>
  );
}
