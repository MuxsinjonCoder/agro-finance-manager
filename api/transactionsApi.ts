import { GetAllTransactionsByContractIdParams, GetFilteredTransactionsParams } from "@/types/transactions";
import axiosInstance from "./axios";

// Get all bank
export const getAllTransactionsByContractId = async (
  params: GetAllTransactionsByContractIdParams
) => {
  const response = await axiosInstance.get(
    `/transaction/getAllByContractId`,
    { params }
  );
  return response.data;
};
export const getFilteredTransactions = async (
  params: GetFilteredTransactionsParams
) => {
  const response = await axiosInstance.get(
    `/transaction/filter`,
    { params }
  );
  return response.data;
};

// Get a specific bank by ID
export const getTranscactionById = async (id: string) => {
  const response = await axiosInstance.get("/transactions/get", {
    params: { id },
  });
  return response.data;
};
