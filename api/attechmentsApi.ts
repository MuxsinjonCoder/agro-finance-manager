import { CreateAttechments } from "@/types/attechments";
import axiosInstance from "./axios";

// Create a new attech
export const createAttech = async (data: CreateAttechments) => {
  const response = await axiosInstance.post("/product-attachment/create", data);
  return response.data;
};
