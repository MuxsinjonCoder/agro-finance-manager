import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createDocument,
    docAddFile,
    getAllDocs
} from "@/api/documentApi";

// Fetch all documents
export const useGetDocs = (page: number, size: number) =>
    useQuery({
        queryKey: ["docsGot", page, size],
        queryFn: () => getAllDocs(page, size),
        keepPreviousData: true,
    });

// Create a new doc
export const useCreateDocs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["docsGot"] });
        },
    });
};

// add file docs
export const useAddFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }: { id: number; formData: FormData }) => docAddFile({ id, formData }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["docsGot"] });
        },
    });
};