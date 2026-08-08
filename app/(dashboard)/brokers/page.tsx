"use client";

import { useState } from "react";

import { PageContainer, PageHeader } from "@/components/common";

import BrokerToolbar from "@/features/broker/components/broker-toolbar";
import BrokerTable from "@/features/broker/components/broker-table";
import { useDebounce } from "@/hooks/use-debounce";
import BrokerDialog from "@/features/broker/components/broker-dialog";
import {
  Broker,
  BrokerFormValues,
  useCreateBroker,
  useDeleteBroker,
  useUpdateBroker,
} from "@/features/broker";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import BrokerLeadDialog from "@/features/broker/components/broker-lead-dialog";

export default function BrokersPage() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  const [selectedBroker, setSelectedBroker] = useState<Broker | undefined>();

  const createBroker = useCreateBroker();
  const updateBroker = useUpdateBroker();
  const deleteBroker = useDeleteBroker();

  const handleViewLeads = (broker: Broker) => {
    setSelectedBroker(broker);
    setLeadOpen(true);
  };

  const handleCreate = () => {
    setSelectedBroker(undefined);
    setOpen(true);
  };

  const handleEdit = (broker: Broker) => {
    setSelectedBroker(broker);
    setOpen(true);
  };

  const handleDelete = (broker: Broker) => {
    setSelectedBroker(broker);
    setDeleteOpen(true);
  };

  const handleSubmit = (values: BrokerFormValues) => {
    if (selectedBroker) {
      updateBroker.mutate(
        {
          id: selectedBroker.id,
          data: values,
        },
        {
          onSuccess() {
            toast.success("Broker updated successfully.");
          },
        },
      );
    } else {
      createBroker.mutate(values, {
        onSuccess() {
          toast.success("Broker created successfully.");
        },
      });
    }

    setOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader title="Brokers" description="Manage broker accounts." />

      <BrokerToolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={() => handleCreate()}
      />

      <BrokerTable
        onViewLeads={handleViewLeads}
        onEdit={handleEdit}
        onDelete={handleDelete}
        search={debouncedSearch}
      />

      <BrokerDialog
        open={open}
        broker={selectedBroker}
        loading={createBroker.isPending}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />

      <BrokerLeadDialog
        open={leadOpen}
        onOpenChange={setLeadOpen}
        broker={selectedBroker}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Broker"
        description={`Are you sure you want to delete "${selectedBroker?.name}"?`}
        confirmText="Delete"
        loading={deleteBroker.isPending}
        onConfirm={() => {
          if (!selectedBroker) return;

          deleteBroker.mutate(selectedBroker.id, {
            onSuccess: () => {
              // setSelectedBroker(undefined);
              setDeleteOpen(false);
              toast.success("Broker deleted successfully.");
            },
          });
        }}
      />
    </PageContainer>
  );
}
