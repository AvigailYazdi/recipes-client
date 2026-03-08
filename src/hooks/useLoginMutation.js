import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../api/users-api.js"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.js"

export const useLoginMutation = () => {
    const {login} = useContext(AuthContext);

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => login(data.user, data.token)
    })
}