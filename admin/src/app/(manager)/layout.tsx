import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(manager)/components/app-sidebar";
import { cookies } from "next/headers";
import { AppHeader } from "@/app/(manager)/components/app-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="flex">
      <AppSidebar />
        <SidebarInset 
        // sau không dùng insert thì bỏ đi classnames
        className="w-full rounded-md ">
            <AppHeader />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
    </SidebarProvider>
  );
}
