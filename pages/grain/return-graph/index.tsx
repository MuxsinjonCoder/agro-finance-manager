"use client";

import { useTranslation } from "react-i18next";
import ReturnGraphsTable from "../../../components/grain/return-graph/components/table";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ReturnRraphPage() {
  const { t } = useTranslation();

  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "grain-returnGraph"
  );

  useEffect(() => {
    if (
      !access?.length &&
      access?.length != undefined &&
      access?.length != "undefined"
    ) {
      toast.error("Sizga bu sahifa uchun ruxsat yo'q!!!");
      router.push("/sitemap");
    }
  }, [access]);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("layout.nav.returnGraph")}
          </h2>
        </div>
      </div>
      {/* <div className="my-10 max-w-[80vw] overflow-hidden"> */}
      <div className="mt-5 overflow-auto">
        <ReturnGraphsTable />
      </div>
    </>
  );
}
