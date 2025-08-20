import React, { memo } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  ModeComment as CommentedIcon
} from '@mui/icons-material';

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
    <Box sx={{ px: 2, py: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <IconButton onClick={handleLikeClick} size="small" sx={{ p: 0.5 }}>
          {isLiked ? (
            <LikedIcon sx={{ color: 'error.main', fontSize: 24 }} />
          ) : (
            <LikeIcon sx={{ fontSize: 24 }} />
          )}
        </IconButton>

        <IconButton onClick={handleCommentClick} size="small" sx={{ p: 0.5 }}>
          {isCommented ? (
            <CommentedIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          ) : (
            <CommentIcon sx={{ fontSize: 24 }} />
          )}
        </IconButton>
      </Box>
      
      {likesCount > 0 && (
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </Typography>
      )}
    </Box>
  );
};

export default memo(PostActions);
