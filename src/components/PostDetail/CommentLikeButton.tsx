import React, { memo } from "react";
import {
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  FavoriteBorder as UnlikedIcon,
  Favorite as LikedIcon,
} from "@mui/icons-material";

interface CommentLikeButtonProps {
  commentId: string;
  postId: string;
  isLiked: boolean;
  likesCount: number;
  isLoading: boolean;
  onToggleLike: (commentId: string, postId: string) => void;
}

const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({
  commentId,
  postId,
  isLiked,
  likesCount,
  isLoading,
  onToggleLike,
}) => {
  const handleClick = () => {
    if (!isLoading) {
      onToggleLike(commentId, postId);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        minWidth: "64px",
      }}
    >
      <IconButton
        onClick={handleClick}
        disabled={isLoading}
        size="small"
        sx={{
          padding: "2px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress size={14} />
        ) : isLiked ? (
          <LikedIcon
            sx={{
              fontSize: 14,
              color: "#e91e63",
              animation: "pulse 0.3s ease-in-out",
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                },
                "50%": {
                  transform: "scale(1.2)",
                },
                "100%": {
                  transform: "scale(1)",
                },
              },
            }}
          />
        ) : (
          <UnlikedIcon
            sx={{
              fontSize: 14,
              color: "#757575",
              "&:hover": {
                color: "#e91e63",
              },
            }}
          />
        )}
      </IconButton>
      
      {likesCount > 0 && (
        <Typography
          variant="caption"
          sx={{
            color: "#757575",
            fontSize: "11px",
            fontWeight: 500,
            userSelect: "none",
          }}
        >
          {likesCount}
        </Typography>
      )}
    </Box>
  );
};

export default memo(CommentLikeButton);
