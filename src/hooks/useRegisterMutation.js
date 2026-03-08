import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../api/users-api.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useRegisterMutation = () => {
    const {login} = useContext(AuthContext);

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => login(data.user, data.token)
    });
}