import { TSidebarItem, TUserPath } from "@/types/sidebar.type";

export const sidebarItemsGenerator = (items: TUserPath[])=> {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.title && item.icon) {
      // Add the parent item to the sidebar
      acc.push({
        title: item.title,
        url: item.path, // Direct path for the parent item
        icon: item.icon,
        // If the item has children, add them as sub-items
        children: item.children ? item.children.map((child) => ({
          title: child.title,
          icon: child.icon,
          url: child.path // Add child path correctly
        })) : undefined, // Only add 'children' if they exist
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
