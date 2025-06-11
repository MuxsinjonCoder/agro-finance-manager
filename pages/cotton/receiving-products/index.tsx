"use client";

import { useUser } from "@/pages/_app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function ReceivingProductsPage() {
  const { t } = useTranslation();

  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "cotton-receivingProducts"
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
      <div className="w-full min-w-[500px]">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("layout.nav.receivingProducts")}
          </h2>
        </div>
      </div>
    </>
  );
}
