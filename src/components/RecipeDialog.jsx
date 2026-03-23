import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export const RecipeDialog = (props) => {
  const { isDialogOpen, closeFunc, dialogMode, recipe } = props;
  const emptyRecipe = {
    title: "",
    description: "",
    images: [""],
    categories: [""],
    prepTimeMinutes: "",
    difficulty: "קל",
    servings: "",
    tags: [""],
    status: "טיוטה",
    ingredients: [
      {
        title: "",
        items: [{ name: "", amount: "", unit: "" }],
      },
    ],
    steps: [
      {
        title: "",
        items: [""],
      },
    ],
  };

  const isEdit = dialogMode === "Edit";
  const [formData, setFormData] = useState(emptyRecipe);
  const [images, setImages] = useState(null);
  const difficultiesOptions = ["קל", "בינוני", "קשה"];
  const statusOptions = ["טיוטה", "פורסם"];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(images);
  };
  const handleClose = () => {
    setFormData(emptyRecipe);
    closeFunc();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      return { ...prev, [field]: value };
    });
  };

  useEffect(() => {
    if (isDialogOpen) {
      if (isEdit) {
        setFormData(recipe);
      } else {
        setFormData(emptyRecipe);
      }
    }
  }, [recipe, isDialogOpen, dialogMode]);

  return (
    <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {dialogMode === "Add" ? "הוספת מתכון" : "עריכת מתכון"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="recipe-form">
          <TextField
            required
            label="כותרת"
            type="text"
            margin="normal"
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <TextField
            label="תיאור"
            type="text"
            margin="normal"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <TextField
            required
            label="זמן הכנה (בדקות)"
            type="number"
            slotProps={{
              htmlInput: {
                step: "1",
                min: 0,
              },
            }}
            margin="normal"
            fullWidth
            value={formData.prepTimeMinutes}
            onChange={(e) => handleChange("prepTimeMinutes", e.target.value)}
          />
          <TextField
            required
            label="מספר מנות"
            type="number"
            slotProps={{
              htmlInput: {
                step: "1",
                min: 0,
              },
            }}
            margin="normal"
            fullWidth
            value={formData.servings}
            onChange={(e) => handleChange("servings", e.target.value)}
          />
          <TextField
            label="רמת קושי"
            select
            margin="normal"
            fullWidth
            value={formData.difficulty}
            onChange={(e) => handleChange("difficulty", e.target.value)}
          >
            {difficultiesOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="סטטוס"
            select
            margin="normal"
            fullWidth
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="recipe-form">
          {dialogMode === "Add" ? "הוספה" : "אשר שינויים"}
        </Button>
        <Button onClick={handleClose}>ביטול</Button>
      </DialogActions>
    </Dialog>
  );
};
