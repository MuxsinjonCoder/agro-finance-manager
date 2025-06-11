import axiosInstance from "@/api/axios";
import {
  addRoleToUser,
  deleteUser,
  deleteUserRole,
  getAllUsers,
  updateUserData,
  updateUserEmail,
} from "@/api/usersApi";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const fetchUserByToken = async (token: string) => {
  const response = await axiosInstance.get("/users/getUserByToken", {
    params: { token },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Return user data
};

// Fetch all users
export const useGetAllUsers = (page: number, size: number) =>
  useQuery({
    queryKey: ["getAllUsers", page, size],
    queryFn: () => getAllUsers(page, size),
  });

// add role to user
export const useAddRoleToUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { userId: number; roleId: number }) =>
      addRoleToUser(data),
    onSuccess: (response: any) => {
      if (response.status === "OK") {
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      }
    },
  });
};

// delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
  });
};

// delete user role
export const useDeleteUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: number; roleId: number }) =>
      deleteUserRole(userId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
  });
};

// Update  user data
export const useUpdateUserData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
  });
};

// Update email
export const useUpdateUserEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; newEmail: string }) =>
      updateUserEmail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
  });
}