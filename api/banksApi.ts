import axiosInstance from "./axios";
import { CreateBankTypes } from "@/types/bank";

// Create a new bank
export const createBank = async (data: CreateBankTypes) => {
  const response = await axiosInstance.post("/bank/create", data);
  return response.data;
};

// Get all bank
export const getAllBanks = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/bank/getAll?page=${page}&size=${size}`
  );
  return response.data;
};

// Get a specific bank by ID
export const getBankById = async (id: string) => {
  const response = await axiosInstance.get(
    "/bank/get",
    {
      params: { id },
    }
  );
  return response.data;
};

// update a bank by ID
export const updateBank = async (data: CreateBankTypes, id: string) => {
  const response = await axiosInstance.put("/bank/update", data, {
    params: { id },
  });
  return response.data;
};
