import axiosInstance from "./axios";

// get transactions
export const getAllTransactions = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/transaction/getAll?page=${page}&size=${size}`
  );
  return response.data;
};

// get transactions with ststus
export const getTransactionsByStatus = async (
  status?: string,
  type?: string,
  page?: number,
  size?: number
) => {
  const queryParams = new URLSearchParams();

  if (status && status !== "all") queryParams.append("status", status);
  if (type && type !== "all") queryParams.append("type", type);

  const response = await axiosInstance.get(
    `/transaction/filter?page=${page}&size=${size}&${queryParams.toString()}`
  );
  return response.data;
};
