import { useQuery } from "@tanstack/react-query"
import { getAllRecipes } from "../api/recipes-api"

export const useGetAllRecipes = () =>{
    return useQuery({
        queryKey: ["recipes"],
        queryFn: getAllRecipes
    })
}