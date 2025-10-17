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
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon 
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

  const isLoading = deleteCommentLoading[comment._id] || false;
  const isLikeLoading = isCommentLikeLoading(comment._id);
  const canDelete = user && user._id === comment?.user._id;
  const likesCount = comment.likesCount || 0;
  const isLiked = comment.isLikedByUser || false;

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
        
        {/* Comment Like Section */}
        <Box sx={commentItemStyles.likeSection}>
          <IconButton
            onClick={() => handleCommentLike(postId, comment._id)}
            disabled={isLikeLoading}
            size="small"
            sx={commentItemStyles.likeButton}
          >
            {isLikeLoading ? (
              <CircularProgress size={14} />
            ) : isLiked ? (
              <FavoriteIcon 
                fontSize="small" 
                sx={{ color: 'red', fontSize: '14px' }} 
              />
            ) : (
              <FavoriteBorderIcon 
                fontSize="small" 
                sx={{ fontSize: '14px' }} 
              />
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
  );
};

export default memo(CommentItem);
