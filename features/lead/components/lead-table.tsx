"use client";

import { useLeads } from "../hooks/use-lead";

import { PageLoader } from "@/components/common";
import { Lead } from "../types/lead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/common/table-pagination";
import { PaginationMeta } from "@/types/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { LeadFormValues } from "../schemas/lead";
import { LeadRowActions } from "./lead-actions";

interface Props {
  search: string;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export default function LeadTable({ search, onEdit, onDelete }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useLeads({
    search,
    page: currentPage,
    limit: 10,
  });

  if (isLoading) {
    return <PageLoader message="Loading leads..." />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-6">
        Failed to load leads.
      </div>
    );
  }

  const leads = data?.data.items ?? [];
  const pagination = data?.data.meta as PaginationMeta;

  return (
    <>
      <div className="rounded-xl border">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b bg-muted/50">
              <TableHead className="p-4 text-left">Name</TableHead>
              <TableHead className="p-4 text-left">Details</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="border-b">
                <TableCell className="p-4">
                  <span className="flex flex-col gap-1">
                    <span className="font-bold text-lg">{lead.name}</span>
                    <span className="">{lead.email}</span>
                    <span className="">{lead.phone}</span>
                    <span className="">{lead.ipAddress}</span>
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="flex flex-col gap-1">
                    <span className="">{lead.status}</span>
                    <span className="">{lead.form?.name}</span>
                    <span className="">{lead.broker?.name ?? "N/A"}</span>
                  </span>
                </TableCell>

                <TableCell className="p-4 font-bold">
                  {lead.status == "unsent" ? (
                    <LeadRowActions
                      lead={lead}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          currentPage={currentPage}
          meta={pagination}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
