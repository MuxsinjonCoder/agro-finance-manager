
import { createGrainReception, deleteGrainReception, getAllGrainReceptions, getSingleGrainReceptions, updateGrainReception } from "@/api/grainReception";
import { GrainReceptionData, GrainReceptionReqBodyType, GrainUpdateResponse } from "@/types/grainReception";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";



//create grain reception
export const useCreateGrainReception = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: GrainReceptionData) => createGrainReception(data),
        onSuccess: (response) => {
            if(response.status === "OK") {
                queryClient.invalidateQueries({ queryKey: ["grainReceptionsGet"] });
            }
        }
    });
};

//get all grain receptions
export const useGetAllGrainReceptions=(page:number,size:number)=>
    useQuery({
    queryKey: ["grainReceptionsGet", page, size],
    queryFn: () => getAllGrainReceptions(page, size),
    keepPreviousData: true,
    })


//get single grain reception
 export const useGetSingleGrainReception=(id:number)=>
        useQuery({
        queryKey: ["grainReceptionsGet", id],
        queryFn: () => getSingleGrainReceptions(id),
        keepPreviousData: true,
        })
    

//update grain reception
export const useUpdateGrainReception = () => {
  const queryClient = useQueryClient();

  return useMutation<
    GrainUpdateResponse,
    Error,
    { body: GrainReceptionData; id: number }
  >(
    async ({ body, id }) => await updateGrainReception(body, id), 
    {
      onSuccess: (response) => {
        if (response?.status === "OK") { // `response` mavjudligini tekshirish
          queryClient.invalidateQueries({ queryKey: ["grainReceptionsGet"] })
          toast.success("Grain reception muvaffaqiyatli yangilandi!");
        } else {
          toast.error("Xatolik yuz berdi: Noto‘g‘ri javob formati");
        }
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || error.message || "Xatolik yuz berdi";
        toast.error(`Xatolik: ${errorMessage}`);
      },
    }
  );
};



  //delete grain reception
  export const useDeleteGrainReception=(p0: number)=>{
      const queryClient = useQueryClient();
        return useMutation({
        mutationFn: deleteGrainReception,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["grainReceptionsGet"] });
        }
    });

  }