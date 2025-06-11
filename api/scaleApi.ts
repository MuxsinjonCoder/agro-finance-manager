//scale api

import api from "./axios";
import {
  ProductResponse, 
  TransportTypeResponse,
   ContourTypeResponse, 
   CombineNumResponse, 
   ProductTypeResponse,
   AllPartnersResponse, 
   PartnerByTypeResponse,
   PartnerByIdResponse,
   PartnerFilterResponse,
   TransportByIdResponse
  } from "@/types/scale";



// get all tranport types
export const getAllTransportTypes = async(
  page: number,
  size: number
): Promise<TransportTypeResponse> => {
  const { data } = await api.get<TransportTypeResponse>("/vehicle/getAll", {
    params: { page, size },
  });
  return data;
};


//get all countir types
export const getAllCountirTypes=async(
  page:number,
  size:number
): Promise<ContourTypeResponse> =>{
  const { data } = await api.get<ContourTypeResponse>("/contr/getAll", {
    params: { page, size },
  });
  return data;
}


//get all products
export const getAllProducts=async(
  page:number,
  size:number
): Promise<ProductResponse> =>{
  const { data } = await api.get<ProductResponse>("/product/getAll", {
    params: { page, size },
  });
  return data;
}


//get all products types
export const getAllProductsTypes=async(
  page:number,
  size:number
):Promise<ProductTypeResponse>=>{
 const {data}=await api.get<ProductTypeResponse>('/types/getAll',{
  params:{page,size}
 })
 return data
}


//get all combines

export const getAllCombines=async(
  page:number,
  size:number
):Promise<CombineNumResponse>=>{
  const {data}= await api.get<CombineNumResponse>('/combines/getAll',{
    params:{page,size}
  })
  return data
}


//get all partners

export const getAllPartners=async(
  page:number,
  size:number
):Promise<AllPartnersResponse>=>{
  const {data}=await api.get<AllPartnersResponse>('/partners/getAll',{
    params:{page,size}
  })
  return data

}


//get partners by type
export const getPartnersByType=async(
  page:number,
  size:number,
  type:string
):Promise<PartnerByTypeResponse>=>{
  const {data}=await api.get<PartnerByTypeResponse>('/partners/getByType',{
    params:{type,size,page}
  
  })
  return data
}



//get partner by id

export const getPartnerById=async(
  id:number
):Promise<PartnerByIdResponse>=>{
  const {data}=await api.get<PartnerByIdResponse>('/partners/getById',{
    params:{id}
  })

  return data
}


//get partners by filter
export const getPartnersByFilter = async (filters: {
  name?: string;
  inn?: string;
  type?: string;
}): Promise<PartnerFilterResponse> => {
  const { data } = await api.get<PartnerFilterResponse>("/partner/filterPartner", {
    params: filters, // Faqat mavjud bo'lgan qiymatlar yuboriladi
  });

  return data;
};


//get transport by id
export const getTransportById = async (
  id:number
): Promise<TransportByIdResponse> => {
  const { data } = await api.get<TransportByIdResponse>("/vehicle/get", {
    params: {id}
  });

  return data;
};