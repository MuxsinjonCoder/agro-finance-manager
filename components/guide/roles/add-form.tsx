import { useState } from "react";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useTranslation } from "react-i18next";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "../../ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { X } from "lucide-react";

export interface AddRoleFormPropsTypes {
  onSubmit: (data: any) => void;
  form: any;
  createRole: any;
  permissions: any;
  setPermissions: any;
  handleClearAllChecks: () => void;
}

const staticAllPerms = {
  data: [
    { name: "grain-dashboard", label: "Dashboard (Grain)" },
    { name: "grain-users", label: "Users (Grain)" },
    { name: "cotton-dashboard", label: "Dashboard (Cotton)" },
    { name: "cotton-reports", label: "Reports (Cotton)" },
    { name: "guide-settings", label: "Settings (Guide)" },
    { name: "guide-tickets", label: "Tickets (Guide)" },
  ],
};

export default function AddRoleForm({
  form,
  onSubmit,
  createRole,
}: AddRoleFormPropsTypes) {
  const { t } = useTranslation();
  const [selectedPermissions, setSelectedPermissions] = useState<
    { name: string; values: string[] }[]
  >([]);

  const handlePermissionSelect = (value: string) => {
    if (value === "all") {
      const allOptions = staticAllPerms.data
        .filter(
          (perm) => !selectedPermissions.some((p) => p.name === perm.name)
        )
        .map((perm) => ({
          name: perm.name,
          values: ["read"],
        }));
      setSelectedPermissions([...selectedPermissions, ...allOptions]);
    } else if (value === "grain" || value === "cotton" || value === "guide") {
      const filteredOptions = staticAllPerms.data
        .filter(
          (perm) =>
            perm.name.startsWith(value) &&
            !selectedPermissions.some((p) => p.name === perm.name)
        )
        .map((perm) => ({
          name: perm.name,
          values: ["read"],
        }));
      setSelectedPermissions([...selectedPermissions, ...filteredOptions]);
    } else {
      const selectedPerm = staticAllPerms.data.find(
        (perm) => perm.name === value
      );
      if (
        selectedPerm &&
        !selectedPermissions.some((perm) => perm.name === value)
      ) {
        setSelectedPermissions([
          ...selectedPermissions,
          { name: selectedPerm.name, values: ["read"] },
        ]);
      }
    }
  };

  const handlePermissionDeselect = (value: string) => {
    if (value === "all") {
      setSelectedPermissions([]);
    } else if (value === "grain" || value === "cotton" || value === "guide") {
      setSelectedPermissions(
        selectedPermissions.filter((perm) => !perm.name.startsWith(value))
      );
    } else {
      setSelectedPermissions(
        selectedPermissions.filter((perm) => perm.name !== value)
      );
    }
  };

  const handleRemovePermission = (name: string) => {
    setSelectedPermissions(
      selectedPermissions.filter((perm) => perm.name !== name)
    );
  };

  const handleCheckboxChange = (
    name: string,
    type: "read" | "all",
    checked: boolean
  ) => {
    setSelectedPermissions((prev) =>
      prev.map((perm) => {
        if (perm.name === name) {
          if (checked) {
            if (type === "read") {
              return {
                ...perm,
                values: perm.values.includes("all")
                  ? ["read"]
                  : [...perm.values, "read"],
              };
            } else {
              return {
                ...perm,
                values: perm.values.includes("read")
                  ? ["all"]
                  : [...perm.values, "all"],
              };
            }
          } else {
            return {
              ...perm,
              values: perm.values.filter((val) => val !== type),
            };
          }
        }
        return perm;
      })
    );
  };

  const handleSubmit = (data: any) => {
    const submittingData = {
      name: data?.name,
      dtoList: selectedPermissions.map((perm) => ({
        name: `${perm.name.split("-")[0]}-${perm.name.split("-").pop()}`,
        actions: perm.values,
      })),
    };
    onSubmit(submittingData);
  };

  const isAllSelected =
    staticAllPerms.data.length === selectedPermissions.length;
  const isGrainSelected = staticAllPerms.data
    .filter((perm) => perm.name.startsWith("grain"))
    .every((perm) => selectedPermissions.some((p) => p.name === perm.name));
  const isCottonSelected = staticAllPerms.data
    .filter((perm) => perm.name.startsWith("cotton"))
    .every((perm) => selectedPermissions.some((p) => p.name === perm.name));
  const isGuideSelected = staticAllPerms.data
    .filter((perm) => perm.name.startsWith("guide"))
    .every((perm) => selectedPermissions.some((p) => p.name === perm.name));

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("roles.roleName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5">
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
                          <div className="truncate">To'liq ruxasat berish</div>
                        </TooltipTrigger>
                        <TooltipContent>To'liq ruxasat berish</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedPermissions.map((perm) => (
                  <tr
                    key={perm.name}
                    className="flex items-center justify-between"
                  >
                    <td className="border w-[60%] truncate px-4 py-2 font-medium flex items-center justify-between">
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
                      <X
                        className="cursor-pointer text-red-500"
                        onClick={() => handleRemovePermission(perm.name)}
                      />
                    </td>
                    <td className="text-center border w-[30%] px-4 py-2 font-medium">
                      <input
                        className="cursor-pointer scale-[1.5]"
                        type="checkbox"
                        checked={perm.values.includes("read")}
                        onChange={(e) =>
                          handleCheckboxChange(
                            perm.name,
                            "read",
                            e.target.checked
                          )
                        }
                      />
                    </td>
                    <td className="text-center border w-[30%] px-4 py-2 font-medium">
                      <input
                        className="cursor-pointer scale-[1.5]"
                        type="checkbox"
                        checked={perm.values.includes("all")}
                        onChange={(e) =>
                          handleCheckboxChange(
                            perm.name,
                            "all",
                            e.target.checked
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
                <tr className="flex items-center justify-between">
                  <td colSpan={3} className="border w-full px-4 py-2">
                    <Select
                      onValueChange={(value) => {
                        if (
                          (value === "all" && isAllSelected) ||
                          (value === "grain" && isGrainSelected) ||
                          (value === "cotton" && isCottonSelected) ||
                          (value === "guide" && isGuideSelected) ||
                          selectedPermissions.some(
                            (perm) => perm.name === value
                          )
                        ) {
                          handlePermissionDeselect(value);
                        } else {
                          handlePermissionSelect(value);
                        }
                      }}
                      value=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Huquqlarni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {isAllSelected
                            ? "Barchasini o'chirish"
                            : "Barchasini tanlash"}
                        </SelectItem>
                        <SelectItem value="grain">
                          {isGrainSelected
                            ? "Don bo'limini o'chirish"
                            : "Don bo'limini tanlash"}
                        </SelectItem>
                        <SelectItem value="cotton">
                          {isCottonSelected
                            ? "Paxta bo'limini o'chirish"
                            : "Paxta bo'limini tanlash"}
                        </SelectItem>
                        <SelectItem value="guide">
                          {isGuideSelected
                            ? "Boshqaruv bo'limini o'chirish"
                            : "Boshqaruv bo'limini tanlash"}
                        </SelectItem>
                        {staticAllPerms.data
                          .filter(
                            (option) =>
                              !selectedPermissions.some(
                                (perm) => perm.name === option.name
                              )
                          )
                          .map((option) => (
                            <SelectItem key={option.name} value={option.name}>
                              {t(`layout.nav.${option.name.split("-").pop()}`)}{" "}
                              <span className="opacity-50">
                                (
                                {option.name.split("-")[0] === "grain"
                                  ? t("layout.nav.grain")
                                  : option.name.split("-")[0] === "cotton"
                                  ? t("layout.nav.cotton")
                                  : option.name.split("-")[0] === "guide"
                                  ? t("layout.nav.guide")
                                  : "boshqa"}
                                )
                              </span>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={createRole.isLoading}
          >
            {t("buttons.add")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
