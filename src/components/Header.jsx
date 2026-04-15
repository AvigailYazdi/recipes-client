import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export const Header = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedSearch = searchText.trim();
    if (trimmedSearch === "") {
      navigate("/recipes");
      return;
    }
    navigate(`/recipes?q=${encodeURIComponent(trimmedSearch)}`);
  };

  const handleCategory = (category) => {
    navigate(`/recipes?category=${category}`);
  };

  return (
    <div className="header-div">
      <img
        className="headerImg"
        src="https://www.bishulim.co.il/sites/default/files/styles/home_stage_1500_700/public/2026-01/Bishulim_YomHaazmaut_Header_HP2_0.jpg?h=bbe8b00e&itok=Uy7__953"
      />
      <div className="search-wrapper-header">
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
      <div className="fast-categories">
        <Button
          className="fast-categories-btn"
          onClick={() => handleCategory("מרקים")}
        >
          מרקים
        </Button>
        <Button
          className="fast-categories-btn"
          onClick={() => handleCategory("סלטים")}
        >
          סלטים
        </Button>
        <Button
          className="fast-categories-btn"
          onClick={() => handleCategory("תוספות")}
        >
          תוספות
        </Button>
        <Button
          className="fast-categories-btn"
          onClick={() => handleCategory("עיקריות")}
        >
          עיקריות
        </Button>
        <Button
          className="fast-categories-btn"
          onClick={() => handleCategory("מאפים")}
        >
          מאפים
        </Button>
        <Button
          className="fast-categories-btn"
          onClick={() => handleCategory("מתוקים")}
        >
          מתוקים
        </Button>
      </div>
    </div>
  );
};
