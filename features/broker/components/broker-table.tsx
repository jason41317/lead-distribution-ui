"use client";

import { useBrokers } from "../hooks/use-broker";

import { PageLoader } from "@/components/common";
import { Broker } from "../types/broker";
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
import { BrokerFormValues } from "../schemas/broker";
import { BrokerRowActions } from "./broker-actions";

interface Props {
  search: string;
  onEdit: (broker: Broker) => void;
  onDelete: (broker: Broker) => void;
}

export default function BrokerTable({ search, onEdit, onDelete }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useBrokers({
    search,
    page: currentPage,
    limit: 10,
  });

  if (isLoading) {
    return <PageLoader message="Loading brokers..." />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-6">
        Failed to load brokers.
      </div>
    );
  }

  const brokers = data?.data.items ?? [];
  const pagination = data?.data.meta as PaginationMeta;

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <div className="rounded-xl border">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b bg-muted/50">
              <TableHead className="p-4 text-left">Name</TableHead>
              <TableHead className="p-4 text-left">
                Distribution Hours
              </TableHead>
              <TableHead className="w-10">
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {brokers.map((broker) => (
              <TableRow key={broker.id} className="border-b">
                <TableCell className="p-4">
                  <span className="flex flex-col gap-2">
                    <span className="font-bold text-lg">{broker.name}</span>
                    <span>Daily Cap: {broker.dailyCap}</span>
                    <span className="font-bold">
                      {broker.active ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs">
                          Inactive
                        </span>
                      )}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="flex flex-col justify-center gap-2">
                    <span>{broker.timezone}</span>
                    <span>
                      {broker.openingTime} - {broker.closingTime}
                    </span>
                    <span className="font-semibold flex flex-wrap gap-2 max-w-[300px]">
                      {broker.workingDays
                        .sort((a, b) => Number(a) - Number(b))
                        .map((dayNum) => (
                          <span
                            key={dayNum}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                          >
                            {dayNames[Number(dayNum)]}
                          </span>
                        ))}
                    </span>
                  </span>
                </TableCell>

                <TableCell className="p-4 font-bold">
                  <BrokerRowActions
                    broker={broker}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
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
