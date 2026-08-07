"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem("sidebar");

    if (value) {
      setCollapsed(value === "collapsed");
    }
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;

      localStorage.setItem("sidebar", next ? "collapsed" : "expanded");

      return next;
    });
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider.");
  }

  return context;
}
