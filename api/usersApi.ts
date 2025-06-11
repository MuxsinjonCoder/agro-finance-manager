import axiosInstance from "./axios";

// Get all users with pagination
export const getAllUsers = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/users/getAllActiveUser?page=${page}&size=${size}`
  );
  return response.data;
};

// add role to user
export const addRoleToUser = async (role: {
  userId: number;
  roleId: number;
}): Promise<any> => {
  const { data } = await axiosInstance.post<any>(
    `/users/addRoleToUser?userId=${role.userId}&roleId=${role.roleId}`
  );
  return data;
};

// delete user
export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete("/users/deleteUser", {
    params: { id },
  });
  return response.data;
};

// delete user role
export const deleteUserRole = async (userId: number, roleId: number) => {
  const response = await axiosInstance.delete(
    `/users/deleteRoleFromUser?userId=${userId}&roleId=${roleId}`
  );
  return response.data;
};

// update user
export const updateUserData = async ({
  data,
  id,
}: {
  data: any;
  id: string;
}) => {
  const response = await axiosInstance.put(`/users/updateUser?id=${id}`, data);
  return response.data;
};


// update email
export const updateUserEmail = async ({
  email,
  newEmail,
}: {
  email: string;
  newEmail: string;
}) => {
  const response = await axiosInstance.put(`/users/updateEmail?email=${email}&newEmail=${newEmail}`);
  return response.data;
};
