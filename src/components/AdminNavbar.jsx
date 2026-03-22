import { IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";

export const AdminNavbar = () => {

    const navigate = useNavigate();

  return (
    <div className="admin-nav-div">
      <div className="admin-nav-links">
        <NavLink className={({isActive})=>isActive?"admin-link active": "admin-link"} to="/admin/recipes">מתכונים</NavLink>
        <NavLink className={({isActive})=>isActive?"admin-link active": "admin-link"} to="/admin/users">משתמשים</NavLink>
        <NavLink className={({isActive})=>isActive?"admin-link active": "admin-link"} to="/admin/comments">תגובות</NavLink>
      </div>
      <div className="admin-nav-home">
        <IconButton className="IconBtn" onClick={()=>navigate("/")}>
          <HomeIcon />
        </IconButton>
      </div>
    </div>
  );
};
