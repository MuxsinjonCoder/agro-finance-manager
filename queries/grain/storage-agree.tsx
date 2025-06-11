import { getAllReqAssign } from "@/api/grain/req-assign";
import {
  createStorageAgree,
  getAllStorageAgree,
  updateStorageAgree,
} from "@/api/grain/storage-agree";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Fetch all contracts
export const useGetStorageAgree = (
  page: number,
  size: number,
  search?: string,
  from?: any,
  to?: any
) =>
  useQuery({
    queryKey: ["getStorageAgree", page, size, search, from, to],
    queryFn: () => getAllStorageAgree(page, size, search, from, to),
  });

// Create a new contract
export const useCreateStorageAgree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStorageAgree,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStorageAgree"] });
    },
  });
};

// update contract
export const useUpdateStorageAgree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateStorageAgree({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getStorageAgree"],
      });
    },
  });
};
