import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { Outlet } from "react-router-dom";
import "./MainLayout.css"; 

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="outlet-container">
        <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
