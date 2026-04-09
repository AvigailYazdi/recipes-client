import { IconButton, TextField, Tooltip, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

export const RecipeDialogIngredientsSection = (props) => {
  const {
    ingredients,
    updateIngredient,
    updateIngredientSectionTitle,
    addIngredientItem,
    addIngredientSection,
    removeIngredientItem,
    removeIngredientSection,
  } = props;
  return (
    <div>
      <Typography>מרכיבים *</Typography>
      <div className="ingredients-div">
        {ingredients.map((ingredient, ingredientIndex) => (
          <div className="ingredients-section-div" key={ingredientIndex}>
            <div className="ingredient-section-header">
              <Tooltip title="מחק קבוצת מרכיבים">
                <IconButton
                  onClick={() => removeIngredientSection(ingredientIndex)}
                  disabled={ingredients.length === 1}
                >
                  <RemoveOutlinedIcon />
                </IconButton>
              </Tooltip>
              <TextField
                type="text"
                label="כותרת"
                fullWidth
                value={ingredient.title}
                onChange={(e) =>
                  updateIngredientSectionTitle(ingredientIndex, e.target.value)
                }
              />
            </div>
            {ingredient.items.map((item, itemIndex) => (
              <div
                className="ingredient-div"
                key={`${ingredientIndex}-${itemIndex}`}
              >
                <TextField
                  label="שם"
                  type="text"
                  margin="normal"
                  value={item.name}
                  onChange={(e) =>
                    updateIngredient(
                      ingredientIndex,
                      itemIndex,
                      "name",
                      e.target.value,
                    )
                  }
                />
                <TextField
                  label="כמות"
                  type="text"
                  margin="normal"
                  value={item.amount}
                  onChange={(e) =>
                    updateIngredient(
                      ingredientIndex,
                      itemIndex,
                      "amount",
                      e.target.value,
                    )
                  }
                />
                <TextField
                  label="יחידה"
                  type="text"
                  margin="normal"
                  value={item.unit}
                  onChange={(e) =>
                    updateIngredient(
                      ingredientIndex,
                      itemIndex,
                      "unit",
                      e.target.value,
                    )
                  }
                />
                <Tooltip title="מחק מרכיב">
                  <IconButton
                    onClick={() =>
                      removeIngredientItem(ingredientIndex, itemIndex)
                    }
                    disabled={
                      ingredients.length === 1 &&
                      ingredient.items.length === 1
                    }
                  >
                    <RemoveOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
            <Tooltip title="הוסף מרכיב">
              <IconButton onClick={() => addIngredientItem(ingredientIndex)}>
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
      <Tooltip title="הוסף קבוצת מרכיבים">
        <IconButton onClick={addIngredientSection}>
          <AddOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
