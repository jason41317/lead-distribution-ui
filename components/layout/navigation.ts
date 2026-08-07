import { LayoutDashboard, Users, GitBranch, Inbox } from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Brokers",
    href: "/brokers",
    icon: Users,
  },
  {
    title: "Distributions",
    href: "/distributions",
    icon: GitBranch,
  },
  {
    title: "Leads",
    href: "/leads",
    icon: Inbox,
  },
];
