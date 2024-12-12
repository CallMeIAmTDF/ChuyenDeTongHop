// "use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


const componentsJob: { title: string; href: string }[] = [
  {
    title: "Việc làm IT theo kĩ năng",
    href: "#",
  },
  {
    title: "Việc làm IT theo cấp bậc",
    href: "#",
  },
  {
    title: "Việc làm IT theo công ty",
    href: "#",
  },
  {
    title: "Việc làm IT theo thành phố",
    href: "#",
  },
];

const componentsCompany: { title: string; href: string }[] = [
    {
      title: "Công Ty IT Tốt Nhất",
      href: "#",
    },
    {
      title: "Review Công Ty",
      href: "#",
    },
  ];

  const componentsBlog: { title: string; href: string }[] = [
    {
      title: "Báo Cáo Lương IT",
      href: "#",
    },
    {
      title: "Sự Nghiệp IT",
      href: "#",
    },
    {
      title: "Ứng Tuyển & Thăng Tiến",
      href: "#",
    },
    {
      title: "Chuyên Môn IT",
      href: "#",
    },
  ];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="[&>button]:bg-black [&>button]:text-white">
          <NavigationMenuTrigger>
            <Link href="/jobs">Việc làm IT</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 p-2 md:w-[250px] lg:w-[250px] bg-black text-white">
                {componentsJob.map(component => 
                    <ListItem key={component.title} href="#" title={component.title}/>
                )}
              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="[&>button]:bg-black [&>button]:text-white">
          <NavigationMenuTrigger>
            <Link href="/top-company">Top Công ty IT</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 p-2 md:w-[250px] lg:w-[250px] bg-black text-white">
                {componentsCompany.map(component => 
                    <ListItem key={component.title} href="#" title={component.title}/>
                )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="[&>button]:bg-black [&>button]:text-white">
          <NavigationMenuTrigger>
            <Link href="/blogs">Blog</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 p-2 md:w-[250px] lg:w-[250px] bg-black text-white">
                {componentsBlog.map(component => 
                    <ListItem key={component.title} href="#" title={component.title}/>
                )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({title, href} : {title: string, href: string}) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">{title}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
} 
