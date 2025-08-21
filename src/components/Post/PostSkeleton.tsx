import React, { memo } from 'react';
import { Card, Box, Skeleton } from '@mui/material';
import { postSkeletonStyles } from './styles';

const PostSkeleton: React.FC = () => {
  return (
    <Card sx={postSkeletonStyles.card}>
      <Box sx={postSkeletonStyles.header}>
        <Box sx={postSkeletonStyles.headerContent}>
          <Skeleton variant="circular" width={40} height={40} sx={postSkeletonStyles.headerAvatar} />
          <Box sx={postSkeletonStyles.headerInfo}>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        </Box>
      </Box>

      <Skeleton variant="rectangular" width="100%" height={300} />

      <Box sx={postSkeletonStyles.content}>
        <Box sx={postSkeletonStyles.actionsRow}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>

        <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={16} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="70%" height={16} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={16} sx={{ mb: 2 }} />

        <Box sx={postSkeletonStyles.commentInputContainer}>
          <Skeleton variant="text" width="100%" height={14} />
        </Box>
      </Box>
    </Card>
  );
};

export default memo(PostSkeleton);
