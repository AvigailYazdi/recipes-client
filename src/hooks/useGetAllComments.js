import { useQuery } from "@tanstack/react-query"
import { getAllComments } from "../api/comments-api"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useGetAllComments = () =>{
    const { token } = useContext(AuthContext);

    return useQuery({
        queryFn: ()=> getAllComments(token),
        queryKey: ["comments"]
    })
}