import { useNavigate } from "react-router";
import { Header } from "./Header";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { AuthDialog } from "./AuthDialog";
import HomeIcon from '@mui/icons-material/Home';

export const Navbar = () => {
    const { user, isAdmin, logout } = useContext(AuthContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState(null);
    const navigate = useNavigate();

    const handleLogIn = () => {
        setIsDialogOpen(true);
        setDialogMode("login");
    }
    const handleSignUp = () => {
        setIsDialogOpen(true);
        setDialogMode("signup");
    }
    const handleNavigateAdmin = () => {
        navigate("/admin");
    }
    const handleNavigateHome = () => {
        navigate("/");
    }

    return (
        <div className="navbar-div">
            <div className="navbar-details-div">
                {user === null ?
                    <div className="navbar-right">
                        <button className="system-connect-button" onClick={handleSignUp}>הרשמה</button>
                        <button className="system-connect-button" onClick={handleLogIn}>התחברות</button>
                    </div>
                    :
                    <div className="navbar-right">
                        <IconButton className="iconBtn">
                            <PersonIcon />
                        </IconButton >
                        <IconButton onClick={logout} className="iconBtn" >
                            <LogoutIcon />
                        </IconButton>
                        {isAdmin() &&
                            <IconButton className="iconBtn" onClick={handleNavigateAdmin}>
                                <SettingsIcon />
                            </IconButton>}
                    </div>
                }
                <div className="navbar-left">
                    <IconButton className="iconBtn" onClick={handleNavigateHome}>
                        <HomeIcon />
                    </IconButton>
                </div>
            </div>
            <AuthDialog isOpen={isDialogOpen} mode={dialogMode} onCloseFunc={() => setIsDialogOpen(false)} />
        </div>
    )
}