"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface LeadToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
}

export default function LeadToolbar({
  search,
  onSearchChange,
  onAdd,
}: LeadToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Search leads..."
        className="max-w-sm"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Lead
      </Button> */}
    </div>
  );
}
