import { memo, useCallback } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  Favorite,
  ChatBubbleOutline,
  IosShare as ShareIcon,
} from "@mui/icons-material";
import type { IPost } from "../../interface";
import { useNavigate } from "react-router-dom";
import { postGridItemStyles } from "./styles";
import { useSharePost } from "../../hooks/useSharePost";

interface PostGridItemProps {
  post: IPost;
}

const PostGridItem = ({ post }: PostGridItemProps) => {
  const navigate = useNavigate();
  const { sharePost } = useSharePost();

  const handleClick = useCallback(() => {
    navigate(`/posts/${post._id}`);
  }, [navigate, post._id]);

  const renderContent = useCallback(() => {
    if (post.media) {
      if (post.media.mediaType === "image") {
        return (
          <img
            src={post.media.url}
            alt="Post"
            style={postGridItemStyles.image}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.setAttribute("style", "display: flex");
            }}
          />
        );
      } else if (post.media.mediaType === "video") {
        return (
          <video
            src={post.media.url}
            style={postGridItemStyles.video}
            muted
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
              target.nextElementSibling?.setAttribute("style", "display: flex");
            }}
          />
        );
      }
    }

    return (
      <Box sx={postGridItemStyles.captionContainer}>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={postGridItemStyles.captionText}
        >
          {post.caption || "No caption"}
        </Typography>
      </Box>
    );
  }, [post.media, post.caption]);

  const handleShareClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      const authorName =
        post.user.fullName ||
        `${post.user.firstName || ""} ${post.user.lastName || ""}`.trim() ||
        "Unknown User";

      sharePost({
        postId: post._id,
        caption: post.caption,
        authorName,
      });
    },
    [post, sharePost]
  );

  return (
    <Box sx={postGridItemStyles.container} onClick={handleClick}>
      {renderContent()}

      <Box className="overlay" sx={postGridItemStyles.overlay}>
        <Box sx={postGridItemStyles.overlayContent}>
          <Box sx={postGridItemStyles.statContainer}>
            <IconButton size="small" sx={postGridItemStyles.statIcon}>
              <Favorite />
            </IconButton>
            <Typography variant="body1" sx={postGridItemStyles.statText}>
              {Array.isArray(post.likes) ? post.likes.length : 0}
            </Typography>
          </Box>
          <Box sx={postGridItemStyles.statContainer}>
            <IconButton size="small" sx={postGridItemStyles.statIcon}>
              <ChatBubbleOutline />
            </IconButton>
            <Typography variant="body1" sx={postGridItemStyles.statText}>
              {Array.isArray(post.comments) ? post.comments.length : 0}
            </Typography>
          </Box>
          <Box sx={postGridItemStyles.statContainer}>
            <IconButton
              size="small"
              sx={postGridItemStyles.statIcon}
              onClick={handleShareClick}
            >
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(PostGridItem);
