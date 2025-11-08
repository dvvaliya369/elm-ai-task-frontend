import React, { memo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  ModeComment as CommentedIcon,
  Repeat as RepostIcon,
} from "@mui/icons-material";
import { postActionsStyles } from "./styles";

interface PostActionsProps {
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked?: boolean;
  isCommented?: boolean;
  isReposted?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likesCount,
  repostsCount,
  isLiked = false,
  isCommented = false,
  isReposted = false,
  onLike,
  onComment,
  onRepost,
}) => {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.();
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.();
  };

  const handleRepostClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRepost?.();
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
          onClick={handleRepostClick}
          size="small"
          sx={postActionsStyles.iconButton}
        >
          <RepostIcon
            sx={
              isReposted
                ? postActionsStyles.repostedIcon
                : postActionsStyles.repostIcon
            }
          />
        </IconButton>
      </Box>

      {likesCount > 0 && (
        <Typography variant="subtitle2" sx={postActionsStyles.likesCount}>
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </Typography>
      )}

      {repostsCount > 0 && (
        <Typography variant="subtitle2" sx={postActionsStyles.repostsCount}>
          {repostsCount} {repostsCount === 1 ? "repost" : "reposts"}
        </Typography>
      )}
    </Box>
  );
};

export default memo(PostActions);
