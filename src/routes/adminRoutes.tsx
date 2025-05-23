import { Box, User } from "lucide-react";
import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateAdmin from "@/pages/admin/CreateAdmin";
import GetAdmin from "@/pages/admin/GetAdmin";
import CreateItem from "@/pages/item/createItem";
import AllItem from "@/pages/item/allItem";
import CreateSale from "@/pages/sale/CreateSale";
import GetSale from "@/pages/sale/GetSale";

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
  {
    title: "Items Management",
    icon: Box,
    children: [
      {
        title: "Create Item",
        path: "/admin/create-item",
        element: <CreateItem />,
        icon: User,
      },
      {
        title: "Get Items",
        path: "/admin/get-items",
        element: <AllItem />,
        icon: User,
      },
    ],
  },
  {
    title: "Sales Management",
    icon: Box,
    children: [
      {
        title: "Create Sale",
        path: "/admin/create-sale",
        element: <CreateSale />,
        icon: User,
      },
      {
        title: "Get Sales",
        path: "/admin/get-sales",
        element: <GetSale />,
        icon: User,
      },
    ],
  },
];
