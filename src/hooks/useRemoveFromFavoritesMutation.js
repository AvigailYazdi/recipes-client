import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromFavorites } from "../api/recipes-api";

export const useRemoveFromFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recipeId, token }) => removeFromFavorites(recipeId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
