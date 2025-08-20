import React, { memo } from 'react';
import { Card, Box, Skeleton, Divider } from '@mui/material';

const PostDetailSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 2,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        </Box>
      </Box>
      
      <Skeleton variant="rectangular" width="100%" height={300} />
      
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
        
        <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={16} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="70%" height={16} sx={{ mb: 2 }} />
      </Box>

      <Divider />
      
      <Box sx={{ p: 2 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="80%" height={14} />
            </Box>
          </Box>
        ))}
      </Box>

      <Box 
        sx={{ 
          borderTop: '1px solid',
          borderColor: 'divider',
          px: 2,
          py: 1,
        }}
      >
        <Skeleton variant="text" width="100%" height={14} />
      </Box>
    </Card>
  );
};

export default memo(PostDetailSkeleton);
