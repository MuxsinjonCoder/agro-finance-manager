import { createLoanAgree, getAllLoanAgree } from "@/api/grain/loan-agree";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all contracts
export const useGetLoanAgree = (page: number, size: number) =>
  useQuery({
    queryKey: ["getLoanAgree", page, size],
    queryFn: () => getAllLoanAgree(page, size),
  });

// create a new contract
export const useCreateLoanAgree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLoanAgree,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getLoanAgree"] });
    },
  });
};
