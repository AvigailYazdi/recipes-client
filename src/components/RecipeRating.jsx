import { Rating } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useGetRecipeRating } from "../hooks/useGetRecipeRating";
import { useGetMyRecipeRating } from "../hooks/useGetMyRecipeRating";
import { useRateRecipeMutation } from "../hooks/useRateRecipeMutation";

export const RecipeRating = ({ recipeId }) => {
  const { token } = useContext(AuthContext);
  const { data: ratingData } = useGetRecipeRating(recipeId);
  const { data: myRating = 0 } = useGetMyRecipeRating(recipeId);
  const { mutate: rateRecipe } = useRateRecipeMutation(recipeId);

  const average = ratingData?.average || 0;
  const count = ratingData?.count || 0;

  return (
    <div className="recipe-rating-div">
      <p className="recipe-rating-text">
        דירוג ממוצע: {average} ({count} מדרגים)
      </p>

      <Rating
        value={myRating}
        onChange={(event, newValue) => rateRecipe({ recipeId, value: newValue, token })}
        max={5}
        disabled={!token}
      />
    </div>
  );
};
