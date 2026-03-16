import { useQuery } from "@tanstack/react-query";
import { getRecipeComments } from "../api/recipes-api";

export const useGetRecipeComments = (recipeId) => {
  return useQuery({
    queryKey: ["comments", recipeId],
    queryFn: () => getRecipeComments(recipeId),
    enabled: !!recipeId,
  });
};
