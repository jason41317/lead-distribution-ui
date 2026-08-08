import { cn } from "@/lib/utils";

interface LeadStatusBadgeProps {
  status: string;
}

export function LeadStatusBadge({
  status,
}: LeadStatusBadgeProps) {
  const styles: Record<string, string> = {
    sent: "bg-green-100 text-green-800",
    unsent: "bg-yellow-100 text-yellow-800",
    duplicate: "bg-gray-100 text-gray-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}