"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import SidebarToggle from "./sidebar-toggle";

export default function AppHeader() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">

        {/* <h1 className="text-lg font-semibold">Dashboard</h1> */}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user?.email}</span>

        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
