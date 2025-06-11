import axiosInstance from "../axios";

// Get all getAllPaymentsgetAllPaymentsgetAllPayments with filter
export const getAllPayments = async (
  page?: number,
  size?: number,
  search?: string
) => {
  let url = `/d-xarid-payment/filter?page=${page}&size=${size}`;

  if (search) {
    url += `&search=${search}`;
  }

  const response = await axiosInstance.get(url);
  return response.data;
};

// Create a new contract
export const createPayment = async (data: any) => {
  const response = await axiosInstance.post("/d-xarid-payment/create", data);
  return response.data;
};
