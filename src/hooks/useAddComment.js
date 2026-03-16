import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/comments-api";

export const useAddComment = (recipeId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables) => addComment(recipeId, variables.token, variables.body),
    onSuccess: () => queryClient.invalidateQueries(["comments", recipeId]),
  });
};
