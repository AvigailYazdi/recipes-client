import { Alert, Button, CircularProgress } from "@mui/material";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";
import { AdminRecipeCard } from "../components/AdminRecipeCard";
import { useState } from "react";
import { RecipeDialog } from "../components/RecipeDialog";

export const AdminRecipesPage = () => {
  const { data: recipes, isLoading, isError, error } = useGetAllRecipes();

  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [recipeDialogMode, setRecipeDialogMode] = useState("Add");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const closeFunc = () => {
    setRecipeDialogOpen(false);
  };

  const openEditDialog = (recipe) => {
    setSelectedRecipe(recipe);
    setRecipeDialogMode("Edit");
    setRecipeDialogOpen(true);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <div className="admin-recipe-page-div">
      <h2 className="title-with-lines">ניהול מתכונים</h2>
      <div className="admin-all-recipes-div">
        <Button
          className="add-recipe-btn"
          onClick={() => {
            setRecipeDialogOpen(true);
            setRecipeDialogMode("Add");
          }}
        >
          מתכון חדש +
        </Button>
        {recipes.map((recipe) => (
          <AdminRecipeCard recipe={recipe} openDialogFunc={openEditDialog} />
        ))}
      </div>
      <RecipeDialog
        isDialogOpen={recipeDialogOpen}
        closeFunc={closeFunc}
        dialogMode={recipeDialogMode}
        recipe={selectedRecipe}
      />
    </div>
  );
};
