import axiosInstance from "./axios";
import { CreateDocTypes } from "@/types/doc";

// Create a new document
export const createDocument = async (data: CreateDocTypes) => {
  const response = await axiosInstance.post("/document/create", data);
  return response;
};

// add file
export const docAddFile = async ({
  id,
  formData,
}: {
  id: number;
  formData: FormData;
}) => {
  const response = await axiosInstance.post(
    `/document/addFile?id=${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Get all docs with pagination
export const getAllDocs = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/document/getAll?page=${page}&size=${size}`
  );
  return response.data;
};
