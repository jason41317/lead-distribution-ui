"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Lead } from "../types/lead";

interface LeadRowActionsProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
}

export function LeadRowActions({
  lead,
  onEdit,
}: LeadRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => onEdit(lead)}>
          <Pencil className="mr-2 h-4 w-4" />
          Send to Broker
        </DropdownMenuItem>

        {/* <DropdownMenuItem
          onClick={() => onDelete(lead)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
