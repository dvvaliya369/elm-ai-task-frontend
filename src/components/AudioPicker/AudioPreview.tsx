import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  CloseOutlined as CloseIcon,
  AudioFileOutlined as AudioIcon,
} from "@mui/icons-material";
import { AudioPreviewProps } from "./types";
import { audioPreviewStyles } from "./styles";

const AudioPreview: React.FC<AudioPreviewProps> = ({
  audio,
  onRemove,
  disabled,
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Box sx={audioPreviewStyles.container}>
      <AudioIcon sx={audioPreviewStyles.audioIcon} />
      
      <Box sx={audioPreviewStyles.infoContainer}>
        <Typography variant="body2" sx={audioPreviewStyles.fileName}>
          {audio.file.name}
        </Typography>
        <Typography variant="caption" sx={audioPreviewStyles.fileInfo}>
          {formatFileSize(audio.file.size)}
          {audio.duration && ` • ${formatDuration(audio.duration)}`}
        </Typography>
        <audio
          controls
          src={audio.preview}
          style={audioPreviewStyles.audioPlayer}
          preload="metadata"
        />
      </Box>

      <IconButton
        onClick={() => onRemove(audio.id)}
        disabled={disabled}
        sx={audioPreviewStyles.removeButton}
        size="small"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default AudioPreview;
