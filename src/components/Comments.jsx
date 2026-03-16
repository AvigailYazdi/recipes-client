import { Alert, CircularProgress, Divider } from "@mui/material";
import { useGetRecipeComments } from "../hooks/useGetRecipeComments";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAddComment } from "../hooks/useAddComment";
import { formatRelativeTime } from "../utils/dateUtils";

export const Comments = (props) => {
  const {openAuthDialog} = useContext(AuthContext);
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

  return (
    <div>
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">{error.message}</Alert>}

      {!isLoading && !isError && (
        <div className="all-comment-div">
          <h2 className="title-with-lines">{comments.length} תגובות</h2>
          {comments.map((comment) => (
            <div className="comment-div" key={comment._id}>
              <span className="comment-name">{comment.userId.name}</span>
              <div className="comment-date-div">
                <AccessTimeIcon sx={{ fontSize: 13 }} />
                <span className="comment-date">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
              <span className="comment-text">{comment.text}</span>
              <Divider />
            </div>
          ))}
          <p className="add-comment-title">הוספת תגובה</p>
          <textarea
            className="comment-text-area"
            maxLength={800}
            placeholder="התגובה שלך"
            value={newComment}
            disabled={token===null}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {token === null ? (
            <span className="not-yet-connected" onClick={()=>openAuthDialog("login")}>עוד לא מחובר? התחבר על מנת להוסיף תגובה</span>
          ) : (
            <button className="send-comment-btn" onClick={handleSubmit} disabled={newComment.trim() === ""}>שלח תגובה</button>
          )}
        </div>
      )}
    </div>
  );
};
