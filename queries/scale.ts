//scale queries

import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllTransportTypes,getAllCountirTypes,getAllProducts,getAllProductsTypes,getAllCombines, getAllPartners, getPartnersByType, getPartnerById, getPartnersByFilter, getTransportById } from "@/api/scaleApi";
import { toast } from "sonner";


//fetch all products
export const useGetProducts = (page: number, size: number) =>
  useQuery({
    queryKey: ["productsGet", page, size],
    queryFn: () => getAllProducts(page, size),
    keepPreviousData: true,
  });

//fetch all product types
export const useGetProductTypes=(page:number,size:number)=>
    useQuery({
        queryKey:['productTypesGet',page,size],
        queryFn:()=>getAllProductsTypes(page,size),
        keepPreviousData:true
    })


//fetch all tranport types
export const useGetAllTranportsTypes=(page:number,size:number)=>
    useQuery({
        queryKey:['tranportTypesGet',page,size],
        queryFn:()=>getAllTransportTypes(page,size),
        keepPreviousData:true
    })


//fetch all countir types
export const useGetAllCountirs=(page:number,size:number)=>
    useQuery({
        queryKey:['countirsGet',page,size],
        queryFn:()=>getAllCountirTypes(page,size),
        keepPreviousData:true
    })


//fetch all combines
export const useGetAllCombines=(page:number,size:number)=>
   useQuery({
    queryKey:['combinesGet',page,size],
    queryFn:()=>getAllCombines(page,size),
    keepPreviousData:true
   })

   //fetch all partners
export const useGetAllPartners=(page:number,size:number)=>
    useQuery({
     queryKey:['partnersGet',page,size],
     queryFn:()=>getAllPartners(page,size),
     keepPreviousData:true
    })

       //fetch  partners by type
export const useGetPartnersByType=(page:number,size:number,type:string)=>
    useQuery({
     queryKey:['partnersByTypeGet',page,size,type],
     queryFn:()=>getPartnersByType(page,size,type),
     keepPreviousData:true
    })

    //fetch  partner by id
export const useGetPartnerById=(id:number)=>
    useQuery({
     queryKey:['partnersByIdGet',id],
     queryFn:()=>getPartnerById(id),
     keepPreviousData:true
    })
    
    //fetch  partner by filter
    export const useGetPartnerByFilter = (filters: { name?: string; inn?: string; type?: string }, enabled: boolean) =>
        useQuery({
          queryKey: ['partnersByFilterGet', filters],
          queryFn: () => getPartnersByFilter(filters),
          keepPreviousData: true,
          enabled, // Faqat name bor bo‘lsa so‘rov jo‘natadi
        });



    
    //fetch  transport by id
    export const useGetTransportById = (id:number) =>
        useQuery({
          queryKey: ['partnersByFilterGet', id],
          queryFn: () => getTransportById(id),
          keepPreviousData: true,
        });


