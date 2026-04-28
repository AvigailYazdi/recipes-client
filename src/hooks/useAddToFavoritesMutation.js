import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorites } from "../api/recipes-api";

export const useAddToFavoritesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipeId, token }) => addToFavorites(recipeId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
