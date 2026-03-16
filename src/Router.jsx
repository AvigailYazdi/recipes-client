import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import App from "./App";
import { RecipePage } from "./pages/RecipePage.jsx";
import { RequireAdmin } from "./components/RequireAdmin.jsx";
import { AdminLayout } from "./components/AdminLayout.jsx";
import { AdminRecipesPage } from "./pages/AdminRecipesPage.jsx";
import { AdminUsersPage } from "./pages/AdminUsersPage.jsx";
import { AdminCommentsPage } from "./pages/AdminCommentsPage.jsx";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
    },
    {
      path: "/recipes/:recipeId",
      Component: RecipePage,
    },
    {
      path: "/admin",
      element: (
        <RequireAdmin>
          <AdminLayout />
        </RequireAdmin>
      ),
      children: [
        { index: true, element: <Navigate to="recipes" replace /> },
        {
          path: "recipes",
          Component: AdminRecipesPage,
        },
        {
          path: "users",
          Component: AdminUsersPage,
        },
        {
          path: "comments",
          Component: AdminCommentsPage,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
