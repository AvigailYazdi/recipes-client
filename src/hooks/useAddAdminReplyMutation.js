import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdminReply } from "../api/comments-api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAddAdminReplyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables) =>
      addAdminReply(variables.commentId, variables.body, variables.token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};
