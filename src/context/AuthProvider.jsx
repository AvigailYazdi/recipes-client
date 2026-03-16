import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { getMe } from "../api/users-api.js";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const openAuthDialog = (mode) => {
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  const closeAuthDialog = () => {
    setIsDialogOpen(false);
    setDialogMode(null);
  };

  const login = (user, token) => {
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setIsLoading(false);
      return;
    }
    (async () => {
      try {
        const user = await getMe(savedToken);
        setUser(user);
        setToken(savedToken);
        setIsLoading(false);
      } catch (e) {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setIsLoading(false);
      }
    })();
  }, []);

  const value = {
    user,
    token,
    isDialogOpen,
    dialogMode,
    isLoading,
    login,
    logout,
    isLoggedIn,
    isAdmin,
    openAuthDialog,
    closeAuthDialog,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
