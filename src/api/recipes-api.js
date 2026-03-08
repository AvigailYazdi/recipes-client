export const getAllRecipes = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.category) params.append("category", filters.category);
    if (filters.difficulty) params.append("difficulty", filters.difficulty);
    if (filters.maxTime) params.append("maxTime", filters.maxTime);
    if (filters.q) params.append("q", filters.q);
    if (filters.sort) params.append("sort", filters.sort);

    if (filters.tag) {
        const tags = Array.isArray(filters.tag) ? filters.tag : [filters.tag];
        tags.forEach(tag => params.append("tag", tag));
    }

    const response = await fetch(`http://localhost:3000/api/recipes?${params.toString()}`);
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
    const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
        method: "GET",
        headers
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Faild to get recipe.");
    return data;
}