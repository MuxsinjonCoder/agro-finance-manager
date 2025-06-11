import { TRRES } from "@/types/transactions";
import axiosInstance from "./axios";

export const getAllTByContractId = async (id: string, page: number, size: number, status: string, type: string ) => {
    const response = await axiosInstance.get<TRRES>(
        `/transaction/getAllByContractId?contractId=${id}&status=${status}&page=${page}&size=${size}&type=${type}`
    );
    return response.data;
};