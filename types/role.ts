// Базовая модель роли
export interface Role {
  id: number;
  name: string;
  createdAt: string;
  dtoList: Permissions[];
}

interface Permissions {
  name: string;
  actions: string[];
}

// Запрос на создание роли
export interface CreateRoleRequest {
  name: string;
  dtoList: Permissions[];
}
export interface UpdateRoleRequest {
  id: number;
  name: string;
  dtoList?: Permissions[];
}

// Ответ на получение списка ролей
export interface GetRolesResponse {
  status: string;
  data: Role[];
  pages: number;
  elements: number;
}

// Общий формат ответа API
export interface ApiResponse<T> {
  status: string;
  data: T;
}

// Ответ на создание роли
export type CreateRoleResponse = ApiResponse<Role>;

// Ответ при удалении
export interface DeleteRoleResponse {
  status: string;
  message?: string;
}
