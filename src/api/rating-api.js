export const getRecipeRating = async (recipeId) => {
  const response = await fetch(
    `https://recipes-server-dq0m.onrender.com/api/recipes/rating/${recipeId}`,
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error || data.message || "Failed to get recipe rating",
    );
  return data;
};

export const rateRecipe = async ({ recipeId, value, token }) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(
    `https://recipes-server-dq0m.onrender.com/api/recipes/rating/${recipeId}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ value }),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to rate recipe");
  return data;
};

export const getMyRecipeRating = async ({ recipeId, token }) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(
    `https://recipes-server-dq0m.onrender.com/api/recipes/my-rating/${recipeId}`,
    {
      method: "GET",
      headers,
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to get my rating");
  }
  return data;
};
