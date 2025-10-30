import React from "react";
import { Box, IconButton } from "@mui/material";
import { CloseOutlined as CloseIcon } from "@mui/icons-material";
import { ImagePreviewProps } from "./types";
import { imagePreviewStyles } from "./styles";

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  onRemove,
  disabled,
}) => {
  return (
    <Box sx={imagePreviewStyles.container}>
      <IconButton
        onClick={() => onRemove(image.id)}
        disabled={disabled}
        sx={imagePreviewStyles.removeButton}
        size="small"
      >
        <CloseIcon sx={imagePreviewStyles.removeIcon} />
      </IconButton>
      <img
        src={image.preview}
        alt="Preview"
        style={imagePreviewStyles.image}
      />
    </Box>
  );
};

export default ImagePreview;
