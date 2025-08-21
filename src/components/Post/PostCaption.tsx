import React, { memo, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { postCaptionStyles } from "./styles";

interface PostCaptionProps {
  username: string;
  caption?: string;
  commentsCount: number;
  onViewComments?: () => void;
}

const PostCaption: React.FC<PostCaptionProps> = ({
  username,
  caption,
  commentsCount,
  onViewComments,
}) => {
  const [showFullCaption, setShowFullCaption] = useState(false);

  const shouldTruncate = caption && caption.length > 150;
  const displayCaption =
    shouldTruncate && !showFullCaption
      ? `${caption.substring(0, 150)}...`
      : caption;

  const handleCaptionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowFullCaption(!showFullCaption);
  };

  return (
    <Box sx={postCaptionStyles.container}>
      {caption && (
        <Typography variant="body2" sx={postCaptionStyles.caption}>
          <Typography component="span" sx={postCaptionStyles.username}>
            {username}
          </Typography>
          {displayCaption}
          {shouldTruncate && !showFullCaption && (
            <Button
              size="small"
              onClick={handleCaptionClick}
              sx={postCaptionStyles.moreButton}
            >
              more
            </Button>
          )}
        </Typography>
      )}

      {commentsCount > 0 && (
        <Button
          onClick={onViewComments}
          sx={postCaptionStyles.viewCommentsButton}
        >
          View all {commentsCount} comments
        </Button>
      )}
    </Box>
  );
};

export default memo(PostCaption);
