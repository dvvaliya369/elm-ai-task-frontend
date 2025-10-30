import React, { useState, useCallback, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import {
  AudioFileOutlined as AudioIcon,
  CloudUploadOutlined as UploadIcon,
} from "@mui/icons-material";
import { AudioPickerProps, AudioFile } from "./types";
import AudioPreview from "./AudioPreview";
import { audioPickerStyles } from "./styles";

const AudioPicker: React.FC<AudioPickerProps> = ({
  multiple = false,
  maxFiles = 5,
  maxSizeInMB = 10,
  acceptedFormats = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/webm", "audio/aac", "audio/m4a"],
  onFilesChange,
  initialAudios = [],
  disabled = false,
  helperText,
  error = false,
  errorText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialAudios.length > 0) {
      const initialAudioFiles: AudioFile[] = initialAudios.map((url, index) => ({
        file: new File([], `initial-${index}`),
        preview: url,
        id: `initial-${index}-${Date.now()}`,
      }));
      setAudios(initialAudioFiles);
    }
  }, [initialAudios]);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedFormats.includes(file.type)) {
        return `Invalid file type. Accepted formats: ${acceptedFormats
          .map((f) => f.split("/")[1])
          .join(", ")}`;
      }

      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return `File size exceeds ${maxSizeInMB}MB limit`;
      }

      return null;
    },
    [acceptedFormats, maxSizeInMB]
  );

  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = document.createElement("audio");
      audio.preload = "metadata";
      audio.onloadedmetadata = () => {
        window.URL.revokeObjectURL(audio.src);
        resolve(audio.duration);
      };
      audio.onerror = () => {
        resolve(0);
      };
      audio.src = URL.createObjectURL(file);
    });
  };

  const processFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setValidationError(null);

      const fileArray = Array.from(files);
      const remainingSlots = maxFiles - audios.length;

      if (fileArray.length > remainingSlots) {
        setValidationError(
          `You can only upload ${remainingSlots} more audio file(s). Maximum ${maxFiles} files allowed.`
        );
        return;
      }

      const newAudios: AudioFile[] = [];
      let hasError = false;

      for (const file of fileArray) {
        const error = validateFile(file);
        if (error) {
          setValidationError(error);
          hasError = true;
          break;
        }

        const preview = URL.createObjectURL(file);
        const duration = await getAudioDuration(file);
        
        newAudios.push({
          file,
          preview,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          duration,
        });
      }

      if (!hasError && newAudios.length > 0) {
        const updatedAudios = [...audios, ...newAudios];
        setAudios(updatedAudios);
        onFilesChange(updatedAudios.map((audio) => audio.file));
      }
    },
    [audios, maxFiles, validateFile, onFilesChange]
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(event.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [processFiles]
  );

  const handleRemoveAudio = useCallback(
    (id: string) => {
      const audioToRemove = audios.find((audio) => audio.id === id);
      if (audioToRemove && !audioToRemove.preview.startsWith("http")) {
        URL.revokeObjectURL(audioToRemove.preview);
      }

      const updatedAudios = audios.filter((audio) => audio.id !== id);
      setAudios(updatedAudios);
      onFilesChange(updatedAudios.map((audio) => audio.file));
      setValidationError(null);
    },
    [audios, onFilesChange]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      processFiles(files);
    },
    [disabled, processFiles]
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  React.useEffect(() => {
    return () => {
      audios.forEach((audio) => {
        if (!audio.preview.startsWith("http")) {
          URL.revokeObjectURL(audio.preview);
        }
      });
    };
  }, [audios]);

  const showUploadArea = audios.length < maxFiles;
  const displayError = error || validationError;

  return (
    <Box sx={audioPickerStyles.container}>
      {audios.length > 0 && (
        <Box sx={audioPickerStyles.previewGrid}>
          {audios.map((audio) => (
            <AudioPreview
              key={audio.id}
              audio={audio}
              onRemove={handleRemoveAudio}
              disabled={disabled}
            />
          ))}
        </Box>
      )}

      {showUploadArea && (
        <Box
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            ...audioPickerStyles.dropzone,
            ...(isDragging && audioPickerStyles.dropzoneActive),
            ...(disabled && audioPickerStyles.dropzoneDisabled),
            ...(displayError && audioPickerStyles.dropzoneError),
          }}
        >
          <input
            ref={fileInputRef}
            accept={acceptedFormats.join(",")}
            style={{ display: "none" }}
            id="audio-picker-input"
            type="file"
            multiple={multiple}
            onChange={handleFileSelect}
            disabled={disabled}
          />

          {isDragging ? (
            <>
              <UploadIcon sx={audioPickerStyles.uploadIcon} />
              <Typography variant="body1" sx={audioPickerStyles.dragText}>
                Drop audio files here
              </Typography>
            </>
          ) : (
            <>
              <AudioIcon sx={audioPickerStyles.icon} />
              <Typography variant="body2" sx={audioPickerStyles.text}>
                {audios.length === 0
                  ? "Drag and drop audio files here, or click to select"
                  : `Add more audio files (${audios.length}/${maxFiles})`}
              </Typography>
              <Button
                variant="outlined"
                component="span"
                onClick={handleButtonClick}
                disabled={disabled}
                startIcon={<AudioIcon />}
                sx={audioPickerStyles.button}
              >
                Select Audio Files
              </Button>
            </>
          )}
        </Box>
      )}

      {helperText && !displayError && (
        <Typography variant="caption" sx={audioPickerStyles.helperText}>
          {helperText}
        </Typography>
      )}

      {displayError && (
        <Alert severity="error" sx={audioPickerStyles.alert}>
          {errorText || validationError}
        </Alert>
      )}

      {!displayError && audios.length > 0 && (
        <Typography variant="caption" sx={audioPickerStyles.infoText}>
          {audios.length} of {maxFiles} audio files selected • Max {maxSizeInMB}MB
          per file
        </Typography>
      )}
    </Box>
  );
};

export default AudioPicker;
