import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createCourtDecision,
    getAllCourtDecisions,
    getCourtDecisionById,
    addFile
} from "@/api/courtDecisionApi";

// Fetch courtDecisions
export const useCourtDecisions = (page: number, size: number) =>
    useQuery({
        queryKey: ["courtDecisions", page, size],
        queryFn: () => getAllCourtDecisions(page, size),
    });

// Fetch a courtDecision
export const useCourtDecision = (id: string) =>
    useQuery({
        queryKey: ["courtDecision", id],
        queryFn: () => getCourtDecisionById(id),
        enabled: !!id, // Only fetch if ID is provided
    });

// Create a new courtDecision
export const useCreateCourtDecision = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCourtDecision,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courtDecisions"] });
        },
    });
};

// add file
export const useAddFile = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courtDecision", id] });
        },
    });
};

// Delete a court decision
// export const useDeleteFinanceCategory = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: deleteCourtDecision,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["courtDecisions"] });
//         },
//     });
// };
