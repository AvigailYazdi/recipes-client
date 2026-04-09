import { Typography } from "@mui/material";

export const RecipeDialogImagesSection = (props) => {
  const { setImages } = props;

  return (
    <div>
      <Typography>תמונות *</Typography>
      <input
        required
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages(e.target.files)}
      />
    </div>
  );
};