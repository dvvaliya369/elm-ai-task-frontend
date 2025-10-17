import React, { memo, useCallback } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
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

  const handleToggleLike = useCallback(async () => {
    try {
      const result = await dispatch(
        toggleCommentLike({
          postId,
          commentId: comment._id,
        })
      );

      if (toggleCommentLike.rejected.match(result)) {
        showError((result.payload as string) || "Failed to like comment");
      }
    } catch {
      showError("Failed to like comment");
    }
  }, [dispatch, postId, comment._id, showError]);

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

        <Box sx={commentItemStyles.actionsContainer}>
          <Button
            startIcon={
              isLikeLoading ? (
                <CircularProgress size={12} />
              ) : isLiked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )
            }
            onClick={handleToggleLike}
            disabled={isLikeLoading}
            sx={{
              ...commentItemStyles.likeButton,
              ...(isLiked && { color: 'primary.main' }),
            }}
            className={isLiked ? 'liked' : ''}
          >
            {likesCount > 0 ? likesCount : 'Like'}
          </Button>

          {likesCount > 0 && (
            <Typography variant="caption" sx={commentItemStyles.likesCount}>
              {likesCount === 1 ? '1 like' : `${likesCount} likes`}
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
