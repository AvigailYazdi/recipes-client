import { useQuery } from "@tanstack/react-query";
import { getMaxPrepTime } from "../api/recipes-api";

export const useGetMaxPrepTime = () => {
  return useQuery({
    queryKey: ["maxPrepTime"],
    queryFn: getMaxPrepTime,
  });
};
