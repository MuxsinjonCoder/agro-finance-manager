import { CreatePaymentTypes } from "@/types/pay";
import axiosInstance from "./axios";

// Create a new payment
export const createPay = async (data: CreatePaymentTypes) => {
  const response = await axiosInstance.post("/payment/create", data);
  return response;
};

// Get all payments with pagination
export const getAllPay = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/d-xarid-payment/getAll?page=${page}&size=${size}`
  );
  return response.data;
};

// Delete a payment
export const deletePayment = async (id?: any) => {
  const response = await axiosInstance.delete(
    `/d-xarid-payment/delete?id=${id}`
  );
  return response.data;
};

// get pays data with region filter
export const getPaysDataByRegion = async (
  region: string,
  page: number,
  size: number
) => {
  const response = await axiosInstance.get(
    `/d-xarid-payment/filter?region=${region}&page=${page}&size=${size}`
  );
  return response;
};


export const getAllPayments=async(  
  page: number,
  size: number)=>{
    const response = await axiosInstance.get(
      `/payment/getAll?page=${page}&size=${size}`
    );
    return response;

}
