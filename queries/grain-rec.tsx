import { createLabGrainReception, getAllAltegGrainReceptions, getAllDistrictGrainReceptions, getAllFarmerGrainReceptions, getFarmerById } from "@/api/grain-rec";
import { GrainAcceptanceLaboratory } from "@/types/grain-rec";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

//get all farmer grain receptions
   export const useGetAllFarmerGrainReceptions=(page:number,size:number)=>
    useQuery({
    queryKey: ["farmerGrainReceptionsGet", page, size],
    queryFn: () => getAllFarmerGrainReceptions(page, size),
    keepPreviousData: true,
    })

    //get all district grain receptions
   export const useGetAllDistrictGrainReceptions=(page:number,size:number)=>
    useQuery({
    queryKey: ["districtGrainReceptionsGet", page, size],
    queryFn: () => getAllDistrictGrainReceptions(page, size),
    keepPreviousData: true,
    })



//create a lab acceptance

export const useCreateLabGrainReception=()=>{
      const queryClient = useQueryClient()
      return useMutation({
         mutationFn: (data: GrainAcceptanceLaboratory) => createLabGrainReception(data),
         onSuccess: (response) => {
            if(response.status === "OK") {
               queryClient.invalidateQueries({ queryKey: ["grainAcceptanceLabGet"] })
            }
         },
         onError: (error:any) => {
            toast.error("Xatolik yuz berdi")
         }
      })
         
      
      
}


//get all alteg grain receptions

export const useGetAllAltegGrainReceptions=(page:number,size:number)=>
      useQuery({
      queryKey: ["altegGrainReceptionsGet", page, size],
      queryFn: () => getAllAltegGrainReceptions(page, size),
      keepPreviousData: true,
      })


//get farmer by id
export const useGetFarmerById=(id:number)=>
      useQuery({
      queryKey: ["farmerGet", id],
      queryFn: () => getFarmerById(id),
      keepPreviousData: true,
      })