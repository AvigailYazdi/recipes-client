import { useParams } from "react-router";
import { useGetSingleRecipe } from "../hooks/useGetSingleRecipe";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { SimilarRecipes } from "../components/SimilarRecipes";
import { Ingredients } from "../components/Ingredients";
import { Steps } from "../components/Steps";

export const RecipePage = () => {
  const { recipeId } = useParams();
  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useGetSingleRecipe(recipeId);

  const category = recipe?.categories[0];

  const [activeImg, setActiveImg] = useState(0);

  const goNext = () => {
    setActiveImg((prev) => (prev + 1) % recipe.images.length);
  };

  const goPrev = () => {
    setActiveImg((prev) => (prev > 0 ? prev - 1 : recipe.images.length - 1));
  };

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (isError)
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
          {recipe.images.length > 1 && (
            <div className="recipe-page-arrow-btn-div">
              <IconButton onClick={goPrev} className="arrowBtn">
                <ArrowForwardIosIcon />
              </IconButton>
              <IconButton onClick={goNext} className="arrowBtn">
                <ArrowBackIosNewIcon />
              </IconButton>
            </div>
          )}
        </div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <h3>רכיבים:</h3>
        <Ingredients ingredients={recipe.ingredients} />
        <h3>אופן ההכנה:</h3>
        <Steps steps={recipe.steps} />
        <h2>מתכונים דומים:</h2>
        <SimilarRecipes category={category} recipeId={recipe._id} />
      </div>
    </>
  );
};
