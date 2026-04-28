import { AddHomeWorkTwoTone } from "@mui/icons-material";

export const getAllRecipes = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.difficulty) params.append("difficulty", filters.difficulty);
  if (filters.maxTime) params.append("maxTime", filters.maxTime);
  if (filters.q) params.append("q", filters.q);
  if (filters.sort) params.append("sort", filters.sort);

  if (filters.tag) {
    const tags = Array.isArray(filters.tag) ? filters.tag : [filters.tag];
    tags.forEach((tag) => params.append("tag", tag));
  }

  const response = await fetch(
    `http://localhost:3000/api/recipes?${params.toString()}`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to get recipes.");
  }
  return data;
};

export const getRecipeById = async (recipeId, token) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(
    `http://localhost:3000/api/recipes/${recipeId}`,
    {
      method: "GET",
      headers,
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to get recipe.");
  return data;
};

export const getRecipeComments = async (recipeId) => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/comments/${recipeId}`,
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error || data.message || "Failed to get recipe's comments.",
    );
  return data;
};

export const addRecipe = async (body, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`http://localhost:3000/api/recipes`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to add new recipe.");
  return data;
};

export const updateRecipe = async (recipeId, body, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(
    `http://localhost:3000/api/recipes/${recipeId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to update recipe.");
  return data;
};

export const deleteRecipe = async (recipeId, token) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(
    `http://localhost:3000/api/recipes/${recipeId}`,
    {
      method: "DELETE",
      headers,
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to delete recipe.");
  return data;
};

export const getMaxPrepTime = async () => {
  const response = await fetch(
    "http://localhost:3000/api/recipes/max-prep-time",
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error || data.message || "Failed to fetch max prep time",
    );
  return data;
};

export const addToFavorites = async (recipeId, token) => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/favorite/${recipeId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to add favorite");
  }
  return data;
};

export const removeFromFavorites = async (recipeId, token) => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/favorite/${recipeId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to remove favorite");
  }
  return data;
};
