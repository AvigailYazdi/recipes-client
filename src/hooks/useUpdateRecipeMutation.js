import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "../api/recipes-api";

export const useUpdateRecipeMutation = (recipeId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables) =>
      updateRecipe(recipeId, variables.body, variables.token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["recipe", recipeId, variables.token],
      });
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });
};
