import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useNavigate } from "react-router";

export const Tags = (props) => {
  const { tags } = props;
  const navigate = useNavigate();

  const handleTag = (tag) => {
    navigate(`/recipes?tag=${tag}`);
  };

  return (
    <div className="recipe-tags-div">
      {tags &&
        tags.map((tag, index) => (
          <div className="tag-div" key={index} onClick={() => handleTag(tag)}>
            <LocalOfferOutlinedIcon sx={{ fontSize: 13 }} />
            {tag}
          </div>
        ))}
    </div>
  );
};
