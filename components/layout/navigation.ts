import { LayoutDashboard, Users, GitBranch, Inbox, Form } from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Lead Form",
    href: "/forms",
    icon: Form,
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
