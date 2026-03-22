import { formatRelativeTime } from "../utils/dateUtils";
import { RecipeCardBase } from "./RecipeCardBase";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const AdminRecipeCard = (props) => {
  const { recipe } = props;
  const editRecipe = (event) => {
    event.stopPropagation();
  }

  const deleteRecipe = (event)=>{
    event.stopPropagation();
  }

  return (
    <RecipeCardBase recipe={recipe}>
      <span className="date">{formatRelativeTime(recipe.updatedAt)}</span>
      <div className="recipe-admin-action-buttons">
        <button className="btn delete-btn" onClick={deleteRecipe}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
        </button>
        <button className="btn edit-btn" onClick={editRecipe}>
          <EditOutlinedIcon sx={{ fontSize: 15 }} />
          <span>עריכת מתכון</span>
        </button>
      </div>
    </RecipeCardBase>
  );
};
