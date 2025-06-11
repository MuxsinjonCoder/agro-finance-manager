import api from './axios'

import { DeleteGrainReceptionResponse, GrainReceptionData, GrainReceptionReqBodyType, GrainReceptionResponse, GrainReceptionsResponse, GrainUpdateResponse, SingleGrainReceptionResponse } from "@/types/grainReception"


//create a grain reception
export const createGrainReception=async(
   body:GrainReceptionData
  ):Promise<GrainReceptionResponse>=>{
    const {data}=await api.post<GrainReceptionResponse>('/grain-reception/createV2',body)
    return data
}


//get all grain receptions
export const getAllGrainReceptions=async(
   page:number,
   size:number
   ):Promise<GrainReceptionsResponse>=>{
     const {data}=await api.get<GrainReceptionsResponse>('/grain-reception/getAllV2',{
        params:{page,size}
     })
     return data
 }
 

 //get single reception 
export const getSingleGrainReceptions=async(
     id:number
    ):Promise<SingleGrainReceptionResponse>=>{
      const {data}=await api.get<SingleGrainReceptionResponse>('/grain-reception/getV2',{
         params:{id}
      })
      return data
  }

  //update grain reception
export const updateGrainReception=async(
    body:GrainReceptionData,
    id:number
):Promise<GrainUpdateResponse>=>{
    const {data}= await api.put<GrainUpdateResponse>('/grain-reception/update',body,{
        params:{id}
    })
    return data
}


//delete grain reception

export const deleteGrainReception=async(id:number):Promise<DeleteGrainReceptionResponse>=>{
    const {data}=await api.delete<DeleteGrainReceptionResponse>('/grain-reception/delete',{
        params:{id}
    })
    return data
}
