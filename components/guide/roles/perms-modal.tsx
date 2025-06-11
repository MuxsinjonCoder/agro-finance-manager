import CommonModal from "../../CommonModal";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Check, CircleCheckBig, X } from "lucide-react";

// Static data for testing
const staticSelectedRole = {
  dtoList: [
    {
      id: "1",
      name: "grain-dashboard",
      actions: ["read"],
    },
    {
      id: "2",
      name: "grain-users",
      actions: ["read", "all"],
    },
    {
      id: "3",
      name: "cotton-reports",
      actions: ["read"],
    },
    {
      id: "4",
      name: "guide-settings",
      actions: ["all"],
    },
  ],
};

export default function PermissionsModalData({
  selectedRole = staticSelectedRole,
}) {
  const { t } = useTranslation();

  const permissions = selectedRole?.dtoList || [];

  const actionMapping = {
    read: "Ko'rish",
    all: "Barchasi",
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="flex items-center justify-between">
            <th className="border w-[60%] truncate px-4 py-2 font-medium">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="truncate">Huquqlar</div>
                  </TooltipTrigger>
                  <TooltipContent>Huquqlar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </th>
            <th className="border w-[30%] truncate px-4 py-2 font-medium">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="truncate">{t("roles.get")}</div>
                  </TooltipTrigger>
                  <TooltipContent>{t("roles.get")}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </th>
            <th className="border w-[30%] truncate px-4 py-2 font-medium">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="truncate">To'liq ruxasat berilgan</div>
                  </TooltipTrigger>
                  <TooltipContent>To'liq ruxasat berilgan</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </th>
          </tr>
        </thead>
        <tbody>
          {permissions.length > 0 ? (
            permissions.map((perm) => (
              <tr key={perm.id} className="flex items-center justify-between">
                <td className="border w-[60%] truncate px-4 py-2 font-medium">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="w-[88%] truncate">
                          {t(`layout.nav.${perm.name.split("-").pop()}`)}{" "}
                          <span className="opacity-50">
                            (
                            {perm.name.split("-")[0] === "grain"
                              ? t("layout.nav.grain")
                              : perm.name.split("-")[0] === "cotton"
                              ? t("layout.nav.cotton")
                              : "boshqa"}
                            )
                          </span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className="w-[88%] truncate">
                          {t(`layout.nav.${perm.name.split("-").pop()}`)}{" "}
                          <span className="opacity-50">
                            (
                            {perm.name.split("-")[0] === "grain"
                              ? t("layout.nav.grain")
                              : perm.name.split("-")[0] === "cotton"
                              ? t("layout.nav.cotton")
                              : "boshqa"}
                            )
                          </span>
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="text-center border w-[30%] px-4 py-2 font-medium">
                  {perm.actions.includes("read") && (
                    <CircleCheckBig className="mx-auto text-primary" />
                  )}
                </td>
                <td className="text-center border w-[30%] px-4 py-2 font-medium">
                  {perm.actions.includes("all") && (
                    <CircleCheckBig className="mx-auto text-primary" />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="w-full text-center my-5 mt-10 font-medium opacity-70"
              >
                Ruxsatlar topilmadi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
