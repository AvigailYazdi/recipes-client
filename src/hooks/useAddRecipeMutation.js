import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe } from "../api/recipes-api";

export const useAddRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables) => addRecipe(variables.body, variables.token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }),
  });
};
