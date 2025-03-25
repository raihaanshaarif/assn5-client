import { TSidebarItem, TUserPath } from "@/types/sidebar.type";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.title && item.icon) {
      acc.push({
        title: item.title,
        url: item.path,
        icon: item.icon,
      });
    }

    if (item.children) {
      acc.push({
        title: item.title,
        url: item.path,
        icon: item.icon,
        children: item.children.map((child) => {
          if (child.title) {
            return {
              title: child.title,
              icon: child.icon,
              url: (
                <NavLink to={`/${role}/${child.path}`}>{child.title}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
