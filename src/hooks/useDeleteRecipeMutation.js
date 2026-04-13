import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../api/recipes-api";

export const useDeleteRecipeMutation = (recipeId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token)=>deleteRecipe(recipeId, token),
    onSuccess: ()=> queryClient.invalidateQueries({queryKey: ["recipes"]})
  })
};
