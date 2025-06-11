"use client";

import Cookies from "js-cookie";
import { Factory, Home, LogOut, Shield, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useUser } from "../../../pages/_app";
import { Sidebar, SidebarContent } from "../../ui/sidebar";
import SidebarNavigation from "./sidebar-navigation";
import Link from "next/link";

export function GrainSidebar({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { user } = useUser();
    const router = useRouter();
    const { t } = useTranslation();
    const handleLogout = () => {
        Swal.fire({
            title: "Chiqmoqchimisiz?",
            text: "Siz tizimdan chiqmoqchimisiz?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ha",
            cancelButtonText: "Yo'q",
        }).then((result) => {
            if (result.isConfirmed) {
                signOut({ redirect: false });
                Cookies.remove("token");
            }
        }
        );
    };

    const sidebarItems = [
        {
            id: 2,
            label: t("grainProducts.title"),
            items: [
                {
                    title: t("grainProducts.regions.title"),
                    path: "/grain-products/region",
                    icon: Home,
                    isActive: true,
                },
                {
                    title: t("grainProducts.corporations.title"),
                    path: "/grain-products/corporations",
                    icon: Shield,
                    isActive: true,
                },
                {
                    title: t("grainProducts.closedCapacity.title"),
                    path: "/grain-products",
                    icon: Factory,
                    isActive: true,
                },
            ],
        },
    ];
    return (
        <Sidebar collapsible="icon" className="bg-white">
            <SidebarContent>
                <Link href='/profile'>
                    <div
                        className="flex items-center space-x-3 text-black 
                    p-3 rounded-lg bg-gray-100 m-2 group-data-[collapsible=icon]:hidden
                    cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-200">
                        <div className="bg-[#29ABE2] p-2 rounded-lg">
                            <User size={32} className="text-white" />
                        </div>
                        <div>
                            <span className="block text-sm font-bold">{user?.data.fullName?.toUpperCase()}</span>
                        </div>
                    </div>
                </Link>

                <div className="hidden group-data-[collapsible=icon]:flex">
                    <SidebarNavigation
                        sidebarItems={[{
                            id: 1,
                            label: t("layout.nav.grainProducts"),
                            items: [
                                {
                                    title: t("layout.nav.overview"),
                                    path: "/profile",
                                    icon: User,
                                }],
                        }]}
                    />
                </div>

                <SidebarNavigation sidebarItems={sidebarItems} />

                {/* 🔒 Log Out button */}
                <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-white hover:bg-white hover:text-primary p-2 rounded-md transition-all duration-200 cursor-pointer mx-2"
                >
                    <LogOut size={20} />
                    <span className="text-left group-data-[collapsible=icon]:hidden">{t('buttons.signOut')}</span>
                </div>
            </SidebarContent>

            {/* <div
                className={`transition-all duration-300 border-r bg-white ${isOpen ? "w-64" : "w-0"
                    }`}
            >
                {isOpen && (
                    <div className="p-4">
                        <div className="flex items-center space-x-3 text-black p-3 rounded-lg bg-gray-100 mb-4">
                            <div className="bg-[#29ABE2] p-2 rounded-lg">
                                <User size={32} className="text-white" />
                            </div>
                            <div>
                                <span className="block text-sm font-bold">{user?.data.fullName?.toUpperCase()}</span>
                            </div>
                        </div>

                        <nav>
                            <ul className="flex flex-col gap-1">
                                <li className={`flex items-center gap-3 text-blue-900 hover:bg-primary hover:text-white p-2 rounded-md transition-all duration-200 cursor-pointer 
        ${router.pathname.startsWith("/grain-products/region") ? "bg-primary text-white" : ""}`}>
                                    <Link href="/grain-products/region" className="flex items-center gap-3 w-full">
                                        <Home size={20} />
                                        {isOpen && <span className="text-left">Xududlar bo‘yicha</span>}
                                    </Link>
                                </li>

                                <li className={`flex items-center gap-3 text-blue-900 hover:bg-primary hover:text-white p-2 rounded-md transition-all duration-200 cursor-pointer 
    ${router.pathname === "/grain-products" ? "bg-primary text-white" : ""}`}>
                                    <Link href="/grain-products" className="flex items-center gap-3 w-full">
                                        <Factory size={20} />
                                        {isOpen && <span className="text-left">Korxonalar bo‘yicha</span>}
                                    </Link>
                                </li>


                                <li className={`flex items-center gap-3 text-blue-900 hover:bg-primary hover:text-white p-2 rounded-md transition-all duration-200 cursor-pointer 
        ${router.pathname.startsWith("/grain-products/corporations") ? "bg-primary text-white" : ""}`}>
                                    <Link href="/grain-products/corporations" className="flex items-center gap-3 w-full">
                                        <Shield size={20} />
                                        {isOpen && <span className="text-left">Yopiq sig‘im</span>}
                                    </Link>
                                </li>

                                <li
                                    onClick={() => { handleLogout(); }}
                                    className="flex items-center gap-3 text-blue-900 hover:bg-primary hover:text-white p-2 rounded-md transition-all duration-200 cursor-pointer">
                                    <LogOut size={20} />
                                    {isOpen && <span className="text-left">Chiqish</span>}
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div> */}
        </Sidebar>
    );
}
