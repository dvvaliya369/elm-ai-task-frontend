import React, { memo, useState } from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "../../store";
import { addComment } from "../../service/post.service";
import { useToast } from "../../hooks/useToast";
import { commentInputStyles } from "./styles";

interface CommentInputProps {
  postId: string;
  placeholder?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  placeholder = "Add a comment...",
}) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { commentLoading } = useSelector((state) => state.posts);
  const { showError, showSuccess } = useToast();

  const isLoading = commentLoading[postId] || false;

  const handleSubmit = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (!comment.trim()) return;

    if (!isAuthenticated) {
      showError("Please log in to add a comment");
      return;
    }

    try {
      const result = await dispatch(
        addComment({ postId, comment: comment.trim() })
      );

      if (addComment.fulfilled.match(result)) {
        setComment("");
        showSuccess("Comment added successfully");
      } else if (addComment.rejected.match(result)) {
        showError((result.payload as string) || "Failed to add comment");
      }
    } catch {
      showError("Failed to add comment");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Box onClick={handleContainerClick} sx={commentInputStyles.container}>
      <Box sx={commentInputStyles.inputRow}>
        <TextField
          fullWidth
          variant="standard"
          placeholder={placeholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyPress}
          multiline
          maxRows={3}
          sx={commentInputStyles.textField}
        />

        {comment.trim() && (
          <IconButton
            onClick={handleSubmit}
            disabled={isLoading}
            size="small"
            sx={commentInputStyles.sendButton}
          >
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <SendIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default memo(CommentInput);
