"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface FormToolbarProps {
  onAdd: () => void;
}

export default function FormToolBar({
  onAdd,
}: FormToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Form
      </Button>
    </div>
  );
}
