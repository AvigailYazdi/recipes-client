import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../api/recipes-api";

export const useGetAllRecipes = (filters = {}) => {
  return useQuery({
    queryKey: ["recipes", filters],
    queryFn: () => getAllRecipes(filters),
  });
};
