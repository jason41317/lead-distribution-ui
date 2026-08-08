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
import { LeadStatusBadge } from "./lead-status-badge";

interface Props {
  search?: string;
  brokerId?: string;
  formId?: string;
  status?: string;
  onEdit: (lead: Lead) => void;
  showAction?: boolean;
}

export default function LeadTable({ search, brokerId, formId, status, onEdit, showAction = true }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useLeads({
    search,
    brokerId,
    formId,
    status,
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
                  <span className="flex flex-col gap-1 justify-center items-start">
                    {/* <span className="border">{lead.status}</span> */}
                    <span className="">Lead Form : {lead.form?.name}</span>
                    <span className="">Broker : {lead.broker?.name ?? "N/A"}</span>
                    <LeadStatusBadge status={lead.status} />
                  </span>
                </TableCell>

                <TableCell className="p-4 font-bold">
                  {showAction && lead.status == "unsent" ? (
                    <LeadRowActions
                      lead={lead}
                      onEdit={onEdit}
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
