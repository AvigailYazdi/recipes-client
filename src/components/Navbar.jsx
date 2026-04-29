import { NavLink, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { AuthDialog } from "./AuthDialog";
import HomeIcon from "@mui/icons-material/Home";
import { ProfileDrawer } from "./ProfileDrawer";

export const Navbar = () => {
  const { user, isAdmin, logout, isLoading, openAuthDialog } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNavigateAdmin = () => {
    navigate("/admin");
  };
  const handleNavigateHome = () => {
    navigate("/");
  };

  const toggleDrawer = (newOpen) =>{
    setIsDialogOpen(newOpen);
  }

  if (isLoading) return <CircularProgress />;

  return (
    <div className="navbar-div">
      <div className="navbar-details-div">
        {user === null ? (
          <div className="navbar-right">
            <NavLink
              className="system-connect-link"
              onClick={() => openAuthDialog("signup")}
            >
              הרשמה
            </NavLink>
            <NavLink
              className="system-connect-link"
              onClick={() => openAuthDialog("login")}
            >
              התחברות
            </NavLink>
          </div>
        ) : (
          <div className="navbar-right">
            <IconButton className="iconBtn" onClick={()=>toggleDrawer(true)}>
              <PersonIcon />
            </IconButton>
            {isAdmin() && (
              <IconButton className="iconBtn" onClick={handleNavigateAdmin}>
                <SettingsIcon />
              </IconButton>
            )}
          </div>
        )}
        <div className="navbar-left">
          <IconButton className="iconBtn" onClick={handleNavigateHome}>
            <HomeIcon />
          </IconButton>
        </div>
      </div>
      <AuthDialog />
      <ProfileDrawer isOpen={isDialogOpen} toggleDrawer={toggleDrawer}/>
    </div>
  );
};
