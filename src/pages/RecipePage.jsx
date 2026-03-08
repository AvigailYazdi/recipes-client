import { useNavigate, useParams } from "react-router";
import { useGetSingleRecipe } from "../hooks/useGetSingleRecipe";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";

export const RecipePage = () => {
  const { recipeId } = useParams();
  const {
    data: recipe,
    isLoading1,
    isError1,
    error,
  } = useGetSingleRecipe(recipeId);

  const category = recipe?.categories[0];

  const {
    data: similarRecipes = [],
    isLoading2,
    isError2,
  } = useGetAllRecipes({ category });

  const filteredSimilarRecipes = similarRecipes.filter(
    (r) => r._id !== recipe?._id,
  );

  const [activeImg, setActiveImg] = useState(0);

  const goNext = () => {
    setActiveImg((prev) => (prev + 1) % recipe.images.length);
  };

  const goPrev = () => {
    setActiveImg((prev) => (prev > 0 ? prev - 1 : recipe.images.length - 1));
  };

  const navigate = useNavigate();

  const handleNavigate = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  if (isLoading1)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (isError1)
    return (
      <div>
        <Alert severity="error">{error.message}</Alert>
      </div>
    );
  if (!recipe)
    return (
      <div>
        <Alert severity="info">No recipe found.</Alert>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="recipe-page-div">
        <div className="recipe-page-images-div">
          <img className="recipe-page-image" src={recipe.images[activeImg]} />
          <div className="recipe-page-arrow-btn-div">
            <IconButton onClick={goPrev} className="arrowBtn">
              <ArrowForwardIosIcon />
            </IconButton>
            <IconButton onClick={goNext} className="arrowBtn">
              <ArrowBackIosNewIcon />
            </IconButton>
          </div>
        </div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <h3>רכיבים:</h3>
        {recipe.ingredients.map((section, index) => (
          <div key={index}>
            {section.title && <h4>{section.title}</h4>}
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.amount} {item.unit} {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <h3>אופן ההכנה:</h3>
        {recipe.steps.map((section, index) => (
          <div key={index}>
            {section.title && <h4>{section.title}</h4>}
            <ol>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ol>
          </div>
        ))}
        <h2>מתכונים דומים:</h2>

        {isLoading2 && <CircularProgress />}
        {isError2 && <Alert severity="error">{isError2.message}</Alert>}

        {!isLoading2 && !isError2 && similarRecipes.length === 0 && (
          <p>לא נמצאו מתכונים דומים</p>
        )}

        {!isLoading2 && !isError2 && similarRecipes.length > 0 && (
          <div className="similar-recipes-div">
            {filteredSimilarRecipes.slice(0, 4).map((r) => (
              <div key={r._id} className="similar-recipe-card">
                <img src={r.images[0]} onClick={()=>handleNavigate(r._id)}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
