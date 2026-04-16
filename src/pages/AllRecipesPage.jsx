import { Alert, CircularProgress } from "@mui/material";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";
import { RecipeCard } from "../components/RecipeCard";
import { Navbar } from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const AllRecipesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const filters = {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    tag: searchParams.get("tag") || "",
    difficulty: searchParams.get("difficulty") || "",
    maxTime: searchParams.get("maxTime") || "",
    sort: searchParams.get("sort") || "",
  };

  const {
    data: allRecipes,
    isLoading,
    isError,
    error,
  } = useGetAllRecipes(filters);

  const [searchText, setSearchText] = useState(filters.q);

  useEffect(() => {
    setSearchText(filters.q || "");
  }, [filters.q]);

  const handleSearch = () => {
    const trimmedSearch = searchText.trim();
    if (trimmedSearch === "") {
      navigate("/recipes");
      return;
    }
    navigate(`/recipes?q=${encodeURIComponent(trimmedSearch)}`);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <div>
      <Navbar />
      <div className="all-recipes-page-div">
        <div className="search-wrapper-recipes-page">
          <SearchOutlinedIcon className="search-icon" onClick={handleSearch} />
          <input
            className="search-recipe-header"
            placeholder="חיפוש מתכון..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="all-recipes-div">
          {allRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};
