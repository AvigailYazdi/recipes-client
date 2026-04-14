import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/users-api";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables) => deleteUser(variables.userId, variables.token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
