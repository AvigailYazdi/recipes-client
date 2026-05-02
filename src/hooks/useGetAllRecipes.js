import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { getAllRecipes } from "../api/recipes-api";

export const useGetAllRecipes = (filters = {}) => {
  const { token } = useContext(AuthContext);
  return useQuery({
    queryKey: ["recipes", filters, token],
    queryFn: () => getAllRecipes(filters, token),
  });
};