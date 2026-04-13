import { IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

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
        <input
          id="recipe-images-input"
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            setNewImages((prev) => [...prev, ...Array.from(e.target.files)]);
            e.target.value = null;
          }}
        />
        <label className="add-photo-icon" htmlFor="recipe-images-input">
          <IconButton component="span">
            <AddPhotoAlternateOutlinedIcon />
          </IconButton>
        </label>
      </div>
    </div>
  );
};
