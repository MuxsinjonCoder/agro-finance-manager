"use client";

import { useTranslation } from "react-i18next";
import StorageAssignmentsTable from "../../../components/grain/storage-agree/components/table";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import AddModal from "@/components/grain/storage-agree/components/add-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function StorageAgreementPage() {
  // halpers
  const { t } = useTranslation();
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "grain-storageAgree"
  );

  // states
  const [addModal, setAddModal] = useState(false);

  // use effect
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
      <div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("layout.nav.storageAgree")}
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
          <StorageAssignmentsTable />
        </div>
      </div>

      {/* add modal */}
      <AddModal addModal={addModal} setAddModal={setAddModal} />
    </>
  );
}
