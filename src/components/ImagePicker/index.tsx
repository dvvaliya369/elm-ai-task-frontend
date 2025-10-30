import React, { useState, useCallback, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import {
  ImageOutlined as ImageIcon,
  CloudUploadOutlined as UploadIcon,
} from "@mui/icons-material";
import { ImagePickerProps, ImageFile } from "./types";
import ImagePreview from "./ImagePreview";
import { imagePickerStyles } from "./styles";

const ImagePicker: React.FC<ImagePickerProps> = ({
  multiple = false,
  maxFiles = 5,
  maxSizeInMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  onFilesChange,
  initialImages = [],
  disabled = false,
  helperText,
  error = false,
  errorText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialImages.length > 0) {
      const initialImageFiles: ImageFile[] = initialImages.map((url, index) => ({
        file: new File([], `initial-${index}`),
        preview: url,
        id: `initial-${index}-${Date.now()}`,
      }));
      setImages(initialImageFiles);
    }
  }, [initialImages]);

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

  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setValidationError(null);

      const fileArray = Array.from(files);
      const remainingSlots = maxFiles - images.length;

      if (fileArray.length > remainingSlots) {
        setValidationError(
          `You can only upload ${remainingSlots} more image(s). Maximum ${maxFiles} images allowed.`
        );
        return;
      }

      const newImages: ImageFile[] = [];
      let hasError = false;

      for (const file of fileArray) {
        const error = validateFile(file);
        if (error) {
          setValidationError(error);
          hasError = true;
          break;
        }

        const preview = URL.createObjectURL(file);
        newImages.push({
          file,
          preview,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        });
      }

      if (!hasError && newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onFilesChange(updatedImages.map((img) => img.file));
      }
    },
    [images, maxFiles, validateFile, onFilesChange]
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

  const handleRemoveImage = useCallback(
    (id: string) => {
      const imageToRemove = images.find((img) => img.id === id);
      if (imageToRemove && !imageToRemove.preview.startsWith("http")) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      const updatedImages = images.filter((img) => img.id !== id);
      setImages(updatedImages);
      onFilesChange(updatedImages.map((img) => img.file));
      setValidationError(null);
    },
    [images, onFilesChange]
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
      images.forEach((img) => {
        if (!img.preview.startsWith("http")) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  const showUploadArea = images.length < maxFiles;
  const displayError = error || validationError;

  return (
    <Box sx={imagePickerStyles.container}>
      {images.length > 0 && (
        <Box sx={imagePickerStyles.previewGrid}>
          {images.map((image) => (
            <ImagePreview
              key={image.id}
              image={image}
              onRemove={handleRemoveImage}
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
            ...imagePickerStyles.dropzone,
            ...(isDragging && imagePickerStyles.dropzoneActive),
            ...(disabled && imagePickerStyles.dropzoneDisabled),
            ...(displayError && imagePickerStyles.dropzoneError),
          }}
        >
          <input
            ref={fileInputRef}
            accept={acceptedFormats.join(",")}
            style={{ display: "none" }}
            id="image-picker-input"
            type="file"
            multiple={multiple}
            onChange={handleFileSelect}
            disabled={disabled}
          />

          {isDragging ? (
            <>
              <UploadIcon sx={imagePickerStyles.uploadIcon} />
              <Typography variant="body1" sx={imagePickerStyles.dragText}>
                Drop images here
              </Typography>
            </>
          ) : (
            <>
              <ImageIcon sx={imagePickerStyles.icon} />
              <Typography variant="body2" sx={imagePickerStyles.text}>
                {images.length === 0
                  ? "Drag and drop images here, or click to select"
                  : `Add more images (${images.length}/${maxFiles})`}
              </Typography>
              <Button
                variant="outlined"
                component="span"
                onClick={handleButtonClick}
                disabled={disabled}
                startIcon={<ImageIcon />}
                sx={imagePickerStyles.button}
              >
                Select Images
              </Button>
            </>
          )}
        </Box>
      )}

      {helperText && !displayError && (
        <Typography variant="caption" sx={imagePickerStyles.helperText}>
          {helperText}
        </Typography>
      )}

      {displayError && (
        <Alert severity="error" sx={imagePickerStyles.alert}>
          {errorText || validationError}
        </Alert>
      )}

      {!displayError && images.length > 0 && (
        <Typography variant="caption" sx={imagePickerStyles.infoText}>
          {images.length} of {maxFiles} images selected • Max {maxSizeInMB}MB
          per image
        </Typography>
      )}
    </Box>
  );
};

export default ImagePicker;
