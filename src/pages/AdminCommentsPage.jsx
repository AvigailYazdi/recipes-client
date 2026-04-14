import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useGetAllComments } from "../hooks/useGetAllComments";
import { formatRelativeTime } from "../utils/dateUtils";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAddAdminReplyMutation } from "../hooks/useAddAdminReplyMutation";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AdminCommentsPage = () => {
  const {
    data: allComments = [],
    isLoading,
    isError,
    error,
  } = useGetAllComments();
  const { token } = useContext(AuthContext);
  const [isOpenReplyDialog, setIsOpenReplyDialog] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState("");
  const { mutate: addAdminReplyMutate } = useAddAdminReplyMutation();

  const handleOpenReply = (comment) => {
    setSelectedComment(comment);
    setIsOpenReplyDialog(true);
  };

  const handleCloseReply = () => {
    setIsOpenReplyDialog(false);
    setSelectedComment(null);
    setReplyText("");
  };

  const handleSendReply = () => {
    addAdminReplyMutate({
      commentId: selectedComment._id,
      body: { text: replyText },
      token,
    });
    handleCloseReply();
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;
  return (
    <div className="admin-comments-page-div">
      <h2 className="title-with-lines">ניהול תגובות</h2>
      <div className="admin-all-comments-div">
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
                <TableCell>מתכון</TableCell>
                <TableCell>תגובה</TableCell>
                <TableCell>תגובת מנהל</TableCell>
                <TableCell>תאריך</TableCell>
                <TableCell>מחיקה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allComments.map((comment) => (
                <TableRow key={comment._id} hover>
                  <TableCell>{comment.userId?.name || "משתמש שנמחק"}</TableCell>
                  <TableCell>{comment.recipeId?.title || "מתכון שנמחק"}</TableCell>
                  <TableCell>{comment.text}</TableCell>
                  <TableCell>
                    {comment.adminReply?.text || (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={()=>handleOpenReply(comment)}
                      >
                        הגב
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{formatRelativeTime(comment.createdAt)}</TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={isOpenReplyDialog}
        onClose={handleCloseReply}
      >
        <DialogTitle>הוסף תגובת מנהל</DialogTitle>
        <DialogContent>
          <TextField
            required
            type="text"
            label="תגובה"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReply}>ביטול</Button>
          <Button
            className="send-reply-btn"
            variant="contained"
            disabled={!replyText.trim()}
            onClick={handleSendReply}
          >
            שלח
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
