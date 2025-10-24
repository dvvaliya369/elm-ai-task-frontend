import React, { memo } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  ModeComment as CommentedIcon,
} from "@mui/icons-material";
import { postActionsStyles } from "./styles";

interface PostActionsProps {
  postId: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isCommented?: boolean;
  onLike?: () => void;
  onComment?: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  likesCount,
  commentsCount,
  isLiked = false,
  isCommented = false,
  onLike,
  onComment,
}) => {
  const navigate = useNavigate();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.();
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.();
  };

  const handleViewAllComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/posts/${postId}/comments`);
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

      {commentsCount > 0 && (
        <Button
          onClick={handleViewAllComments}
          size="small"
          sx={postActionsStyles.viewCommentsButton}
        >
          View all {commentsCount} comments
        </Button>
      )}
    </Box>
  );
};

export default memo(PostActions);
