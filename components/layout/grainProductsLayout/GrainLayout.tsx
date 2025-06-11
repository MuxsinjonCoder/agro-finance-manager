// import { ReactNode } from "react";

// const GrainProductsLayout = ({ children }: { children: ReactNode }) => {
//   return (
//     <div className="w-full">
//      {children}
//     </div>
//   );
// };

// export default GrainProductsLayout;

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarInset,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { loadState, saveState } from "@/config/storage";
import transletionsEn from "@/locale/transletionsEn";
import transletionsRu from "@/locale/transletionsRu";
import transletionsUz from "@/locale/transletionsUz";
import i18n from "i18next";
import Cookies from "js-cookie";
import { ChevronDown, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { createContext, ReactNode, useEffect, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useUser } from "../../../pages/_app";
import { Avatar } from "../../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { GrainSidebar } from "../sidebar/grain-sidebar";
import Link from "next/link";

export const LangContext = createContext({
  changeLangHandler: (lang: string) => { },
});

interface LayoutProps {
  readonly children: ReactNode;
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: transletionsEn },
    uz: { translation: transletionsUz },
    ru: { translation: transletionsRu },
  },
  lng: "uz",
  fallbackLng: "uz",
});

export default function GrainProductsLayout({ children }: LayoutProps) {
  const selectedLanguage = loadState("lang");
  const [selectedLang, setSelectedLang] = useState(selectedLanguage || "uz");
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useUser();

  const { open } = useSidebar();

  const changeLangHandler = (lang: string) => {
    setSelectedLang(lang);
    saveState("lang", lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (selectedLanguage) {
      setSelectedLang(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
    }
  }, []);

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    saveState("lang", lang);
    i18n.changeLanguage(lang);
    changeLangHandler(lang);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Chiqmoqchimisiz?",
      text: "Siz tizimdan chiqmoqchimisiz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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

  return (
    <LangContext.Provider value={{ changeLangHandler }}>
      <main className="w-full max-h-screen overflow-hidden flex flex-col">
        {/* Navbar at the top */}
        <header className="flex h-16 w-full shrink-0 items-center gap-2 bg-sidebar text-white z-10 border-b">
          <div className="flex items-center justify-between w-full gap-2 px-4 mr-2">
            <div className="flex items-center gap-4">
              {/* Sidebar toggle + Logo moved here */}
              <div className="flex items-center justify-between md:w-[240px]">
                <a href="/" className="text-xl font-bold text-white">
                  galla.uz
                </a>
                {/* <Button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  variant="ghost"
                  size="icon"
                  className="ml-4 text-white"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                  <Menu size={20} />
                </Button> */}
                <SidebarTrigger />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="items-center gap-2 hidden md:flex">
                <div className="text-sm">{t('buttons.help')}:</div>
                <a
                  href="https://t.me/+998787778484"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-md text-gray-700 p-2 flex items-center gap-2 hover:bg-gray-100 active:scale-[0.99] transition-all duration-200"
                >
                  <Image
                    src="/images/telegram.png"
                    alt="telegram_icon"
                    width={15}
                    height={15}
                  />
                  +998 (78) 777-84-84
                </a>
              </div>
              <Select value={selectedLang} onValueChange={handleLangChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={t("layout.selectLang")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="uz">O'zbekcha</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden md:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent w-36 data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="size-8 rounded-full bg-white text-primary flex items-center justify-center">
                        {/* <AvatarFallback className="text-[#3BB5DC]"> */}
                        {user?.data?.fullName?.charAt(0).toUpperCase()}
                        {/* </AvatarFallback> */}
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {t('buttons.profile')}
                        </span>
                      </div>
                      <ChevronDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white text-primary"
                    // side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <Link href="/profile" >
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-pointer hover:bg-gray-100 active:scale-[0.99] transition-all duration-200">
                          <Avatar className="size-8 rounded-full bg-white shadow-lg text-primary flex items-center justify-center">
                            {/* <AvatarFallback className="text-[#3BB5DC]"> */}
                            {user?.data?.fullName?.charAt(0).toUpperCase()}
                            {/* </AvatarFallback> */}
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                              {user?.data?.fullName || "----"}
                            </span>
                            <span className="truncate text-xs">
                              {user?.data?.email || "-----"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        handleLogout();
                      }}
                      className="text-red-600 hover:text-red-400"
                    >
                      <LogOut />
                      {t("buttons.signOut")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

            </div>
          </div>
        </header>


        {/* Sidebar + Main content */}
        <div className="flex flex-grow w-full h-full overflow-hidden">
          <GrainSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <SidebarInset
            className={`transition-all duration-300 mx-auto ${open ? "w-[82%]" : "w-[80%]"
              }`}
          >
            <div className="w-full h-full flex flex-col">
              <div className="p-4 pt-0 flex-grow overflow-auto">{children}</div>
              {/* <footer className="h-40 shrink-0" /> */}
            </div>
          </SidebarInset>
        </div>
      </main>

    </LangContext.Provider>
  );
}
