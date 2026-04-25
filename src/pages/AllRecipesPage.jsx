import {
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";
import { RecipeCard } from "../components/RecipeCard";
import { Navbar } from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useGetMaxPrepTime } from "../hooks/useGetMaxPrepTime";

export const AllRecipesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    data: maxPrepTimeData,
    isLoading: isMaxPrepTimeLoading,
    isError: isMaxPrepTimeError,
    error: maxPrepTimeError,
  } = useGetMaxPrepTime();

  const sliderMax = Number(maxPrepTimeData?.maxPrepTime) || 0;
  const maxTimeParam = searchParams.get("maxTime");

  const filters = {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    tag: searchParams.get("tag") || "",
    difficulty: searchParams.get("difficulty") || "",
    maxTime: Number(maxTimeParam) || sliderMax,
    sort: searchParams.get("sort") || "החדשים ביותר",
  };

  const categories = [
    "ארוחת בוקר",
    "ארוחת צהריים",
    "ארוחת ערב",
    "מרקים",
    "סלטים",
    "תוספות",
    "עיקריות",
    "מאפים",
    "מתוקים",
    "בשרי",
    "חלבי",
    "דגים",
  ];

  const difficulties = ["קל", "בינוני", "קשה"];

  const sortOpt = [
    "החדשים ביותר",
    "הישנים ביותר",
    "זמן הכנה קצר",
    "זמן הכנה ארוך",
  ];

  const {
    data: allRecipes,
    isLoading,
    isError,
    error,
  } = useGetAllRecipes(filters);

  const [searchText, setSearchText] = useState(filters.q);
  const [maxTimeValue, setMaxTimeValue] = useState(0);

  useEffect(() => {
    setSearchText(filters.q || "");
  }, [filters.q]);

  useEffect(() => {
    if (sliderMax > 0) {
      setMaxTimeValue(Number(maxTimeParam) || sliderMax);
    }
  }, [sliderMax, maxTimeParam]);

  const handleSearch = () => {
    const trimmedSearch = searchText.trim();
    if (trimmedSearch === "") {
      navigate("/recipes");
      return;
    }
    navigate(`/recipes?q=${encodeURIComponent(trimmedSearch)}`);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value !== "") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    navigate(`/recipes?${params.toString()}`);
  };

  const handleDifficultyChange = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value !== "") {
      params.set("difficulty", value);
    } else {
      params.delete("difficulty");
    }
    navigate(`/recipes?${params.toString()}`);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value !== "") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    navigate(`/recipes?${params.toString()}`);
  };

  const handleSliderChange = (event, newValue) => {
    setMaxTimeValue(newValue);
  };

  const handleSliderChangeCommitted = (event, newValue) => {
    const params = new URLSearchParams(searchParams);
    params.set("maxTime", String(newValue));
    navigate(`/recipes?${params.toString()}`);
  };

  if (isMaxPrepTimeLoading || isLoading) return <CircularProgress />;
  if (isMaxPrepTimeError)
    return <Alert severity="error">{maxPrepTimeError.message}</Alert>;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <div>
      <Navbar />
      <div className="all-recipes-page-div">
        <div className="search-and-filter-recipes-div">
          <div className="search-wrapper-recipes-page">
            <SearchOutlinedIcon
              className="search-icon"
              onClick={handleSearch}
            />
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
          <div className="filters-wrapper-recipe-page">
            <Select
              sx={{ minWidth: 150 }}
              size="small"
              value={filters.category || ""}
              onChange={handleCategoryChange}
              displayEmpty
            >
              <MenuItem value="">הכל</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <Select
              sx={{ minWidth: 150 }}
              size="small"
              value={filters.difficulty || ""}
              onChange={handleDifficultyChange}
              displayEmpty
            >
              <MenuItem value="">הכל</MenuItem>
              {difficulties.map((dif) => (
                <MenuItem key={dif} value={dif}>
                  {dif}
                </MenuItem>
              ))}
            </Select>
            <Select
              sx={{ minWidth: 150 }}
              size="small"
              value={filters.sort}
              onChange={handleSortChange}
            >
              {sortOpt.map((sort) => (
                <MenuItem key={sort} value={sort}>
                  {sort}
                </MenuItem>
              ))}
            </Select>
            <div className="slider-div">
              <span>זמן הכנה:</span>
              <Slider
                value={maxTimeValue}
                min={0}
                max={sliderMax}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChangeCommitted}
                valueLabelDisplay="auto"
              />
            </div>
          </div>
          <p className="num-results">{allRecipes.length} תוצאות</p>
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
