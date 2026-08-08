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
import { useBrokers } from "@/features/broker";

export default function LeadsPage() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const [brokerId, setBrokerId] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();

  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();
  const { data: brokers } = useBrokers({})

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
        brokerId={brokerId}
        onBrokerIdChange={setBrokerId}
        brokers={brokers?.data.items ?? []}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <LeadTable
        onEdit={handleEdit}
        search={debouncedSearch}
        brokerId={brokerId}
        status={status}
      />

      <LeadDialog
        open={open}
        lead={selectedLead}
        loading={createLead.isPending}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        brokers={brokers?.data.items ?? []}
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
