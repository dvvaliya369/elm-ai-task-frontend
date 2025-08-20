import React, { memo, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { IMedia } from '../../interface';

interface PostMediaProps {
  media: IMedia;
}

const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Check if media URL is valid
  const hasValidUrl = media?.url && media.url.trim() !== '';

  React.useEffect(() => {
    if (!hasValidUrl) {
      setLoading(false);
      setError(true);
      return;
    }

    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(true);
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeout);
  }, [hasValidUrl, loading]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (error || !hasValidUrl) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 300,
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
        }}
      >
        {!hasValidUrl ? 'No media available' : 'Failed to load media'}
      </Box>
    );
  }

  const handleMediaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Box
      onClick={handleMediaClick}
      sx={{ position: 'relative', width: '100%' }}
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}

      {media.mediaType === 'image' ? (
        <img
          src={media.url}
          alt="Post media"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '600px',
            objectFit: 'cover',
            display: loading ? 'none' : 'block',
            borderRadius: 0,
          }}
        />
      ) : (
        <video
          src={media.url}
          controls
          onLoadedData={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '600px',
            objectFit: 'cover',
            display: loading ? 'none' : 'block',
            borderRadius: 0,
          }}
        />
      )}
    </Box>
  );
};

export default memo(PostMedia);
