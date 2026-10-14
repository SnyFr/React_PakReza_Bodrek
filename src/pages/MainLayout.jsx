import { Outlet, useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/AppSidebar";
import { useEffect } from "react";

export default function MainLayout() {
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }
  // }, [token]);

  return (
    <SidebarProvider>
      {/* Sidebar Navigasi */}
      <AppSidebar />

      {/* Konten Utama */}
      <SidebarInset className="min-w-0">
        {/* Header Bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 shadow-md bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium text-muted-foreground">
            Dashboard
          </span>
        </header>

        {/* Konten Halaman */}
        <main className="flex-1 p-6 bg-muted/20">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
