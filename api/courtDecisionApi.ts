import { CreateCourt } from "@/types/court";
import axiosInstance from "./axios";

// Create a new court decision
export const createCourtDecision = async (data: CreateCourt) => {
    const response = await axiosInstance.post("/courtDecision/create", data);
    return response.data;
};

// Add file to court decision
export const addFile = async (data: { id: number; file: string }) => {
    const response = await axiosInstance.post("/courtDecision/addFile", data);
    return response.data;
};

// Get all CourtDecisions with pagination
export const getAllCourtDecisions = async (page: number, size: number) => {
    const response = await axiosInstance.get("/courtDecision/getAll", {
        params: { page, size },
    });
    return response.data;
};

// Get a specific CourtDecision by ID
export const getCourtDecisionById = async (id: string) => {
    const response = await axiosInstance.get("/courtDecision/get", {
        params: { id },
    });
    return response.data;
};

// Delete a category by ID
// export const deleteCourtDecision = async (id: string) => {
//     const response = await axiosInstance.delete("/courtDecision/delete", {
//         params: { id },
//     });
//     return response.data;
// };
