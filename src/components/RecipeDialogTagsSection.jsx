import { IconButton, TextField, Tooltip } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export const RecipeDialogTagsSection = (props) => {
  const { tags, updateTag, addTag } = props;

  return (
    <div>
      {tags.map((tag, index) => (
        <TextField
          key={index}
          label={`תגית ${index + 1}`}
          type="text"
          margin="normal"
          fullWidth
          value={tag}
          onChange={(e) => updateTag(index, e.target.value)}
        />
      ))}
      <Tooltip title="הוסף תגית">
        <IconButton onClick={addTag}>
          <AddOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
