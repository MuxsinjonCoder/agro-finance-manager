"use client";

import * as React from "react";

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from "lucide-react";

import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSidebarItems } from "@/constants/sidebar-items";
import SidebarFooterMenu from "./sidebar-footer-menu";
import SidebarNavigation from "./sidebar-navigation";
import SidebarProjects from "./sidebar-projects";
import Image from "next/image";
import Link from "next/link";

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebarItems = getSidebarItems();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={teams} /> */}
        <Link href={"/"}>
          <div className="flex items-center space-x-2 ">
            <Image src="/logo.png" width={40} height={40} alt="Logo" />
            <div>
              <h1 className="text-2xl font-bold group-data-[collapsible=icon]:hidden">
                AGROFIN
              </h1>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation sidebarItems={sidebarItems} />
        {/* <SidebarProjects projects={projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
