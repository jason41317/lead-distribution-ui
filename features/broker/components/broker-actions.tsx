"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Broker } from "../types/broker";

interface BrokerRowActionsProps {
  broker: Broker;
  onViewLeads: (broker: Broker) => void;
  onEdit: (broker: Broker) => void;
  onDelete: (broker: Broker) => void;
}

export function BrokerRowActions({
  broker,
  onEdit,
  onDelete,
  onViewLeads
}: BrokerRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => onViewLeads(broker)}>
          <Eye className="mr-2 h-4 w-4" />
          View Leads
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(broker)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(broker)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
