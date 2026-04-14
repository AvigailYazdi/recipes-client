export const addComment = async (recipeId, token, body) => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/comments/${recipeId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to add comment");
  return data;
};

export const getAllComments = async (token) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch("http://localhost:3000/api/comments", {
    method: "GET",
    headers,
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to get all comments");
  return data;
};
