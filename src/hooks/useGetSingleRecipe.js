import { useQuery } from "@tanstack/react-query"
import { getRecipeById } from "../api/recipes-api"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useGetSingleRecipe = (recipeId) => {
    const {token} = useContext(AuthContext);
    return useQuery({
        queryKey: ["recipe", recipeId, token],
        queryFn: () => getRecipeById(recipeId, token),
        enabled: !!recipeId
    })
}