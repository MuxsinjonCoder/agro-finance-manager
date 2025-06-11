import { CreateCategory } from "@/types/category";
import axiosInstance from "./axios";

// Create a new category
export const createFinanceCategory = async (data: CreateCategory) => {
  const response = await axiosInstance.post("/financeCategory/create", data);
  return response.data;
};

// Update a category
export const updateFinanceCategory = async ({
  data,
  id,
}: {
  data: CreateCategory;
  id: string;
}) => {
  const response = await axiosInstance.put(
    `/financeCategory/update?id=${id}`,
    data
  );
  return response.data;
};

// Get all categories with pagination
export const getAllFinanceCategories = async (page: number, size: number) => {
  const response = await axiosInstance.get("/financeCategory/getAll", {
    params: { page, size },
  });
  return response.data;
};

// Get a specific category by ID
export const getFinanceCategoryById = async (id: string) => {
  const response = await axiosInstance.get("/financeCategory/get", {
    params: { id },
  });
  return response.data;
};

// Delete a category by ID
export const deleteFinanceCategory = async (id: any) => {
  const response = await axiosInstance.delete("/financeCategory/delete", {
    params: { id },
  });
  return response.data;
};
