"use client";

import { useTranslation } from "react-i18next";
import RequiredAssignmentsTable from "../../../components/grain/req-assign/components/table";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddModal from "@/components/grain/req-assign/components/add-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GrainReceiptPage() {
  // helpers
  const { t } = useTranslation();
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "grain-requiredAssign"
  );

  // states
  const [addModal, setAddModal] = useState(false);
  const [searchValues, setSearchValues] = useState<any | null>("");

  // use effects
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
      <div className="h-[95vh]">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("layout.nav.requiredAssign")}
            </h2>
            <div>
              <Button
                onClick={() => {
                  setAddModal(true);
                }}
              >
                <Plus className="size-3 lg:size-5" />
                {t("modals.addCont")}
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-5 overflow-auto">
          <RequiredAssignmentsTable />
        </div>
      </div>

      {/* add modal */}
      <AddModal addModal={addModal} setAddModal={setAddModal} />
    </>
  );
}
