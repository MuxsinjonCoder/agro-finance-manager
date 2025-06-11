import { useState, useEffect } from "react";
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

const staticAllPerms = {
  data: [
    { id: 1, name: "grain-dashboard", label: "Dashboard (Grain)" },
    { id: 2, name: "grain-users", label: "Users (Grain)" },
    { id: 3, name: "cotton-dashboard", label: "Dashboard (Cotton)" },
    { id: 4, name: "cotton-reports", label: "Reports (Cotton)" },
    { id: 5, name: "guide-settings", label: "Settings (Guide)" },
    { id: 6, name: "guide-tickets", label: "Tickets (Guide)" },
  ],
};

export default function EditRoleForm({
  editForm,
  editingRole,
  setEditingPermissions,
  setEditRoleModal,
}: any) {
  const { t } = useTranslation();
  const [selectedPermissions, setSelectedPermissions] = useState<{ name: string; values: string[] }[]>([]);

  useEffect(() => {
    if (editingRole) {
      const initialPermissions = editingRole.dtoList.map((item: any) => ({
        name: item.name,
        values: item.actions.map((action: any) =>
          typeof action === "string" ? action : action.action
        ),
      }));
      setSelectedPermissions(initialPermissions);
      setEditingPermissions(editingRole.dtoList);
      editForm.reset({ name: editingRole.name });
    }
  }, [editingRole, editForm, setEditingPermissions]);

  const handlePermissionSelect = (value: string) => {
    if (value === "all") {
      const allOptions = staticAllPerms.data
        .filter((perm) => !selectedPermissions.some((p) => p.name === perm.name))
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
      const selectedPerm = staticAllPerms.data.find((perm) => perm.name === value);
      if (selectedPerm && !selectedPermissions.some((perm) => perm.name === value)) {
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

  const handleCheckboxChange = (name: string, type: "read" | "all", checked: boolean) => {
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

  const onEditSubmit = (data: any, e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      id: editingRole.id,
      name: data.name,
      permissionList: selectedPermissions.map((perm) => ({
        id: staticAllPerms.data.find((item: any) => item.name === perm.name)?.id,
        name: `${perm.name.split("-")[0]}-${perm.name.split("-").pop()}`,
        actionDtoList: perm.values.map((action) => ({
          action: action,
        })),
      })),
    };

    console.log("submitData in edit form: ", submitData);

    // Assuming updateRole is a function that handles the API call
    // updateRole.mutate(submitData, {
    //   onSuccess: () => {
    //     editForm.reset();
    //     setEditRoleModal(false);
    //   },
    // });
  };

  const isAllSelected = staticAllPerms.data.length === selectedPermissions.length;
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
      <Form {...editForm}>
        <form onSubmit={(e) => {
          e.preventDefault();
          const data = editForm.getValues();
          onEditSubmit(data, e);
        }} className="space-y-4">
          <FormField
            control={editForm.control}
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
                          <div className="truncate">Ruxsatnomalar</div>
                        </TooltipTrigger>
                        <TooltipContent>Ruxsatnomalar</TooltipContent>
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
                          <div className="truncate">{t("roles.all")}</div>
                        </TooltipTrigger>
                        <TooltipContent>{t("roles.all")}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedPermissions.map((perm) => (
                  <tr key={perm.name} className="flex items-center justify-between">
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
                      <X className="cursor-pointer text-red-500" onClick={() => handleRemovePermission(perm.name)} />
                    </td>
                    <td className="text-center border w-[30%] px-4 py-2 font-medium">
                      <input
                        className="cursor-pointer scale-[1.5]"
                        type="checkbox"
                        checked={perm.values.includes("read")}
                        onChange={(e) => handleCheckboxChange(perm.name, "read", e.target.checked)}
                      />
                    </td>
                    <td className="text-center border w-[30%] px-4 py-2 font-medium">
                      <input
                        className="cursor-pointer scale-[1.5]"
                        type="checkbox"
                        checked={perm.values.includes("all")}
                        onChange={(e) => handleCheckboxChange(perm.name, "all", e.target.checked)}
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
                          selectedPermissions.some((perm) => perm.name === value)
                        ) {
                          handlePermissionDeselect(value);
                        } else {
                          handlePermissionSelect(value);
                        }
                      }}
                      value=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ruxsatnoma tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {isAllSelected ? "Barchasini o'chirish" : "Barchasini tanlash"}
                        </SelectItem>
                        <SelectItem value="grain">
                          {isGrainSelected ? "Don bo'limini o'chirish" : "Don bo'limini tanlash"}
                        </SelectItem>
                        <SelectItem value="cotton">
                          {isCottonSelected ? "Paxta bo'limini o'chirish" : "Paxta bo'limini tanlash"}
                        </SelectItem>
                        <SelectItem value="guide">
                          {isGuideSelected ? "Boshqaruv bo'limini o'chirish" : "Boshqaruv bo'limini tanlash"}
                        </SelectItem>
                        {staticAllPerms.data
                          .filter((option) => !selectedPermissions.some((perm) => perm.name === option.name))
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

          <Button type="submit" className="w-full">
            {t("buttons.save")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
