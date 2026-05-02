import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getMyRecipeRating } from "../api/rating-api";
import { AuthContext } from "../context/AuthContext";

export const useGetMyRecipeRating = (recipeId) => {
  const { token } = useContext(AuthContext);
  return useQuery({
    queryKey: ["myRecipeRating", recipeId],
    queryFn: () => getMyRecipeRating({ recipeId, token }),
    enabled: !!recipeId && !!token,
  });
};