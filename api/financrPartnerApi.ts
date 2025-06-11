import {
  CreateDistrict,
  CreatePartnerData,
  GetPartnerById,
  PartnerParams,
} from "@/types/partners";
import axiosInstance from "./axios";

export enum PartnerType {
  LEASING_COMPANY = "LEASING_COMPANY",
  BANK = "BANK",
}

export interface FilterPartnersParams {
  name?: string;
  inn?: string;
  type?: PartnerType;
  page: number;
  size: number;
  from?: string;
  to?: string;
  dateTime?: string;
}

// Get all partners with pagination
export const getAllPartners = async (page?: number, size?: number) => {
  const response = await axiosInstance.get(`/partner/getAll`);
  return response.data;
};

// Get all partners region, district
export const getAllDistrictPartners = async (
  region?: string,
  districtId?: number
) => {
  const response = await axiosInstance.get(
    `/partner/filterByRegionAndDistrictId?region=${region}&districtId=${districtId}`
  );
  return response.data;
};

// Create a new Partner
export const createFinancePartner = async (data: CreatePartnerData) => {
  const response = await axiosInstance.post("/partner/create", data);
  return response.data;
};

// Update a partner
export const updateFinancePartner = async ({
  data,
  id,
}: {
  data: CreatePartnerData;
  id: string;
}) => {
  const response = await axiosInstance.put(`/partner/update?id=${id}`, data);
  return response.data;
};

// Get all categories with pagination
export const getAllFinanceCategories = async (data: PartnerParams) => {
  const response = await axiosInstance.get("/partner/filterPartner", {
    params: data,
  });
  return response.data;
};

// Get a specific Partner by ID
export const getFinancePartnerById = async (id: string) => {
  const response = await axiosInstance.get<GetPartnerById>("/partner/getById", {
    params: { id },
  });
  return response.data;
};

// Delete a Partner by ID
export const deleteFinancePartner = async (id: string) => {
  const response = await axiosInstance.delete("/partner/delete", {
    params: { id },
  });
  return response.data;
};

// Filter Partners
export const filterPartners = async (params: FilterPartnersParams) => {
  const response = await axiosInstance.get("/partner/filterPartner", {
    params,
  });
  return response.data;
};

export const fetchMfo = async (mfo: number | null) => {
  if (!mfo) return null; // Avoid making requests with null
  const response = await axiosInstance.get(`/bank/existMfo?mfo=${mfo}`);
  return response.data;
};

// organizations

// Create a district
export const createDistrict = async (data: CreateDistrict) => {
  console.log("data", data);
  const response = await axiosInstance.post(
    `/district/addDistrictToRegion?region=${data?.region}&districts=${data?.district}`
  );
  return response.data;
};

// Get districts by region
export const getDistrictsByRegion = async (region: string) => {
  const response = await axiosInstance.get(
    `/district/getByRegion?region=${region}`
  );
  return response.data;
};
