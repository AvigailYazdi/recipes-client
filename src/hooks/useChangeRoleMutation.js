import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changeRole } from "../api/users-api"

export const useChangeRoleMutation = ()=>{
      const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables)=>changeRole(variables.userId, variables.body, variables.token),
        onSuccess: ()=> queryClient.invalidateQueries({queryKey: ["users"]})
    })
}