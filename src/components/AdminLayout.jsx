import { Outlet } from "react-router";
import { AdminNavbar } from "./AdminNavbar";

export const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};
