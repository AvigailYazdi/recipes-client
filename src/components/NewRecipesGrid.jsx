import { useNavigate } from "react-router";

export const NewRecipesGrid = (props) => {
    const { newRecipes } = props;
    const navigate = useNavigate();

    const handleNavigate = (recipeId) => {
        navigate(`/recipes/${recipeId}`);
    }

    return (
        <div className="new-recipes-grid-div">
            {newRecipes.map((recipe, index) => (
                <div className={`new-recipe-card-div ${index === 0 || index === 5 || index === 7 ? "big" : ""}`}
                    onClick={() => handleNavigate(recipe._id)}>
                    <img src={recipe.images[0]} />
                    <p className="new-recipe-title">{recipe.title}</p>
                </div>
            ))}
        </div>
    )
}