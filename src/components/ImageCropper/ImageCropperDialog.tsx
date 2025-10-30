import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  Box,
} from "@mui/material";
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from "@mui/icons-material";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImg, blobToFile } from "./cropUtils";
import { imageCropperStyles } from "./styles";

interface ImageCropperDialogProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
  fileName: string;
}

const ImageCropperDialog: React.FC<ImageCropperDialogProps> = ({
  open,
  imageSrc,
  onClose,
  onCropComplete,
  fileName,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      setIsSaving(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      if (croppedImageBlob) {
        const croppedFile = blobToFile(croppedImageBlob, fileName);
        onCropComplete(croppedFile);
      }
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setIsSaving(false);
    }
  }, [croppedAreaPixels, imageSrc, fileName, onCropComplete]);

  const handleClose = useCallback(() => {
    if (!isSaving) {
      onClose();
    }
  }, [isSaving, onClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={imageCropperStyles.dialog}
    >
      <DialogTitle sx={imageCropperStyles.dialogTitle}>
        Crop Profile Picture
      </DialogTitle>

      <DialogContent sx={imageCropperStyles.dialogContent}>
        <Box sx={imageCropperStyles.cropContainer}>
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

      <Box sx={imageCropperStyles.controls}>
        <Box sx={imageCropperStyles.zoomControl}>
          <ZoomOutIcon sx={imageCropperStyles.zoomIcon} />
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, value) => onZoomChange(value as number)}
            sx={imageCropperStyles.slider}
          />
          <ZoomInIcon sx={imageCropperStyles.zoomIcon} />
        </Box>
      </Box>

      <DialogActions sx={imageCropperStyles.actions}>
        <Button
          onClick={handleClose}
          disabled={isSaving}
          sx={imageCropperStyles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={isSaving}
          sx={imageCropperStyles.saveButton}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropperDialog;
