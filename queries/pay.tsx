import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createPay,
  deletePayment,
  getAllPay,
  getPaysDataByRegion,
  getAllPayments,
} from "@/api/payApi";
import { toast } from "sonner";

// Fetch all pays
export const useGetPay = (page: number, size: number) =>
  useQuery({
    queryKey: ["paysGet", page, size],
    queryFn: () => getAllPay(page, size),
    keepPreviousData: true,
  });

// Create a new pay
export const useCreatePay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPay,
    onSuccess: (data) => {
      if (data.data.status === "BAD_REQUEST") {
        return;
      } else {
        queryClient.invalidateQueries({ queryKey: ["paysGet"] });
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

// Delete a payment
export const useDeletePayment = (id?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: any) => deletePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paysGet"] });
    },
  });
};

// get pays data by region
export const useGetPaysByRegion = (
  region: string,
  page: number,
  size: number
) => {
  return useQuery({
    queryKey: ["getPaysByRegion", page, size, region],
    queryFn: () => getPaysDataByRegion(region, page, size),
    keepPreviousData: true,
  });
};


//get all payments
export const useGetAllPayments = (page: number, size: number) => {
  return useQuery({
    queryKey: ["getAllPayments", page, size],
    queryFn: () => getAllPayments(page, size),
    keepPreviousData: true,
  });
};
