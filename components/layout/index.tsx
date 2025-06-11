"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { AppSidebar } from "./sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { loadState, saveState } from "@/config/storage";
import transletionsEn from "@/locale/transletionsEn";
import transletionsUz from "@/locale/transletionsUz";
import transletionsRu from "@/locale/transletionsRu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createContext, useContext } from "react";

export const LangContext = createContext({
  changeLangHandler: (lang: string) => {},
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

export default function Layout({ children }: LayoutProps) {
  const selectedLanguage = loadState("lang");
  const [selectedLang, setSelectedLang] = useState(selectedLanguage || "uz");
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <LangContext.Provider value={{ changeLangHandler }}>
      <main className="w-[100%] max-h-screen overflow-hidden">
        <div className="flex">
          <AppSidebar />
          <SidebarInset
            className={`transition-all duration-300 mx-auto ${
              open ? "w-[82%]" : "w-[80%]"
            } `}
          >
            <div className="w-full">
              <header className="flex h-16 w-full shrink-0 items-center gap-2 ">
                <div className="flex items-center justify-between w-full gap-2 px-4 mr-2">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    />
                  </div>
                  <div>
                    <Select
                      value={selectedLang}
                      onValueChange={handleLangChange}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder={t("layout.selectLang")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="uz">O'zbekcha</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </header>
              <div className="p-4 mr-2 pt-0 flex flex-grow h-[70%] overflow-auto flex-col">
                {children}
              </div>
              <footer className="h-40 shrink-0"></footer>
            </div>
          </SidebarInset>
        </div>
      </main>
    </LangContext.Provider>
  );
}
