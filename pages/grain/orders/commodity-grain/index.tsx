"use client";

import { useUser } from "@/pages/_app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CommodityGrainPage() {
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "grain-comGrain"
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
      <div>CommodityGrainPage content here</div>
    </>
  );
}
