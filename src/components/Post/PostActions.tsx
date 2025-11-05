import React, { memo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  ModeComment as CommentedIcon,
  Repeat as ReshareIcon,
} from "@mui/icons-material";
import { postActionsStyles } from "./styles";

interface PostActionsProps {
  likesCount: number;
  commentsCount: number;
  resharesCount: number;
  isLiked?: boolean;
  isCommented?: boolean;
  isReshared?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onReshare?: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likesCount,
  resharesCount,
  isLiked = false,
  isCommented = false,
  isReshared = false,
  onLike,
  onComment,
  onReshare,
}) => {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.();
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.();
  };

  const handleReshareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReshare?.();
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

        <IconButton
          onClick={handleReshareClick}
          size="small"
          sx={postActionsStyles.iconButton}
        >
          <ReshareIcon
            sx={
              isReshared
                ? postActionsStyles.resharedIcon
                : postActionsStyles.reshareIcon
            }
          />
        </IconButton>
      </Box>

      {likesCount > 0 && (
        <Typography variant="subtitle2" sx={postActionsStyles.likesCount}>
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </Typography>
      )}

      {resharesCount > 0 && (
        <Typography variant="subtitle2" sx={postActionsStyles.resharesCount}>
          {resharesCount} {resharesCount === 1 ? "reshare" : "reshares"}
        </Typography>
      )}
    </Box>
  );
};

export default memo(PostActions);
