import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/users-api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useGetAllUsers = () => {
  const { token } = useContext(AuthContext);
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(token),
    enabled: !!token
  });
};
