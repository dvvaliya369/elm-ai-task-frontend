import React, { memo } from "react";
import { Card, Box, Skeleton, Divider } from "@mui/material";
import { postDetailSkeletonStyles } from "./styles";

const PostDetailSkeleton: React.FC = () => {
  return (
    <Card sx={postDetailSkeletonStyles.card}>
      <Box sx={postDetailSkeletonStyles.header}>
        <Box sx={postDetailSkeletonStyles.headerContent}>
          <Skeleton variant="circular" width={40} height={40} sx={postDetailSkeletonStyles.headerAvatar} />
          <Box sx={postDetailSkeletonStyles.headerInfo}>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        </Box>
      </Box>

      <Skeleton variant="rectangular" width="100%" height={300} />

      <Box sx={postDetailSkeletonStyles.content}>
        <Box sx={postDetailSkeletonStyles.actionsRow}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>

        <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={16} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="70%" height={16} sx={{ mb: 2 }} />
      </Box>

      <Divider />

      <Box sx={postDetailSkeletonStyles.commentsSection}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={postDetailSkeletonStyles.commentItem}
          >
            <Skeleton variant="circular" width={32} height={32} />
            <Box sx={postDetailSkeletonStyles.commentContent}>
              <Skeleton
                variant="text"
                width="40%"
                height={16}
                sx={{ mb: 0.5 }}
              />
              <Skeleton variant="text" width="80%" height={14} />
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={postDetailSkeletonStyles.commentInputContainer}>
        <Skeleton variant="text" width="100%" height={14} />
      </Box>
    </Card>
  );
};

export default memo(PostDetailSkeleton);
