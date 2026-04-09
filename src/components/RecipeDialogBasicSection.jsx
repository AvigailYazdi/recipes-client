import { MenuItem, TextField } from "@mui/material";
 
export const RecipeDialogBasicSection = (props) => {
  const { formData, handleChange, difficultiesOptions, statusOptions } = props;

  return (
    <div>
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
    </div>
  );
};
