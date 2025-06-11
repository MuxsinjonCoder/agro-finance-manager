"use client";

import { BadgeCheck, Bell, LogOut, SortAsc, Sparkles } from "lucide-react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/pages/_app";
import { signOut } from "next-auth/react";
import { loadState } from "@/config/storage";

const getInitials = (fullName: string | undefined): string | undefined => {
  const names = fullName?.split(" ");
  return names
    ?.map((name) => name[0])
    .join("")
    .toUpperCase();
};

export default function SidebarFooterMenu() {
  const { isMobile } = useSidebar();

  const user: any = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={""} alt={user?.user?.data?.fullName} />
                <AvatarFallback className="rounded-lg text-[#3BB5DC]">
                  {getInitials(user?.user?.data?.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.user?.data?.fullName}
                </span>
                <span className="truncate text-xs">
                  {user?.user?.data?.email}
                </span>
              </div>
              <SortAsc className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={""} alt={user?.user?.data?.fullName} />
                  <AvatarFallback className="rounded-lg text-[#3BB5DC]">
                    {getInitials(user?.user?.data?.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.user?.data?.fullName || "----"}
                  </span>
                  <span className="truncate text-xs">
                    {user?.user?.data?.email || "-----"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                Cookies.remove("token"), signOut({ redirect: true });
              }}
              className="text-red-600 hover:text-red-400"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
