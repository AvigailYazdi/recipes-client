import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export const MetaData = (props) => {
    const {prepTime, difficulty, servings} = props;
  return (
    <div className="recipe-metadata">
      <div className="prep-time">
        <QueryBuilderIcon />
        <span>{prepTime} דקות</span>
      </div>
      <div className="difficulty">
        <SpeedIcon />
        <span>{difficulty}</span>
      </div>
      <div className="servings">
        <LocalDiningIcon />
        <span>{servings} מנות</span>
      </div>
    </div>
  );
};
