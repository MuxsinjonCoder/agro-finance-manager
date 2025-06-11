import { createAttech } from "@/api/attechmentsApi";
import { useMutation, useQueryClient } from "react-query";

// Create a new attech
export const useCreateAttech = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAttech,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attechs"] });
    },
  });
};
