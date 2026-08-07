"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface FormToolbarProps {
  onAdd: () => void;
  showAddButton?: boolean;
}

export default function FormToolBar({
  onAdd,
  showAddButton = true,
}: FormToolbarProps) {
  return (
    <div
      className={cn(
        "mb-6  flex-col gap-4 md:flex-row md:items-center md:justify-end",
        showAddButton ? "flex" : "hidden"
      )}
    >
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Distribution
      </Button>
    </div>
  );
}
