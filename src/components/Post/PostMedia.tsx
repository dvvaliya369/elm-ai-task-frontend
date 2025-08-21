import React, { memo, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import type { IMedia } from "../../interface";
import { postMediaStyles } from "./styles";

interface PostMediaProps {
  media: IMedia;
  handleCardClick?: (e: React.MouseEvent) => void;
}

const PostMedia: React.FC<PostMediaProps> = ({ media, handleCardClick }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const hasValidUrl = media?.url && media.url.trim() !== "";

  React.useEffect(() => {
    if (!hasValidUrl) {
      setLoading(false);
      setError(true);
      return;
    }

    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(true);
      }
    }, 10000);

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
      <Box sx={postMediaStyles.errorContainer}>
        {!hasValidUrl ? "No media available" : "Failed to load media"}
      </Box>
    );
  }

  const handleMediaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCardClick?.(e);
  };

  return (
    <Box onClick={handleMediaClick} sx={postMediaStyles.mediaContainer}>
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={postMediaStyles.skeleton}
        />
      )}

      {media.mediaType === "image" ? (
        <img
          src={media.url}
          alt="Post media"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...postMediaStyles.image,
            ...(loading
              ? postMediaStyles.mediaHidden
              : postMediaStyles.mediaVisible),
          }}
        />
      ) : (
        <video
          src={media.url}
          controls
          onLoadedData={handleLoad}
          onError={handleError}
          style={{
            ...postMediaStyles.video,
            ...(loading
              ? postMediaStyles.mediaHidden
              : postMediaStyles.mediaVisible),
          }}
        />
      )}
    </Box>
  );
};

export default memo(PostMedia);
