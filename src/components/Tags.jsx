import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

export const Tags = (props) => {
  const { tags } = props;
  return (
    <div className="recipe-tags-div">
      {tags &&
        tags.map((tag, index) => (
          <div className="tag-div" key={index}>
            <LocalOfferOutlinedIcon sx={{fontSize: 13}}/>
            {tag}
          </div>
        ))}
    </div>
  );
};
