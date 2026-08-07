import { SidebarProvider } from "@/providers/sidebar-provider";
import AppSidebar from "./sidebar";
import AppHeader from "./header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          <AppHeader />

          <main className="flex-1 overflow-auto bg-muted/30 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
