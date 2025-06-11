import { CreateAppTypes } from "@/types/apps";
import axiosInstance from "./axios";

// Create a new application
export const createApplication = async (data: CreateAppTypes) => {
  const response = await axiosInstance.post("/application/create", data);
  return response.data;
};

// Get all application with pagination
export const getAllApplications = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/application/getAll?page=${page}&size=${size}`
  );
  return response.data;
};

// Get a specific application by ID
export const getApplicationById = async (id: string) => {
  const response = await axiosInstance.get(
    "/application/get",
    {
      params: { id },
    }
  );
  return response.data;
};

// Delete a application by ID
export const deleteApplication = async (id: string) => {
  const response = await axiosInstance.delete("/application/delete", {
    params: { id },
  });
  return response.data;
};
