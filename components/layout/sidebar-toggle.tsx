"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/providers/sidebar-provider";

export default function SidebarToggle() {
  const { collapsed, toggle } = useSidebar();

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      {collapsed ? (
        <PanelLeftOpen className="h-5 w-5" />
      ) : (
        <PanelLeftClose className="h-5 w-5" />
      )}
    </Button>
  );
}
