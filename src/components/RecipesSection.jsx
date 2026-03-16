import { CircularProgress } from "@mui/material";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes"
import { NewRecipesGrid } from "./NewRecipesGrid";
import { PopularCarousel } from "./PopularCarousel";

export const RecipesSection = () => {
    const { data: recipes, isLoading, isError } = useGetAllRecipes();

    if (isLoading) return <CircularProgress />;
    if (isError) return <div>Error loading recipes</div>;

    return (
        <div className="recipe-section-div">
            <h1>מתכונים מומלצים</h1>
            <PopularCarousel popularRecipes={recipes.slice(0, 7)} />
            <h1>מתכונים חדשים</h1>
            <NewRecipesGrid newRecipes = {recipes.slice(0,9)}/>
        </div>
    )
}