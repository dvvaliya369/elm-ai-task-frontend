import React, { memo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

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
  const displayCaption = shouldTruncate && !showFullCaption 
    ? `${caption.substring(0, 150)}...` 
    : caption;

  return (
    <Box sx={{ px: 2, pb: 1 }}>
      {caption && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <Typography component="span" fontWeight={600} sx={{ mr: 1 }}>
            {username}
          </Typography>
          {displayCaption}
          {shouldTruncate && !showFullCaption && (
            <Button
              size="small"
              onClick={() => setShowFullCaption(true)}
              sx={{
                p: 0,
                ml: 0.5,
                minWidth: 'auto',
                color: 'text.secondary',
                textTransform: 'none',
                fontSize: 'inherit',
              }}
            >
              more
            </Button>
          )}
        </Typography>
      )}
      
      {commentsCount > 0 && (
        <Button
          onClick={onViewComments}
          sx={{
            p: 0,
            minWidth: 'auto',
            color: 'text.secondary',
            textTransform: 'none',
            fontSize: '0.875rem',
            justifyContent: 'flex-start',
          }}
        >
          View all {commentsCount} comments
        </Button>
      )}
    </Box>
  );
};

export default memo(PostCaption);
