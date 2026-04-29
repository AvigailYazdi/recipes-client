import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useGetUserFavorites } from "../hooks/useGetUserFavorites";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRemoveFromFavoritesMutation } from "../hooks/useRemoveFromFavoritesMutation";

export const ProfileDrawer = (props) => {
  const { isOpen, toggleDrawer } = props;
  const { user, logout } = useContext(AuthContext);
  const { data: favorites = [] } = useGetUserFavorites();
  const { token } = useContext(AuthContext);
  const { mutate: delteFavorite } = useRemoveFromFavoritesMutation();

  const handleLogout = () => {
    toggleDrawer(false);
    logout();
  };

  return (
    <Drawer open={isOpen} onClose={() => toggleDrawer(false)}>
      <div className="drawer-div">
        <div className="drawer-detalis-div">
          <span>שלום, {user?.name}!</span>
          <span>{user?.email}</span>
          <span className="log-out" onClick={handleLogout}>התנתקות</span>
          <p>מתכונים שאהבת ({favorites.length})</p>
        </div>
        <Divider />
        <List>
          {favorites.map((recipe) => (
            <div key={recipe._id}>
              <ListItem
                className="favorite-list-item"
                secondaryAction={
                  <IconButton
                    className="delete-favorite-btn"
                    onClick={() =>
                      delteFavorite({ recipeId: recipe._id, token })
                    }
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={recipe?.images[0]} />
                </ListItemAvatar>
                <ListItemText primary={recipe?.title} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </Drawer>
  );
};
