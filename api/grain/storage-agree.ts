import axiosInstance from "../axios";

// Get all getAllReqAssign with filter
export const getAllStorageAgree = async (
  page?: number,
  size?: number,
  search?: string,
  from?: any,
  to?: any
) => {
  let url = `/storage-contract/getAll?page=${page}&size=${size}`;

  if (search) {
    url += `&search=${search}`;
  }

  if (from) {
    url += `&from=${from}`;
  }

  if (to) {
    url += `&to=${to}`;
  }

  const response = await axiosInstance.get(url);
  return response.data;
};

// Create a new contract
export const createStorageAgree = async (data: any) => {
  const response = await axiosInstance.post("/storage-contract/create", data);
  return response.data;
};

// update contract
export const updateStorageAgree = async ({ data, id }: any) => {
  const response = await axiosInstance.put(
    `/storage-contract/update?id=${id}`,
    data
  );
  return response.data;
};
