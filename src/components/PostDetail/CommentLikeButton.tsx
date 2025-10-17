import React, { memo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { FavoriteBorder as UnlikedIcon, Favorite as LikedIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "../../store";
import { toggleCommentLike } from "../../service/post.service";
import { useToast } from "../../hooks/useToast";
import type { IComment } from "../../interface";

interface CommentLikeButtonProps {
  comment: IComment;
  postId: string;
}

const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { commentLikeLoading } = useSelector((state) => ({
    commentLikeLoading: state.posts.commentLikeLoading,
  }));
  const { showError } = useToast();

  const isLoading = commentLikeLoading[comment._id] || false;
  const isLiked = comment.isLikedByUser || false;
  const likesCount = comment.likesCount || 0;

  const handleToggleLike = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const result = await dispatch(
        toggleCommentLike({
          postId,
          commentId: comment._id,
        })
      );

      if (toggleCommentLike.rejected.match(result)) {
        showError((result.payload as string) || "Failed to update comment like");
      }
    } catch {
      showError("Failed to update comment like");
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <IconButton
        onClick={handleToggleLike}
        disabled={isLoading}
        size="small"
        sx={{
          color: isLiked ? 'error.main' : 'text.secondary',
          padding: '4px',
          '&:hover': {
            color: isLiked ? 'error.dark' : 'error.main',
          },
        }}
      >
        {isLiked ? <LikedIcon fontSize="small" /> : <UnlikedIcon fontSize="small" />}
      </IconButton>
      {likesCount > 0 && (
        <Typography variant="caption" color="text.secondary">
          {likesCount}
        </Typography>
      )}
    </Box>
  );
};

export default memo(CommentLikeButton);
