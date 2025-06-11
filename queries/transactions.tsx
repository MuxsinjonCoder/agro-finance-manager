import {
  getAllTransactionsByContractId,
  getFilteredTransactions,
  getTranscactionById,
} from "@/api/transactionsApi";

import { getAllTByContractId } from "@/api/transactions";
import { useQuery, useInfiniteQuery } from "react-query";
import { GetAllTransactionsByContractIdParams, GetFilteredTransactionsParams } from "@/types/transactions";

// Fetch all banks
export const useTransactionsByContractId = (
  params: GetAllTransactionsByContractIdParams
) =>
  useInfiniteQuery({
    queryKey: ["transactions", params],
    queryFn: ({ pageParam = 0 }) =>
      getAllTransactionsByContractId({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length === 0) return undefined;
      return pages.length;
    },
    keepPreviousData: true,
    enabled: !!params.contractId,
  });

// Fetch a bank by ID
export const useTransactionById = (id: string) =>
  useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTranscactionById(id),
    enabled: !!id,
  });
export const useTransactionFilter = (params: GetFilteredTransactionsParams) =>
  useQuery({
    queryKey: ["transaction"],
    queryFn: () => getFilteredTransactions(params),
    // enabled: !!params.,
  });

export const useAllT = (
  id: string,
  page: number,
  size: number,
  status: string,
  type: string
) =>
  useQuery({
    queryKey: ["getAllByContractId", id, status, page, size, type],
    queryFn: () => getAllTByContractId(id, page, size, status, type),
    keepPreviousData: true,
    enabled: !!id,
  });
