import { RecipeCardBase } from "./RecipeCardBase";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export const RecipeCard = (props) => {
  const { recipe } = props;
  return (
    <RecipeCardBase recipe={recipe}>
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
