import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import { CircularProgress } from "@mui/material";

export const RequireAdmin = ({children}) => {
  const { user, isAdmin, isLoading } = useContext(AuthContext);

  if(isLoading) return <CircularProgress />

  if (!user || !isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return children;
};
