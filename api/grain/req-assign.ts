import axiosInstance from "../axios";

// Get all getAllReqAssign with filter
export const getAllReqAssign = async (
  page?: number,
  size?: number,
  search?: string,
  from?: any,
  to?: any
) => {
  let url = `/task-agreement/filter?page=${page}&size=${size}`;

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
export const createReqAssign = async (data: any) => {
  const response = await axiosInstance.post("/task-agreement/create", data);
  return response.data;
};

// add attechment to contract
export const addAttechToContract = async (data: any) => {
  const response = await axiosInstance.post("/task-application/create", data);
  return response.data;
};

// Update contract
export const updateReqAssign = async ({ data, id }: any) => {
  const response = await axiosInstance.put(
    `/task-agreement/update?id=${id}`,
    data
  );
  return response.data;
};
