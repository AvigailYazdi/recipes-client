import { Alert, CircularProgress } from "@mui/material";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";
import { AdminRecipeCard } from "../components/AdminRecipeCard";

export const AdminRecipesPage = () => {
  const { data: recipes, isLoading, isError, error } = useGetAllRecipes();
  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;
  return (
    <div className="admin-recipe-page-div">
      <h2 className="title-with-lines">ניהול מתכונים</h2>
      <div className="admin-recipe-controls">
        <button>הוספת מתכון</button>
      </div>
      <div className="admin-all-recipes-div">
        {recipes.map((recipe) => (
          <AdminRecipeCard recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
