import { IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export const RecipeDialogImagesSection = (props) => {
  const { existingImages, setExistingImages, newImages, setNewImages } = props;

  return (
    <div>
      <Typography>תמונות *</Typography>
      <div className="thumbnail-gallery">
        {existingImages.map((imageUrl, index) => (
          <div className="image-thumbnail-wrapper" key={index}>
            <img src={imageUrl} className="image-thumbnail" />
            <IconButton
              className="delete-image-thumbnail"
              onClick={() =>
                setExistingImages(existingImages.filter((_, i) => i !== index))
              }
            >
              <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </div>
        ))}
        {newImages.map((imageFile, index) => (
          <div className="image-thumbnail-wrapper" key={index}>
            <img
              src={URL.createObjectURL(imageFile)}
              className="image-thumbnail"
            />
            <IconButton
              className="delete-image-thumbnail"
              onClick={() =>
                setNewImages((prev) => prev.filter((_, i) => i !== index))
              }
            >
              <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </div>
        ))}
      </div>
      <input
        required
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setNewImages(Array.from(e.target.files))}
      />
    </div>
  );
};
