import { RecipeCardBase } from "./RecipeCardBase";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export const RecipeCard = (props) => {
  const { recipe } = props;
  return (
    <RecipeCardBase recipe={recipe}>
      <div className="recipe-card-meta-data-div">
        <div className="recipe-card-meta-data">
          <QueryBuilderIcon sx={{fontSize: 18}}/>
          <span>{recipe.prepTimeMinutes} דקות</span>
        </div>
        <div className="recipe-card-meta-data">
          <SpeedIcon sx={{fontSize: 18}}/>
          <span>{recipe.difficulty}</span>
        </div>
        <div className="recipe-card-meta-data">
          <LocalDiningIcon sx={{fontSize: 18}}/>
          <span>{recipe.servings} מנות</span>
        </div>
      </div>
    </RecipeCardBase>
  );
};
