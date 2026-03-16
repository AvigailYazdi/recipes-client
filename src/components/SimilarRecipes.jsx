import { useNavigate } from "react-router";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export const SimilarRecipes = (props) => {
  const navigate = useNavigate();

  const { category, recipeId } = props;

  const {
    data: similarRecipes = [],
    isLoading,
    isError,
    error,
  } = useGetAllRecipes({ category });

  const filteredSimilarRecipes = similarRecipes.filter(
    (r) => r._id !== recipeId,
  );

  const handleNavigate = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div>
      <h2 className="title-with-lines">מתכונים דומים</h2>
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">{error.message}</Alert>}

      {!isLoading && !isError && filteredSimilarRecipes.length === 0 && (
        <p>לא נמצאו מתכונים דומים</p>
      )}

      {!isLoading && !isError && filteredSimilarRecipes.length > 0 && (
        <div className="similar-recipes-div">
          {filteredSimilarRecipes.slice(0, 4).map((r) => (
            <div key={r._id} className="similar-recipe-card">
              <img src={r.images[0]} onClick={() => handleNavigate(r._id)} />
              <span className="similar-recipe-title">{r.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
