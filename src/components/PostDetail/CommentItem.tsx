import React, { memo, useCallback } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "../../store";
import { deleteComment, toggleCommentLike } from "../../service/post.service";
import { useToast } from "../../hooks/useToast";
import type { IComment } from "../../interface";
import { formatTime } from "../../utils/formatTime";
import { commentItemStyles } from "./styles";
import CommentLikeButton from "./CommentLikeButton";

interface CommentItemProps {
  comment: IComment;
  postId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { user, deleteCommentLoading, commentLikeLoading } = useSelector((state) => ({
    user: state.auth.user,
    deleteCommentLoading: state.posts.deleteCommentLoading,
    commentLikeLoading: state.posts.commentLikeLoading,
  }));
  const { showError, showSuccess } = useToast();

  const isLoading = deleteCommentLoading[comment._id] || false;
  const isLikeLoading = commentLikeLoading[comment._id] || false;
  const canDelete = user && user._id === comment?.user._id;

  const handleDelete = useCallback(async () => {
    try {
      const result = await dispatch(
        deleteComment({
          postId,
          commentId: comment._id,
        })
      );

      if (deleteComment.fulfilled.match(result)) {
        showSuccess("Comment deleted successfully");
      } else if (deleteComment.rejected.match(result)) {
        showError((result.payload as string) || "Failed to delete comment");
      }
    } catch {
      showError("Failed to delete comment");
    }
  }, [dispatch, postId, comment._id, showError, showSuccess]);

  const handleToggleCommentLike = useCallback(async (commentId: string, postIdParam: string) => {
    try {
      const result = await dispatch(
        toggleCommentLike({
          postId: postIdParam,
          commentId,
        })
      );

      if (toggleCommentLike.rejected.match(result)) {
        showError((result.payload as string) || "Failed to like comment");
      }
    } catch {
      showError("Failed to like comment");
    }
  }, [dispatch, showError]);

  const getAvatarProps = (user: IComment["user"]) => {
    if (user.profilePhoto?.photo_url) {
      return { src: user.profilePhoto.photo_url };
    }

    return {
      children: comment.name[0],
      sx: commentItemStyles.avatarWithInitials,
    };
  };

  return (
    <Box sx={commentItemStyles.container}>
      <Avatar
        {...getAvatarProps(comment.user)}
        sx={{ ...commentItemStyles.avatar, ...getAvatarProps(comment.user).sx }}
      />

      <Box sx={commentItemStyles.content}>
        <Box sx={commentItemStyles.header}>
          <Typography variant="subtitle2" sx={commentItemStyles.username}>
            {comment.name}
          </Typography>
          <Typography variant="caption" sx={commentItemStyles.timestamp}>
            {formatTime(comment.createdAt)}
          </Typography>
        </Box>

        <Typography variant="body2" sx={commentItemStyles.comment}>
          {comment.comment}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 0.5 }}>
          <CommentLikeButton
            commentId={comment._id}
            postId={postId}
            isLiked={comment.isLikedByUser || false}
            likesCount={comment.likesCount || 0}
            isLoading={isLikeLoading}
            onToggleLike={handleToggleCommentLike}
          />

          {canDelete && (
            <IconButton
              onClick={handleDelete}
              disabled={isLoading}
              size="small"
              sx={commentItemStyles.deleteButton}
            >
              {isLoading ? (
                <CircularProgress size={16} />
              ) : (
                <DeleteIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(CommentItem);
