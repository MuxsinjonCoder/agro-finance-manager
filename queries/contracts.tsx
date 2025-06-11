import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addContractFile,
  createFinanceContract,
  createFinanceMainContract,
  deleteContractFile,
  deleteFinanceContract,
  getAllContracts,
  getAllFinanceContracts,
  getAllFinanceMainContracts,
  getFilterFinanceContracts,
  getFinanceContractById,
  updateContract,
  getAllOrdinaryContractByMainContractId,
  getAllOrdinaryContractByContractId,
  getFinanceContractMonitoringById,
  getContractByNumber,
  downloadExcel,
} from "@/api/financrContractApi";
import {
  ContractFiles,
  CreateContract,
  EditingContract,
} from "@/types/contracts";
import { ContractType } from "@/components/cotton/contracts/components/add-modal";

// Fetch Contracts
export const useFinanceContracts = (
  page: number,
  size: number,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: ["financeContracts", page, size],
    queryFn: () => getAllFinanceContracts(page, size),
    keepPreviousData: true,
    enabled,
  });

// Fetch all main Contracts
export const useFinanceMainContracts = (
  page?: number,
  size?: number,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: ["mainContracts", page, size],
    queryFn: () => getAllFinanceMainContracts(page, size),
    keepPreviousData: true,
    enabled,
  });

// Fetch all  Contracts
export const useAllContracts = (
  page?: number,
  size?: number,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: ["allContracts", page, size],
    queryFn: () => getAllContracts(page, size),
    keepPreviousData: true,
    enabled,
  });

export const useFilterFinanceContracts = (
  page: number,
  size: number,
  contractType: string
) =>
  useQuery({
    queryKey: ["financeContracts", page, size, contractType],
    queryFn: () => getFilterFinanceContracts(page, size, contractType),
    keepPreviousData: true,
  });

// seach contracts by number
export const useGetContractByNumber = (number?: number) =>
  useQuery({
    queryKey: ["allContracts", number, "mainContracts", "financeContracts"],
    queryFn: () => getContractByNumber(number),
    keepPreviousData: true,
  });

// Fetch a Contract by ID
export const useFinanceContract = (
  id: number | null,
  contractType: ContractType = ContractType.Standard
) => {
  return useQuery({
    queryKey: ["financeContract", id],
    queryFn: async () => {
      const response = await getFinanceContractById(id as number, contractType);
      if (
        response?.message === "CONTRACT IS NOT FOUND" ||
        response?.status === "NOT_FOUND"
      ) {
        throw new Error(response.message || "CONTRACT IS NOT FOUND");
      }
      return response;
    },
    enabled: !!id,
  });
};

export const useFinanceContractMonitoring = (id: number | null) => {
  return useQuery({
    queryKey: ["financeContractMonitoring", id],
    queryFn: async () => {
      const response = await getFinanceContractMonitoringById(id as number);
      if (
        response?.message === "CONTRACT IS NOT FOUND" ||
        response?.status === "NOT_FOUND"
      ) {
        throw new Error(response.message || "CONTRACT IS NOT FOUND");
      }
      return response;
    },
    enabled: !!id,
  });
};

// Create a new Contract
export const useCreateFinanceContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFinanceContract,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allContracts", "mainContracts", "financeContracts"],
      });
    },
  });
};

// Create a main Contract
export const useCreateFinanceMainContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFinanceMainContract,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allContracts", "mainContracts", "financeContracts"],
      });
    },
  });
};

// Delete a Contract
export const useDeleteFinanceContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contractType }: { id: string; contractType: string }) =>
      deleteFinanceContract(id, contractType),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          variables.contractType === "MAIN"
            ? "mainContracts"
            : "financeContracts",
          "allContracts",
        ],
      });
    },
  });
};

// Update a Contract
export const useUpdateFinanceContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditingContract }) =>
      updateContract(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["financeContracts", "allContracts", "mainContracts"],
      });
    },
  });
};

// add contract file
export const useAddContractFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      addContractFile(data, id),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["financeContracts"] });
    },
  });
};

// delete contract file
export const useDeleteContractFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContractFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["financeContracts", "allContracts", "mainContracts"],
      });
    },
  });
};

export const useOrdinaryContractsByMainContractId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mainContractId: number) =>
      getAllOrdinaryContractByMainContractId(mainContractId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ordinaryContractsByMainContractId"],
      });
    },
  });
};

export const useOrdinaryContractsByContractId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contractId: number) =>
      getAllOrdinaryContractByContractId(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ordinaryContractsByContractId"],
      });
    },
  });
};

export const useDownloadExcel = (
  from?: Date,
  to?: Date,
  contractType?: string
) => {
  return useMutation({
    mutationFn: () => {
      if (!from || !to) return Promise.reject("Dates are required");
      return downloadExcel(from, to, contractType);
    },
    onSuccess: (response) => console.log("Excel Response:", response),
  });
};
