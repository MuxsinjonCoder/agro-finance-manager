import api from "./axios";
import {
  CreateRoleRequest,
  CreateRoleResponse,
  DeleteRoleResponse,
  UpdateRoleRequest,
  GetRolesResponse,
  Role,
} from "@/types/role";

// get all roles
export const getAllRoles = async (): Promise<GetRolesResponse> => {
  const { data } = await api.get<GetRolesResponse>("/role/getAll", {});
  return data;
};

// add role
export const createRole = async (
  role: CreateRoleRequest
): Promise<CreateRoleResponse> => {
  const { data } = await api.post<CreateRoleResponse>("/role/create", role);
  return data;
};

// update role
export const updateRole = async (role: any): Promise<any> => {
  const { data } = await api.put<any>("/role/updateAll", role);
  return data;
};

// update role's permission
export const updateRolePermission = async (permissions: any): Promise<any> => {
  const { data } = await api.put<any>(
    `/role/updatePermissionActionById`,
    permissions
  );
  return data;
};

// delete role if not assigned someone
export const deleteRole = async (id: number): Promise<DeleteRoleResponse> => {
  const { data } = await api.delete<DeleteRoleResponse>(
    `/role/delete?id=${id}`
  );
  return data;
};

//  permissions for roles
export const getAllPerms = async (): Promise<any> => {
  const { data } = await api.get<any>(`/permission/getAll?page=0&size=1000`);
  return data;
};
