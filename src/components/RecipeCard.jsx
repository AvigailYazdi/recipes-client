import { RecipeCardBase } from "./RecipeCardBase";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const RecipeCard = (props) => {
 const { recipe } = props;
   return (
     <RecipeCardBase recipe={recipe}>
       <div>
        </div>
     </RecipeCardBase>
   );
};
