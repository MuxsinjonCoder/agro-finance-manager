import { createBank, getAllBanks, getBankById, updateBank } from "@/api/banksApi";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Fetch all banks
export const useBanks = (page: number, size: number) =>
    useQuery({
        queryKey: ["banks", page, size],
        queryFn: () => getAllBanks(page, size),
        keepPreviousData: true,
    });

// Fetch a bank by ID
export const useBank = (id: string) =>
    useQuery({
        queryKey: ["bank", id],
        queryFn: () => getBankById(id),
        enabled: !!id,
    });

// Create a new bank
export const useCreateBank = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBank,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["banks"] });
        },
    });
};

// update a bank
// export const useUpdateBank = (id: string) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: updateBank,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["bank", id] });
//         },
//     });
// };
