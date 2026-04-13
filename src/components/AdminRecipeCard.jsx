import { useContext } from "react";
import { useDeleteRecipeMutation } from "../hooks/useDeleteRecipeMutation";
import { formatRelativeTime } from "../utils/dateUtils";
import { RecipeCardBase } from "./RecipeCardBase";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { AuthContext } from "../context/AuthContext";

export const AdminRecipeCard = (props) => {
  const { recipe, openDialogFunc } = props;
  const { token } = useContext(AuthContext);

  const { mutate: deleteRecipeMutate } = useDeleteRecipeMutation(recipe._id);

  const deleteRecipe = (event) => {
    event.stopPropagation();
    const isConfirmed = window.confirm("האם למחוק את המתכון?");
    if (!isConfirmed) return;
    deleteRecipeMutate(token);
  };

  return (
    <RecipeCardBase recipe={recipe}>
      <span className="date">{formatRelativeTime(recipe.updatedAt)}</span>
      <div className="recipe-admin-action-buttons">
        <button className="btn delete-btn" onClick={deleteRecipe}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
        </button>
        <button
          className="btn edit-btn"
          onClick={(event) => {
            event.stopPropagation();
            openDialogFunc(recipe);
          }}
        >
          <EditOutlinedIcon sx={{ fontSize: 15 }} />
          <span>עריכת מתכון</span>
        </button>
      </div>
    </RecipeCardBase>
  );
};
