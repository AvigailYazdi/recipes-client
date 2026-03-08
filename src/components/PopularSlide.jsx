import { useNavigate } from "react-router";

export const PopularSlide = (props) => {
    const { recipes, activeIndex } = props;
    const navigate = useNavigate();

    const handleNavigate = (recipeId) => {
        navigate(`/recipes/${recipeId}`);
    }

    return (
        <div className="popular-slide-window-div">
            <div className="popular-slide-div" style={{ transform: `translateX(${activeIndex * 100}%)` }}>
                {recipes.map((recipe => (
                    <div className="popular-recipe-card-div" key={recipe._id} onClick={() => handleNavigate(recipe._id)}>
                        <img src={recipe.images[0]} />
                        <div className="popular-slide-details-div">
                            <h1>{recipe.title}</h1>
                            <p>{recipe.description}</p>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    )
}