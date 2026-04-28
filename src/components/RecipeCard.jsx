import { RecipeCardBase } from "./RecipeCardBase";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAddToFavoritesMutation } from "../hooks/useAddToFavoritesMutation";
import { useRemoveFromFavoritesMutation } from "../hooks/useRemoveFromFavoritesMutation";

export const RecipeCard = (props) => {
  const { recipe, isFavorite } = props;
  const { token } = useContext(AuthContext);
  const { mutate: addToFavorites } = useAddToFavoritesMutation();
  const { mutate: removeFromFavorites } = useRemoveFromFavoritesMutation();

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      removeFromFavorites({ recipeId: recipe._id, token });
    } else {
      addToFavorites({ recipeId: recipe._id, token });
    }
  };

  return (
    <RecipeCardBase recipe={recipe}>
      {token && (
        <div className="favorite-icon-div">
          <IconButton
            className="favorite-icon-button"
            onClick={handleFavoriteClick}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#996666" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      )}
      <div className="recipe-card-meta-data-div">
        <span>{recipe.prepTimeMinutes} דקות</span>
        <span className="dividing-line">|</span>
        <span>{recipe.difficulty}</span>
        <span className="dividing-line">|</span>
        <span>{recipe.servings} מנות</span>
      </div>
    </RecipeCardBase>
  );
};
