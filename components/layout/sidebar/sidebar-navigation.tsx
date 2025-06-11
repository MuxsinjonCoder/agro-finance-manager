"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/constants/sidebar-items";
import { useSidebar } from "@/components/ui/sidebar";

interface SidebarNavigationProps {
  readonly sidebarItems: NavGroup[];
}

export default function SidebarNavigation({
  sidebarItems,
}: SidebarNavigationProps) {
  const router = useRouter();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { open } = useSidebar();

  const handleToggle = (itemId: string) => {
    setOpenItem((prev) => (prev === itemId ? null : itemId));
  };

  const handleNavigation = (path: string) => {
    if (path.includes("[")) {
      // For dynamic routes, redirect to a base path or handle differently
      const basePath = path.split("/[")[0];
      router.push(basePath);
    } else {
      router.push(path);
    }
  };

  return (
    <>
      {sidebarItems.map((navGroup) => (
        <SidebarGroup key={navGroup.id}>
          {navGroup.label && (
            <SidebarGroupLabel>{navGroup.label}</SidebarGroupLabel>
          )}
          <SidebarMenu>
            {navGroup.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.subItems && !open ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="flex items-center gap-2 w-full hover:bg-accent"
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto w-4 h-4" />
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      align="start"
                      className="w-56 p-0 ml-2"
                    >
                      <div className="flex flex-col border border-primary rounded-lg">
                        {item.subItems.map((subItem) => (
                          <div
                            key={subItem.title}
                            onClick={() => handleNavigation(subItem.path)}
                            className="cursor-pointer px-2 py-1.5 text-[13px] hover:bg-white hover:text-primary flex items-center gap-2"
                          >
                            {subItem.icon && (
                              <subItem.icon className="w-3 h-3 shrink-0" />
                            )}
                            <span>{subItem.title}</span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Collapsible
                    open={openItem === item.title}
                    onOpenChange={() => handleToggle(item.title)}
                    className="group/collapsible"
                  >
                    <CollapsibleTrigger asChild>
                      <Link href={item.path || "#"}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="flex items-center gap-2"
                        >
                          {item.icon && <item.icon className="w-5 h-5" />}
                          <span>{item.title}</span>
                          {item.subItems && (
                            <ChevronRight className="ml-auto w-4 h-4 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                          )}
                        </SidebarMenuButton>
                      </Link>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <SidebarMenuSub className="pl-4">
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem
                              onClick={() => handleNavigation(subItem.path)}
                              className="cursor-pointer"
                              key={subItem.title}
                            >
                              <SidebarMenuSubButton>
                                <Link
                                  className="flex text-[13px] w-full items-center gap-2"
                                  href={subItem.path}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="w-3 h-3 shrink-0" />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
