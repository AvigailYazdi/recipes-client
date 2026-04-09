import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

export const RecipeDialogCategoriesSection = (props) => {
  const { categories, updateCategories, allCategories } = props;

  return (
    <FormGroup>
      <Typography>קטגוריות *</Typography>
      <div className="categories-div">
        {allCategories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={categories.includes(category)}
                onChange={() => updateCategories(category)}
              />
            }
            label={category}
          />
        ))}
      </div>
    </FormGroup>
  );
};
