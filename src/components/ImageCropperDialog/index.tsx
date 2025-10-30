import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  Typography,
  Box,
} from "@mui/material";
import Cropper, { type Area } from "react-easy-crop";
import { createCroppedImage } from "../../utils/cropImage";
import { imageCropperDialogStyles } from "./styles";

interface ImageCropperDialogProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
}

const ImageCropperDialog: React.FC<ImageCropperDialogProps> = ({
  open,
  imageSrc,
  onClose,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleClose = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    onClose();
  }, [onClose]);

  const handleCrop = useCallback(async () => {
    if (croppedAreaPixels && imageSrc) {
      try {
        const croppedFile = await createCroppedImage(
          imageSrc,
          croppedAreaPixels,
          "profile-picture.jpg"
        );
        onCropComplete(croppedFile);
        handleClose();
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete, handleClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: imageCropperDialogStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={imageCropperDialogStyles.dialogTitle}>
        Crop Profile Picture
      </DialogTitle>

      <DialogContent sx={imageCropperDialogStyles.dialogContent}>
        <Box sx={imageCropperDialogStyles.cropContainer}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteCallback}
          />
        </Box>
      </DialogContent>

      <Box sx={imageCropperDialogStyles.controlsContainer}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={imageCropperDialogStyles.zoomLabel}
        >
          Zoom
        </Typography>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-label="Zoom"
          onChange={(_, value) => onZoomChange(value as number)}
          sx={imageCropperDialogStyles.zoomSlider}
        />
      </Box>

      <DialogActions sx={imageCropperDialogStyles.dialogActions}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={imageCropperDialogStyles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCrop}
          variant="contained"
          sx={imageCropperDialogStyles.cropButton}
        >
          Crop
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropperDialog;
