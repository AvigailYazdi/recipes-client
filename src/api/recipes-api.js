export const getAllRecipes = async () => {
    const response = await fetch("http://localhost:3000/api/recipes");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Faild to get all recipes.");
    return data;
};

export const getRecipeById = async (recipeId, token) => {
    const headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
        method: "GET",
        headers
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Faild to get recipe.");
    return data;
}