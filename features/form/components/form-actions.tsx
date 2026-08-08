"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Form } from "../types/form";

interface BrokerRowActionsProps {
  form: Form;
  onPreview: (form: Form) => void;
  onEdit: (form: Form) => void;
  onDelete: (form: Form) => void;
}

export function FormRowActions({
  form,
  onPreview,
  onEdit,
  onDelete,
}: BrokerRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => onPreview(form)}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(form)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(form)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
