import { useNavigate } from "react-router";

export const RecipeCardBase = (props) => {
  const { recipe, children } = props;
  const navigate = useNavigate();

  const handleNavigate = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div className="recipe-card-div" onClick={() => handleNavigate(recipe._id)}>
      <img src={recipe?.images[0]} />
      <div className="recipe-card-details-div">
        <p className="recipe-card-title">{recipe.title}</p>
        {children}
      </div>
    </div>
  );
};
