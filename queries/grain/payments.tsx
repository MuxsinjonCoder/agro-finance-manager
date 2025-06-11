import { createPayment, getAllPayments } from "@/api/grain/payments";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Fetch all payments
export const useGetPayments = (page: number, size: number, search?: string) =>
  useQuery({
    queryKey: ["getPayments", page, size, search],
    queryFn: () => getAllPayments(page, size, search),
  });

// Create a new contract
export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPayments"] });
    },
  });
};
