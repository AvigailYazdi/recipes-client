import {
  Alert,
  CircularProgress,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { formatRelativeTime } from "../utils/dateUtils";
import { useChangeRoleMutation } from "../hooks/useChangeRoleMutation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDeleteUserMutation } from "../hooks/useDeleteUserMutation";

export const AdminUsersPage = () => {
  const { token, user: currentUser } = useContext(AuthContext);
  const { data: allUsers = [], isLoading, isError, error } = useGetAllUsers();
  const { mutate: changeRoleMutate } = useChangeRoleMutation();
  const { mutate: deleteUserMutate } = useDeleteUserMutation();

  const handleChangeRole = (userId, role) => {
    const isConfirmed = window.confirm("האם לעדכן תפקיד משתמש?");
    if (!isConfirmed) return;
    changeRoleMutate({
      userId,
      body: { role },
      token,
    });
  };

  const handleDeleteUser = (userId) => {
    const isConfirmed = window.confirm("האם למחוק משתמש?");
    if (!isConfirmed) return;
    deleteUserMutate({ userId, token });
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <div className="admin-users-page-div">
      <h2 className="title-with-lines">ניהול משתמשים</h2>
      <div className="admin-all-users-div">
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table
            sx={{
              tableLayout: "fixed",
              "& td, & th": { textAlign: "center" },
            }}
          >
            <TableHead sx={{ "& th": { fontWeight: 900 } }}>
              <TableRow>
                <TableCell>שם משתמש</TableCell>
                <TableCell>מייל</TableCell>
                <TableCell>תפקיד</TableCell>
                <TableCell>תאריך הרשמה</TableCell>
                <TableCell>מחיקה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      variant="standard"
                      disableUnderline
                      value={user.role}
                      size="small"
                      disabled={user._id === currentUser?._id}
                      onChange={(e) => {
                        handleChangeRole(user._id, e.target.value);
                      }}
                    >
                      <MenuItem value="משתמש">משתמש</MenuItem>
                      <MenuItem value="מנהל">מנהל</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{formatRelativeTime(user.createdAt)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={user._id === currentUser?._id}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
