import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem =
  | {
      title: string;
      url?: string | ReactNode;
      icon: LucideIcon;
      children?: TSidebarItem[];
    };

export type TUserPath = {
  title: string;
  path?: string;
  element?: ReactNode;
  icon: LucideIcon;
  children?: TUserPath[];
};
