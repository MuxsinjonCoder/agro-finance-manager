
import api from './axios'
import { AltegApiResponse, DistrictDataRes, FarmerApiResponse, FarmerGrainReceptionRes, GrainAcceptanceLaboratory, GrainAcceptanceLaboratoryRes } from "@/types/grain-rec"



//get all  farmer grain receptions
export const getAllFarmerGrainReceptions=async(
    page:number,
    size:number
    ):Promise<FarmerGrainReceptionRes>=>{
      const {data}=await api.get<FarmerGrainReceptionRes>('/farmer-reception/getAll',{
         params:{page,size}
      })
      return data
  }

  //get all  district grain receptions
export const getAllDistrictGrainReceptions=async(
    page:number,
    size:number
    ):Promise<DistrictDataRes>=>{
      const {data}=await api.get<DistrictDataRes>('/district-reception/getAll',{
         params:{page,size}
      })
      return data
  }



  //create a lab acceptance
export const createLabGrainReception=async(
  body:GrainAcceptanceLaboratory
 ):Promise<GrainAcceptanceLaboratoryRes>=>{
   const {data}=await api.post<GrainAcceptanceLaboratoryRes>('/laboratory/create',body)
   return data
}


//get all alteg grain receptions

export const getAllAltegGrainReceptions=async(
  page:number,
  size:number
  ):Promise<AltegApiResponse>=>{
    const {data}=await api.get<AltegApiResponse>('/grain-alteg/getAll',{
       params:{page,size}
    })
    return data
}


// get a farmer  by id
export const getFarmerById=async(
  id:number
  ):Promise<FarmerApiResponse>=>{
    const {data}=await api.get<FarmerApiResponse>(`/farmer/get`,{
       params:{id}
    })
    return data
}