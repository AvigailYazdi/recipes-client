import { createBrowserRouter, RouterProvider } from "react-router"
import App from "./App"
import { RecipePage } from "./pages/RecipePage.jsx"
import { AdminPage } from "./pages/AdminPage.jsx"


export const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: App
        },
        {
            path: "/recipes/:recipeId",
            Component: RecipePage
        },
        {
            path: "/admin",
            Component: AdminPage
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}