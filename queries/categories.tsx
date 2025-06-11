import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createFinanceCategory,
    getAllFinanceCategories,
    getFinanceCategoryById,
    deleteFinanceCategory,
    updateFinanceCategory,
} from "@/api/financeCategoryApi";

// Fetch all categories
export const useFinanceCategories = (page: number, size: number) =>
    useQuery({
        queryKey: ["financeCategories", page, size],
        queryFn: () => getAllFinanceCategories(page, size),
    });

// Fetch a category by ID
export const useFinanceCategory = (id: string) =>
    useQuery({
        queryKey: ["financeCategory", id],
        queryFn: () => getFinanceCategoryById(id),
        enabled: !!id, // Only fetch if ID is provided
    });

// Create a new category
export const useCreateFinanceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFinanceCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financeCategories"] });
        },
    });
};

// Update a category
export const useUpdateFinanceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateFinanceCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financeCategories"] });
            queryClient.invalidateQueries({ queryKey: ["financeCategory"] });
        },
    });
};

// Delete a category
export const useDeleteFinanceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFinanceCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financeCategories"] });
        },
    });
};
