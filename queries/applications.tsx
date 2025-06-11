import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createApplication,
    deleteApplication,
    getAllApplications,
    getApplicationById
} from "@/api/applicationsApi";

// Fetch all Application
export const useApplications = (page: number, size: number) =>
    useQuery({
        queryKey: ["financeApplications", page, size],
        queryFn: () => getAllApplications(page, size),
        keepPreviousData: true,
    });

// Fetch a Application by ID
export const useApplication = (id: string) =>
    useQuery({
        queryKey: ["financeApplication", id],
        queryFn: () => getApplicationById(id),
        enabled: !!id,
    });

// Create a new Application
export const useCreateApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financeApplications"] });
        },
    });
};

// Delete a Application
export const useDeleteApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financeApplications"] });
        },
    });
};
