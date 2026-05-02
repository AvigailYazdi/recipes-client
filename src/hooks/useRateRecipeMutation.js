import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateRecipe } from "../api/rating-api";

export const useRateRecipeMutation = (recipeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipeRating", recipeId] });
      queryClient.invalidateQueries({ queryKey: ["myRecipeRating", recipeId] });
    },
  });
};
