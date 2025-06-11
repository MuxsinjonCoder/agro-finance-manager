import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createRole,
  deleteRole,
  getAllPerms,
  getAllRoles,
  updateRole,
  updateRolePermission,
} from "@/api/rolesApi";
import { toast } from "sonner";
import {
  CreateRoleRequest,
  Role,
  CreateRoleResponse,
  UpdateRoleRequest,
} from "@/types/role";
import { useTranslation } from "react-i18next";

// Получение всех ролей
export const useRoles = () =>
  useQuery({
    queryKey: ["rolesGet"],
    queryFn: () => getAllRoles(),
    keepPreviousData: true,
  });

// Создание роли
export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => createRole(data),
    onSuccess: (response) => {
      if (response.status === "OK") {
        queryClient.invalidateQueries({ queryKey: ["rolesGet"] });
      }
    },
  });
};

// update role
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateRoleResponse, Error, UpdateRoleRequest>({
    mutationFn: updateRole,
    onSuccess: (response) => {
      if (response.status === "OK") {
        queryClient.invalidateQueries({ queryKey: ["rolesGet"] });
        toast.success("Rol muvaffaqiyatli o'zgertirildi");
      } else {
        toast.error("Rol o'zgartirishda muammo chiqdi");
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Что-то пошло не так";
      toast.error(errorMessage);
    },
  });
};

// edit permissions
export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateRoleRequest>({
    mutationFn: updateRolePermission,
    onSuccess: (response) => {
      if (response.status === "OK") {
        queryClient.invalidateQueries({ queryKey: ["rolesGet"] });
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Что-то пошло не так";
      toast.error(errorMessage);
    },
  });
};

// Удаление роли
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rolesGet"] });
    },
  });
};

// for permissions

// get all permissions
export const useGetAllPerms = () =>
  useQuery({
    queryKey: ["getAllPerms"],
    queryFn: () => getAllPerms(),
    keepPreviousData: true,
  });
