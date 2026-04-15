import { Alert, CircularProgress, Divider } from "@mui/material";
import { useGetRecipeComments } from "../hooks/useGetRecipeComments";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAddComment } from "../hooks/useAddComment";
import { formatRelativeTime } from "../utils/dateUtils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const Comments = (props) => {
  const [openComments, setOpenComments] = useState([]);
  const { openAuthDialog } = useContext(AuthContext);
  const { recipeId } = props;
  const [newComment, setNewComment] = useState("");
  const { token } = useContext(AuthContext);
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useGetRecipeComments(recipeId);

  const { mutate: addComment } = useAddComment(recipeId);

  const handleSubmit = () => {
    addComment(
      { token, body: { text: newComment.trim() } },
      { onSuccess: () => setNewComment("") },
    );
  };

  const toggleReply = (commentId) => {
    if (openComments.includes(commentId)) {
      setOpenComments((prev) =>
        prev.filter((comment) => comment !== commentId),
      );
    } else {
      setOpenComments((prev) => [...prev, commentId]);
    }
  };

  return (
    <div>
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">{error.message}</Alert>}

      {!isLoading && !isError && (
        <div className="all-comment-div">
          <h2 className="title-with-lines">{comments.length} תגובות</h2>
          {comments.map((comment) => (
            <div key={comment._id}>
              <div className="comment-div">
                <span className="comment-name">
                  {comment.userId?.name || "משתמש"}
                </span>
                <div className="comment-date-div date">
                  <AccessTimeIcon sx={{ fontSize: 13 }} />
                  <span>{formatRelativeTime(comment.createdAt)}</span>
                </div>
                <span className="comment-text">{comment.text}</span>
                {comment.adminReply?.text && (
                  <div className="admin-reply-div">
                    <div
                      className="system-reply"
                      onClick={() => toggleReply(comment._id)}
                    >
                      {openComments.includes(comment._id) ? (
                        <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                      ) : (
                        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                      )}
                      <span>תגובת מערכת</span>
                    </div>
                    {openComments.includes(comment._id) && (
                      <div>
                        <div className="comment-date-div date">
                          <AccessTimeIcon sx={{ fontSize: 13 }} />
                          <span>
                            {formatRelativeTime(comment.adminReply.createdAt)}
                          </span>
                        </div>
                        <span>{comment.adminReply.text}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Divider />
            </div>
          ))}
          <p className="add-comment-title">הוספת תגובה</p>
          <textarea
            className="comment-text-area"
            maxLength={800}
            placeholder="התגובה שלך"
            value={newComment}
            disabled={!token}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {token === null ? (
            <span
              className="not-yet-connected"
              onClick={() => openAuthDialog("login")}
            >
              עוד לא מחובר? התחבר על מנת להוסיף תגובה
            </span>
          ) : (
            <button
              className="btn send-comment-btn"
              onClick={handleSubmit}
              disabled={newComment.trim() === ""}
            >
              שלח תגובה
            </button>
          )}
        </div>
      )}
    </div>
  );
};
