import React, { memo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  ModeComment as CommentedIcon,
  Repeat as RepostIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { postActionsStyles } from "./styles";

interface PostActionsProps {
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  viewsCount?: number;
  isLiked?: boolean;
  isCommented?: boolean;
  isReposted?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likesCount,
  repostsCount,
  viewsCount = 0,
  isLiked = false,
  isCommented = false,
  isReposted = false,
  onLike,
  onComment,
  onRepost,
  onShare,
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

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.();
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

        <IconButton
          onClick={handleShareClick}
          size="small"
          sx={postActionsStyles.iconButton}
        >
          <ShareIcon sx={postActionsStyles.shareIcon} />
        </IconButton>

        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ViewIcon sx={postActionsStyles.viewIcon} />
          <Typography variant="body2" sx={postActionsStyles.viewsCount}>
            {viewsCount}
          </Typography>
        </Box>
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
