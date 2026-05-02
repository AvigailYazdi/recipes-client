import { useQuery } from "@tanstack/react-query";
import { getRecipeRating } from "../api/rating-api";

export const useGetRecipeRating = (recipeId) => {
  return useQuery({
    queryKey: ["recipeRating", recipeId],
    queryFn: () => getRecipeRating(recipeId),
    enabled: !!recipeId,
  });
};