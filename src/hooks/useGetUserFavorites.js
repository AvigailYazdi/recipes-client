import { useQuery } from "@tanstack/react-query";
import { getUserFavorites } from "../api/users-api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useGetUserFavorites = () => {
  const { token } = useContext(AuthContext);
  return useQuery({
    queryFn: () => getUserFavorites(token),
    queryKey: ["favorites"],
    enabled: !!token,
  });
};
