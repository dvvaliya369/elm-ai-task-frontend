import React, { memo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  ModeComment as CommentedIcon,
} from "@mui/icons-material";
import { postActionsStyles } from "./styles";

interface PostActionsProps {
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isCommented?: boolean;
  onLike?: () => void;
  onComment?: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likesCount,
  isLiked = false,
  isCommented = false,
  onLike,
  onComment,
}) => {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.();
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.();
  };

  return (
    <Box sx={postActionsStyles.container}>
      <Box sx={postActionsStyles.actionsRow}>
        <IconButton
          onClick={handleLikeClick}
          size="small"
          sx={postActionsStyles.iconButton}
        >
          {isLiked ? (
            <LikedIcon sx={postActionsStyles.likedIcon} />
          ) : (
            <LikeIcon sx={postActionsStyles.likeIcon} />
          )}
        </IconButton>

        <IconButton
          onClick={handleCommentClick}
          size="small"
          sx={postActionsStyles.iconButton}
        >
          {isCommented ? (
            <CommentedIcon sx={postActionsStyles.commentedIcon} />
          ) : (
            <CommentIcon sx={postActionsStyles.commentIcon} />
          )}
        </IconButton>
      </Box>

      {likesCount > 0 && (
        <Typography variant="subtitle2" sx={postActionsStyles.likesCount}>
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </Typography>
      )}
    </Box>
  );
};

export default memo(PostActions);
