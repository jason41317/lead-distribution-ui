"use client";

import { useState } from "react";

import { PageContainer, PageHeader } from "@/components/common";

import DistributionTable from "@/features/distribution/components/distribution-table";
import DistributionDialog from "@/features/distribution/components/distribution-dialog";
import {
  Distribution,
  DistributionFormValues,
  useCreateDistribution,
  useDeleteDistribution,
  useShowDistribution,
  useUpdateDistribution,
} from "@/features/distribution";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import DistributionToolBar from "@/features/distribution/components/distribution-toolbar";
import { useForms } from "@/features/form";
import { useBrokers } from "@/features/broker";

export default function DistributionPage() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDistribution, setSelectedDistribution] = useState<
    Distribution | undefined
  >();

  const [selectedDistributionId, setSelectedDistributionId] =
    useState<number>(0);

  const createDistribution = useCreateDistribution();
  const updateDistribution = useUpdateDistribution();
  const deleteDistribution = useDeleteDistribution();
  const {
    data: distributionData,
    refetch: refetchDistribution,
    isFetching: isFetchingDistribution,
  } = useShowDistribution(selectedDistributionId);

  const { data: brokers } = useBrokers({});

  const { data: forms, refetch, isFetching } = useForms(false);

  const handleCreate = async () => {
    const { data } = await refetch();
    const d: any = data?.data;
    if (!d.length) {
      toast.error("Oops, please create a form first.");
      return;
    }
    setSelectedDistribution(undefined);
    setOpen(true);
  };

  const handleEdit = async (distribution: Distribution) => {
    setSelectedDistributionId(distribution.id);
    const { data } = await refetchDistribution();
    await refetch();
    // console.log(distributionData);
    setSelectedDistribution(data?.data);
    setOpen(true);
  };

  const handleDelete = (distribution: Distribution) => {
    setSelectedDistribution(distribution);
    setDeleteOpen(true);
  };

  const handleSubmit = (values: DistributionFormValues) => {
    if (selectedDistribution) {
      updateDistribution.mutate(
        {
          id: selectedDistribution.id,
          data: values,
        },
        {
          onSuccess() {
            toast.success("Distribution updated successfully.");
            setOpen(false);
          },
        },
      );
    } else {
      createDistribution.mutate(values, {
        onSuccess() {
          toast.success("Distribution created successfully.");
          setOpen(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
              error?.message ??
              "An error occurred.",
          );
        },
      });
    }
  };

  return (
    <PageContainer>
      <PageHeader title="Distributions" description="Manage distributions." />

      <DistributionToolBar onAdd={() => handleCreate()} />

      <DistributionTable onEdit={handleEdit} onDelete={handleDelete} />

      <DistributionDialog
        open={open && !isFetchingDistribution}
        distribution={selectedDistribution}
        loading={createDistribution.isPending}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        forms={(forms?.data as any) ?? []}
        brokers={brokers?.data.items ?? []}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Distribution"
        description={`Are you sure you want to delete "${selectedDistribution?.name}"?`}
        confirmText="Delete"
        loading={deleteDistribution.isPending}
        onConfirm={() => {
          if (!selectedDistribution) return;

          deleteDistribution.mutate(selectedDistribution.id, {
            onSuccess: () => {
              // setSelectedDistribution(undefined);
              setDeleteOpen(false);
              toast.success("Distribution deleted successfully.");
            },
          });
        }}
      />
    </PageContainer>
  );
}
