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
  FavoriteOutlined,
  Favorite
} from "@mui/icons-material";
import { useSelector, useDispatch } from "../../store";
import { deleteComment } from "../../service/post.service";
import { useToast } from "../../hooks/useToast";
import { useCommentLike } from "../../hooks/useCommentLike";
import type { IComment } from "../../interface";
import { formatTime } from "../../utils/formatTime";
import { commentItemStyles } from "./styles";

interface CommentItemProps {
  comment: IComment;
  postId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { user, deleteCommentLoading } = useSelector((state) => ({
    user: state.auth.user,
    deleteCommentLoading: state.posts.deleteCommentLoading,
  }));
  const { showError, showSuccess } = useToast();
  const { handleCommentLike, isCommentLikeLoading } = useCommentLike();

  const isDeleteLoading = deleteCommentLoading[comment._id] || false;
  const isLikeLoading = isCommentLikeLoading(comment._id);
  const canDelete = user && user._id === comment?.user._id;

  const handleLike = useCallback(async () => {
    await handleCommentLike(postId, comment._id);
  }, [handleCommentLike, postId, comment._id]);

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
        
        <Box sx={commentItemStyles.actions}>
          <IconButton
            onClick={handleLike}
            disabled={isLikeLoading}
            size="small"
            sx={{
              color: comment.isLikedByUser ? 'error.main' : 'text.secondary',
              padding: 0.5,
            }}
          >
            {isLikeLoading ? (
              <CircularProgress size={16} />
            ) : comment.isLikedByUser ? (
              <Favorite fontSize="small" />
            ) : (
              <FavoriteOutlined fontSize="small" />
            )}
          </IconButton>
          
          {comment.likesCount > 0 && (
            <Typography 
              variant="caption" 
              sx={{ 
                marginLeft: 0.5, 
                color: 'text.secondary',
                fontSize: '0.75rem'
              }}
            >
              {comment.likesCount} {comment.likesCount === 1 ? 'like' : 'likes'}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={commentItemStyles.rightActions}>
        <IconButton
          onClick={handleLike}
          disabled={isLikeLoading}
          size="small"
          sx={{
            color: comment.isLikedByUser ? 'error.main' : 'text.secondary',
          }}
        >
          {isLikeLoading ? (
            <CircularProgress size={16} />
          ) : comment.isLikedByUser ? (
            <Favorite fontSize="small" />
          ) : (
            <FavoriteOutlined fontSize="small" />
          )}
        </IconButton>

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
    </Box>
  );
};

export default memo(CommentItem);
