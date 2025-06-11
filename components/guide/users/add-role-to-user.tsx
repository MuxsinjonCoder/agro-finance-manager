import { useRoles } from "@/queries/roles";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAddRoleToUser } from "@/queries/users";

export default function AddroleToUser({
  newCreatedUser,
  setAddRoleModal,
  refetch,
}: any) {
  const { t } = useTranslation();

  //   queries
  const { data: roles } = useRoles();
  const addRole = useAddRoleToUser();

  //   states
  const [selectedRole, setSelectedRole] = useState<any | null>(null);

  const addRoleToUser = () => {
    const data: any = {
      userId: Number(newCreatedUser?.data?.id),
      roleId: Number(selectedRole?.id),
    };

    addRole.mutate(data, {
      onSuccess: (response: any) => {
        if (response.status === "OK") {
          toast.success(t("messages.created"));
          refetch();
          setAddRoleModal(false);
        } else {
          toast.error(t("messages.smtErr"));
        }
      },
      onError: (error: any) => {
        const errorMessage =
          error instanceof Error ? error.message : t("messages.smtErr");
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      <Select
        onValueChange={(value) =>
          setSelectedRole(roles?.data?.find((role: any) => role.id === value))
        }
      >
        <SelectTrigger className="my-5">
          <SelectValue placeholder="Rolni tanlang" />
        </SelectTrigger>
        <SelectContent>
          {roles?.data?.map((role: any) => (
            <SelectItem key={role.id} value={role.id}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={addRoleToUser} className="mt-3">
        {t("buttons.save")}
      </Button>
    </>
  );
}
