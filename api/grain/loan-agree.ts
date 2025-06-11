import axiosInstance from "../axios";

// Get all load agrees
export const getAllLoanAgree = async (page?: number, size?: number) => {
  const response = await axiosInstance.get("/debt-contract/getAll", {
    params: { page, size },
  });
  return response.data;
};

// Create a new contract
export const createLoanAgree = async (data: any) => {
  const response = await axiosInstance.post("/debt-contract/create", data);
  return response.data;
};
