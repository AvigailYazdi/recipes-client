import { useNavigate } from "react-router";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAddToFavoritesMutation } from "../hooks/useAddToFavoritesMutation";
import { useRemoveFromFavoritesMutation } from "../hooks/useRemoveFromFavoritesMutation";
import { useGetUserFavorites } from "../hooks/useGetUserFavorites";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const SimilarRecipes = (props) => {
  const navigate = useNavigate();

  const { category, recipeId } = props;
  const { token } = useContext(AuthContext);

  const { mutate: addToFavorites } = useAddToFavoritesMutation();
  const { mutate: removeFromFavorites } = useRemoveFromFavoritesMutation();

  const { data: favorites = [] } = useGetUserFavorites();
  const favoriteIds = favorites.map((recipe) => recipe._id);

  const {
    data: similarRecipes = [],
    isLoading,
    isError,
    error,
  } = useGetAllRecipes({ category });

  const filteredSimilarRecipes = similarRecipes.filter(
    (r) => r._id !== recipeId,
  );

  const randomSimilarRecipes = [...filteredSimilarRecipes]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const handleFavoriteClick = (event, recipe) => {
    event.preventDefault();
    event.stopPropagation();

    const isFavorite = favoriteIds.includes(recipe._id);

    if (isFavorite) {
      removeFromFavorites({ recipeId: recipe._id, token });
    } else {
      addToFavorites({ recipeId: recipe._id, token });
    }
  };

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
          {randomSimilarRecipes.map((r) => (
            <div key={r._id} className="similar-recipe-card">
              {token && (
                <div className="favorite-icon-div-similar">
                  <IconButton
                    className="favorite-icon-button"
                    onClick={(event) => handleFavoriteClick(event, r)}
                  >
                    {favoriteIds.includes(r._id) ? (
                      <FavoriteIcon sx={{ color: "#996666" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </div>
              )}
              <img src={r.images[0]} onClick={() => handleNavigate(r._id)} />
              <span className="similar-recipe-title">{r.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
