import {
  addAttechToContract,
  createReqAssign,
  getAllReqAssign,
  updateReqAssign,
} from "@/api/grain/req-assign";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Fetch all contracts
export const useGetReqAssign = (
  page: number,
  size: number,
  search?: string,
  from?: any,
  to?: any
) =>
  useQuery({
    queryKey: ["getReqAssigns", page, size, search, from, to],
    queryFn: () => getAllReqAssign(page, size, search, from, to),
  });

// Create a new contract
export const useCreateReqAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReqAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getReqAssigns"] });
    },
  });
};

// add attech to contract
export const useAddAttechToContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAttechToContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getReqAssigns"] });
    },
  });
};

// update contract
export const useUpdateReqAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateReqAssign({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getReqAssigns"],
      });
    },
  });
};
