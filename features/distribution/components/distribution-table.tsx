"use client";

import { useDistributions } from "../hooks/use-distribution";

import { PageLoader } from "@/components/common";
import { Distribution } from "../types/distribution";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DistributionRowActions } from "./distribution-actions";

interface Props {
  onViewLeads: (distribution: Distribution) => void;
  onEdit: (distribution: Distribution) => void;
  onDelete: (distribution: Distribution) => void;
}

export default function FormTable({ onEdit, onViewLeads, onDelete }: Props) {
  const { data, isLoading, error } = useDistributions();

  if (isLoading) {
    return <PageLoader message="Loading distributions..." />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-6">
        Failed to load distributions.
      </div>
    );
  }

  const distributions: Distribution[] = (data?.data ?? []) as Distribution[];

  return (
    <>
      <div className="rounded-xl border">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b bg-muted/50">
              <TableHead className="p-4 text-left">Name</TableHead>
              <TableHead className="p-4 text-left">
                Form
              </TableHead>
              <TableHead className="p-4 text-left w-10">

              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {distributions.map((distribution) => (
              <TableRow key={distribution.id} className="border-b">
                <TableCell className="p-4">
                  {distribution.name}
                </TableCell>
                <TableCell className="p-4">
                  {distribution.form.name}
                </TableCell>

                <TableCell className="p-4 font-bold">
                  <DistributionRowActions
                    distribution={distribution}
                    onViewLeads={onViewLeads}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
