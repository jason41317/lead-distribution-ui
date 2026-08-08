"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Distribution } from "../types/distribution";

interface BrokerRowActionsProps {
  distribution: Distribution;
  onViewLeads: (distribution: Distribution) => void;
  onEdit: (distribution: Distribution) => void;
  onDelete: (distribution: Distribution) => void;
}

export function DistributionRowActions({
  distribution,
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
        <DropdownMenuItem onClick={() => onViewLeads(distribution)}>
          <Eye className="mr-2 h-4 w-4" />
          View Leads
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(distribution)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(distribution)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
