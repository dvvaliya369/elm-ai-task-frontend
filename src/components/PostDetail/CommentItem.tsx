import React, { memo, useCallback } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { 
  Delete as DeleteIcon, 
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon 
} from "@mui/icons-material";
import { useSelector, useDispatch } from "../../store";
import { deleteComment, toggleCommentLike } from "../../service/post.service";
import { useToast } from "../../hooks/useToast";
import type { IComment } from "../../interface";
import { formatTime } from "../../utils/formatTime";
import { commentItemStyles } from "./styles";

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

  const isDeleteLoading = deleteCommentLoading[comment._id] || false;
  const isLikeLoading = commentLikeLoading[comment._id] || false;
  const canDelete = user && user._id === comment?.user._id;
  const isLiked = comment.isLikedByUser || false;
  const likesCount = comment.likesCount || 0;

  const handleLike = useCallback(async () => {
    if (!user) {
      showError("Please login to like comments");
      return;
    }

    try {
      const result = await dispatch(
        toggleCommentLike({
          postId,
          commentId: comment._id,
        })
      );

      if (toggleCommentLike.fulfilled.match(result)) {
        // Success - no toast needed for like actions (common UX pattern)
      } else if (toggleCommentLike.rejected.match(result)) {
        showError((result.payload as string) || "Failed to toggle like");
      }
    } catch {
      showError("Failed to toggle like");
    }
  }, [dispatch, postId, comment._id, user, showError]);

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

        {/* Like section */}
        <Box sx={commentItemStyles.likeSection}>
          <IconButton
            onClick={handleLike}
            disabled={isLikeLoading}
            size="small"
            sx={commentItemStyles.likeButton}
          >
            {isLikeLoading ? (
              <CircularProgress size={14} />
            ) : isLiked ? (
              <FavoriteIcon fontSize="small" sx={{ color: '#e91e63' }} />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
          {likesCount > 0 && (
            <Typography variant="caption" sx={commentItemStyles.likeCount}>
              {likesCount} {likesCount === 1 ? 'like' : 'likes'}
            </Typography>
          )}
        </Box>
      </Box>

      {canDelete && (
        <IconButton
          onClick={handleDelete}
          disabled={isDeleteLoading}
          size="small"
          sx={commentItemStyles.deleteButton}
        >
          {isDeleteLoading ? (
            <CircularProgress size={16} />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default memo(CommentItem);
