"use client";
import {
  ArrowBigUp,
  FolderDot,
  House,
  UserCircle2,
  WholeWord,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "@/app/(manager)/components/nav-user";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Item = {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
};

const items: Item[] = [
  {
    title: "Dash Board",
    url: "/dashboard",
    icon: House,
  },
  {
    title: "Users",
    url: "/users",
    icon: UserCircle2,
  },
  {
    title: "Levels",
    url: "/levels",
    icon: ArrowBigUp,
  },
  {
    title: "Topics",
    url: "/topics",
    icon: FolderDot,
  },
  {
    title: "Words",
    url: "/words",
    icon: WholeWord,
  },
];

export function AppSidebar() {
  const [itemCurrent, setItemCurrent] = useState<Item>();

  useEffect(() => {
    const href = "/" + window.location.href.split("/")[3];
    setItemCurrent(items.find((item) => href.startsWith(item.url)));
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel className="h-[56px] flex items-center justify-center ">
          <Image src={"/logo_black.png"} width={100} height={100} alt="Logo" />
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => setItemCurrent(item)}
                >
                  <SidebarMenuButton
                    asChild
                    size={"md"}
                    className={`hover:bg-[#f7e6e6] ${
                      item === itemCurrent
                        ? "text-[#ed1b2f] bg-red-200 "
                        : "text-gray-500 "
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon
                        className={`${
                          item === itemCurrent
                            ? "text-[#ed1b2f]"
                            : "text-gray-500"
                        }`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
