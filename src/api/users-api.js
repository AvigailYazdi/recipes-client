export const loginUser = async (body) => {
  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to log in");
  return data;
};

export const registerUser = async (body) => {
  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to sign up");
  return data;
};

export const getMe = async (token) => {
  const response = await fetch("http://localhost:3000/api/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to get me");
  return data;
};

export const getAllUsers = async (token) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers,
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to get all users");
  return data;
};

export const changeRole = async (userId, body, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(
    `http://localhost:3000/api/users/role/${userId}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error || data.message || "Failed to change user's role",
    );
  return data;
};

export const deleteUser = async (userId, token) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: "DELETE",
    headers,
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to delete user");
  return data;
};

export const getUserFavorites = async (token) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch("http://localhost:3000/api/users/favorites", {
    method: "GET",
    headers,
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || data.message || "Failed to get user's favorites");
  return data;
};
