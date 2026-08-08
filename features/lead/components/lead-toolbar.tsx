"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Broker } from "@/features/broker";

interface LeadToolbarProps {
  search: string;
  brokerId: string;
  onBrokerIdChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  brokers: Broker[];
}

export default function LeadToolbar({
  search,
  brokerId,
  onSearchChange,
  onBrokerIdChange,
  status,
  onStatusChange,
  brokers
}: LeadToolbarProps) {

  const statuses = [
    'sent',
    'unsent',
    'duplicate',
    'failed'
  ]

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
      <Input
        placeholder="Search leads..."
        className="max-w-sm"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Select
        value={brokerId}
        onValueChange={onBrokerIdChange}
      >
        <SelectTrigger className="min-w-sm">
          <SelectValue placeholder="Broker"/>
        </SelectTrigger>

        <SelectContent>
          {brokers.map((option) => (
            <SelectItem key={String(option.id)} value={String(option.id)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={status}
        onValueChange={onStatusChange}
      >
        <SelectTrigger className="min-w-sm">
          <SelectValue placeholder="Status"/>
        </SelectTrigger>

        <SelectContent>
          {statuses.map((option, key) => (
            <SelectItem key={key} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      

      {/* <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Lead
      </Button> */}
    </div>
  );
}
