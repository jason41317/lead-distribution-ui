"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "./navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/sidebar-provider";
import SidebarToggle from "./sidebar-toggle";

export default function AppSidebar() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "border-r transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="border-b p-5 h-16">
        <h2 className="text-xl font-semibold"><span className={cn(collapsed && "hidden")}>Lead Distribution</span></h2>
        <SidebarToggle />
      </div>

      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted",
                collapsed && "justify-center",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className={cn(collapsed && "hidden")}>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
