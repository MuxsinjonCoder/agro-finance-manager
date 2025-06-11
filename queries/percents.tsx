import { getAllTransactions, getTransactionsByStatus } from "@/api/percentsAPI";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all transactions
export const useGetAllTransactions = (page: number, size: number) =>
    useQuery({
        queryKey: ["getAllTransactions", page, size],
        queryFn: () => getAllTransactions(page, size),
        keepPreviousData: true,
    });


// get transactions with status
export const useGetTransactionsByStatus = (
    status?: string,
    type?: string,
    page?: number,
    size?: number
) =>
    useQuery({
        queryKey: ["getTransactionsByStatus", status, type, page, size],
        queryFn: () => getTransactionsByStatus(status, type, page, size),
        keepPreviousData: true,
    });
