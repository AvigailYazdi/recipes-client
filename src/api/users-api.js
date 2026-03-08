export const loginUser = async (body) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Failed to log in");
    return data;
}

export const registerUser = async (body) => {
    const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Failed to sign up");
    return data;
}

export const getMe = async (token) => {
    const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Failed to get me");
    return data;
}