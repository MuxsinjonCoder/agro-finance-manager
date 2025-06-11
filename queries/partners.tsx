import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createFinancePartner,
  deleteFinancePartner,
  getAllFinanceCategories,
  getFinancePartnerById,
  filterPartners,
  FilterPartnersParams,
  updateFinancePartner,
  fetchMfo,
  createDistrict,
  getDistrictsByRegion,
  getAllPartners,
  getAllDistrictPartners,
} from "@/api/financrPartnerApi";
import { PartnerParams } from "@/types/partners";
import axiosInstance from "@/api/axios";

// Fetch all partners
export const useAllPartners = (
  page?: number,
  size?: number,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: ["financePartners", page, size],
    queryFn: () => getAllPartners(page, size),
    keepPreviousData: true,
    enabled,
  });

// Fetch all partners
export const useFinancePartners = (params: Partial<PartnerParams>) => {
  // Remove undefined or empty values from params
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
  ) as Partial<PartnerParams>; // Explicitly cast to PartnerParams

  return useQuery({
    queryKey: ["financePartners", filteredParams],
    queryFn: () => getAllFinanceCategories(filteredParams as PartnerParams),
    keepPreviousData: true,
  });
};

// Fetch partners with district
export const useDistrictPartners = (region?: string, districtId?: number) => {
  return useQuery({
    queryKey: ["getDistricts", region, districtId],
    queryFn: () => getAllDistrictPartners(region, districtId),
    keepPreviousData: true,
  });
};

// Fetch a partner by ID
export const useFinancePartner = (id: string) =>
  useQuery({
    queryKey: ["financePartner", id],
    queryFn: () => getFinancePartnerById(id),
    enabled: !!id,
  });

// Определите интерфейс для контекста
interface CreateFinancePartnerContext {
  onSuccess?: (data: any) => void;
}

// Create a new partner
export const useCreateFinancePartner = () => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, any, CreateFinancePartnerContext>({
    mutationFn: createFinancePartner,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ["financePartners"] });

      if (context?.onSuccess) {
        context.onSuccess(data);
      }
    },
  });
};

// Update a partner
export const useUpdateFinancePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFinancePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financePartners"] });
      queryClient.invalidateQueries({ queryKey: ["financePartner"] });
    },
  });
};

// Delete a partner
export const useDeleteFinancePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFinancePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financePartners"] });
    },
  });
};

// Filter partners
export const useFilterPartners = (params: FilterPartnersParams) =>
  useQuery({
    queryKey: ["financePartners", "filter", params],
    queryFn: () => filterPartners(params),
    keepPreviousData: true,
  });

// check mfo
export const checkMfo = async (mfo: number | null) => {
  try {
    if (!mfo) return null;
    const response = await axiosInstance.get(`/bank/existMfo?mfo=${mfo}`);
    return response.data;
  } catch (error) {
    console.error("Error checking MFO:", error);
    // return { data: false };
  }
};

//  organization

// Fetch districts by region
export const useDistrictsByRegion = (region: string) => {
  return useQuery({
    queryKey: ["getDistricts", region],
    queryFn: () => getDistrictsByRegion(region),
    keepPreviousData: true,
  });
};

// Create a new district
export const useCreateDistrict = () => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, any, CreateFinancePartnerContext>({
    mutationFn: createDistrict,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ["getDistricts"] });

      if (context?.onSuccess) {
        context.onSuccess(data);
      }
    },
  });
};
