import {
  ContractFiles,
  CreateContract,
  CreateMainContract,
  DeleteFile,
  EditingContract,
} from "@/types/contracts";
import axiosInstance from "./axios";
import { pickProperties } from "@/helpers/pickProperties";
import { ContractType } from "@/components/cotton/contracts/components/add-modal";

// Get all Contracts with pagination
export const getAllFinanceContracts = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/contract/getAll?page=${page}&size=${size}`
  );
  return response.data;
};

// Get all main Contracts
export const getAllFinanceMainContracts = async (
  page?: number,
  size?: number
) => {
  const response = await axiosInstance.get(
    `/main-controller/getAll?page=${page}&size=${size}`
  );
  return response.data;
};

// search contract by number
export const getContractByNumber = async (number?: number) => {
  const response = await axiosInstance.get(
    `/contract/filterContract?number=${number}`
  );
  return response.data;
};

// Get all  Contracts
export const getAllContracts = async (page?: number, size?: number) => {
  const response = await axiosInstance.get(
    `/main-controller/getAllContractAndMainContract?page=${page}&size=${size}`
  );
  return response.data;
};

export const getFilterFinanceContracts = async (
  page: number,
  size: number,
  contractType: string
) => {
  const response =
    contractType == "all"
      ? await axiosInstance.get(
          `/contract/filterContract?page=${page}&size=${size}`
        )
      : await axiosInstance.get(
          `/contract/filterContract?page=${page}&size=${size}&contractType=${contractType}`
        );

  return response?.data;
};

// Get a specific Contract by ID
export const getFinanceContractById = async (
  id: number,
  contractType: ContractType
) => {
  const response = await axiosInstance.get(
    contractType === ContractType.Main
      ? "/main-controller/get"
      : "/contract/get",
    {
      params: { id },
    }
  );
  return response.data;
};
export const getFinanceContractMonitoringById = async (id: number) => {
  const response = await axiosInstance.get(
    "/contract/getContractMonitoringById",
    {
      params: { id },
    }
  );
  return response.data;
};

// Delete a Contract by ID
export const deleteFinanceContract = async (
  id: string,
  contractType: string
) => {
  const response = await axiosInstance.delete(
    contractType === "MAIN" ? "/main-controller/delete" : "/contract/delete",
    {
      params: { id },
    }
  );
  return response.data;
};

// Update a Contract by ID
export const updateContract = async (id: string, data: EditingContract) => {
  const response = await axiosInstance.put(`/contract/update?id=${id}`, data);

  return response.data;
};

// Create a new Contract
export const createFinanceContract = async (data: CreateContract) => {
  const params = new URLSearchParams();
  params.append("", String(data.categoryId));
  params.append("", String(data?.contractNumber));
  params.append("", String(data.financingAmount));
  params.append("", String(data.interestRate));
  params.append("", String(data.penaltyRate));
  params.append("", data.currencyType);
  params.append("", data.terms);
  data.partnerIds.forEach((id) => params.append("partnerIds", String(id)));

  const formData = new FormData();
  data?.files?.forEach((file) => {
    if (file.name) formData.append("files", file);
  });

  const requestParams: {
    startDate: any;
    userId: any;
    contractType: string;
    gracePeriod: any;
    penaltyState: string;
    cronMaxRate: number;
    endDate: any;
    contractDate: any;
    categoryId?: number;
    contractNumber?: string;
    financingAmount?: number;
    interestRate?: number;
    penaltyRate?: number;
    currencyType?: string;
    terms?: string;
    partnerIds?: number;
    payDate?: number;
    mainContractId?: any;
    standardId?: any;
    financialDirection?: any;
    hasChangePaidDay?: any;
    changeBackDay?: any;
  } = {
    startDate: data.startDate,
    userId: data.userId,
    contractType: data.contractType,
    gracePeriod: data.gracePeriod,
    penaltyState: data.penaltyState,
    cronMaxRate: data.maxPenalty,
    endDate: data.endDate,
    contractDate: data.contractDate,
    categoryId: data?.categoryId,
    contractNumber: data?.contractNumber,
    financingAmount: data?.financingAmount,
    interestRate: data?.interestRate,
    penaltyRate: data?.penaltyRate,
    currencyType: data?.currencyType,
    terms: data?.terms,
    partnerIds: data?.partnerIds[0],
    payDate: data?.payDate,
    mainContractId: data?.mainContractId,
    standardId: data?.standardId,
    changeBackDay: data?.changeBackDay,
    hasChangePaidDay: data?.hasChangePaidDay,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(requestParams).filter(([_, value]) => value !== undefined)
  );

  const response = await axiosInstance.post(`/contract/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: filteredParams,
  });

  return response.data;
};

// Create a main Contract
export const createFinanceMainContract = async (data: CreateMainContract) => {
  const formData = new FormData();

  // formData.append("userId", String(data.userId));
  // formData.append("number", data.number);
  // formData.append("categoryId", String(data.categoryId));
  // formData.append("status", data.status);
  // formData.append("currencyType", data.currencyType);
  // formData.append("contractType", data.contractType);
  // formData.append("contractDate", data.contractDate);
  // formData.append("startDate", data.startDate);
  // formData.append("endDate", data.endDate);

  data.files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post(
    `/main-controller/create`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      params: {
        userId: data.userId,
        number: data.number,
        categoryId: data.categoryId,
        status: data.status,
        currencyType: data.currencyType,
        contractType: data.contractType,
        startDate: data.startDate,
        endDate: data.endDate,
        contractDate: data.contractDate,
        partnerId: data.partnerId,
      },
    }
  );

  return response.data;
};

// add file
export const addContractFile = async (data: FormData, id: number) => {
  const response = await axiosInstance.post(
    `/contract/addFile?contractId=${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

// delete file
export const deleteContractFile = async ({
  fileId,
  contractId,
}: DeleteFile) => {
  const response = await axiosInstance.delete(
    `/contract/deleteFileFromContract?contractId=${contractId}&fileId=${fileId}`
  );
  return response.data;
};

// Получить все обычные контракты по ID основного контракта
export const getAllOrdinaryContractByMainContractId = async (
  mainContractId: number
) => {
  const response = await axiosInstance.get(
    `/contract/getAllOrdinaryContractByMainContractId`,
    {
      params: { mainContractId },
    }
  );
  return response.data;
};

// Получить все обычные контракты по ID контракта
export const getAllOrdinaryContractByContractId = async (
  contractId: number
) => {
  const response = await axiosInstance.get(
    `/contract/getAllOrdinaryContractByContractId`,
    {
      params: { contractId },
    }
  );
  return response.data;
};

// download excel
export const downloadExcel = async (
  from?: Date,
  to?: Date,
  contractType?: string
) => {
  if (!from || !to) return Promise.reject("Dates are required");

  try {
    const response = await axiosInstance.get("/contract/downloadExcel", {
      params: {
        from: from.toISOString(),
        to: to.toISOString(),
        contractType: contractType,
      },
      // Ensure response is treated as a file download
      responseType: "blob",
    });

    // Handle Excel file download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `contracts-${from.toISOString()}-${to.toISOString()}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();

    return response.data;
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
};
