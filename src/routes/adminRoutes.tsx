import CreateAdmin from "@/pages/admin/createAdmin";
import GetAdmin from "@/pages/admin/getAdmin";
import { User } from "lucide-react";
import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import AdminDashboard from "@/pages/admin/AdminDashboard";

export type TAdminPath = {
  title: string;
  path?: string;
  element?: ReactNode;
  icon: LucideIcon;
  children?: TAdminPath[];
};

export const adminPaths = [
  {
    title: "Dashboard",
    path: "Dashboard",
    element: <AdminDashboard />,
    icon: User,
  },
  {
    title: "User Management",
    icon: User,
    children: [
      {
        title: "Create Admin",
        path: "/admin/create-admin",
        element: <CreateAdmin />,
        icon: User,
      },
      {
        title: "Get Admins",
        path: "/admin/get-admin",
        element: <GetAdmin />,
        icon: User,
      },
    ],
  },
];
