import React, { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import {
  ImageOutlined as ImageIcon,
  CropOutlined as CropIcon,
} from "@mui/icons-material";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { imageCropperStyles } from "./styles";

interface ImageCropperProps {
  open: boolean;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
  initialImage?: File;
}

interface AspectRatio {
  label: string;
  value: number | undefined;
}

const aspectRatios: AspectRatio[] = [
  { label: "Free", value: undefined },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
];

const ImageCropper: React.FC<ImageCropperProps> = ({
  open,
  onClose,
  onCropComplete,
  initialImage,
}) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(initialImage || null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number | undefined>(1);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(file);
    }
  }, []);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      
      const crop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 90,
          },
          selectedAspectRatio || 1,
          width,
          height
        ),
        width,
        height
      );
      
      setCrop(crop);
    },
    [selectedAspectRatio]
  );

  const handleAspectRatioChange = useCallback(
    (aspectRatio: number | undefined) => {
      setSelectedAspectRatio(aspectRatio);
      
      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerCrop(
          makeAspectCrop(
            {
              unit: "%",
              width: 90,
            },
            aspectRatio || 1,
            width,
            height
          ),
          width,
          height
        );
        setCrop(newCrop);
      }
    },
    []
  );

  const generatePreview = useCallback(
    (image: HTMLImageElement, crop: PixelCrop) => {
      const canvas = previewCanvasRef.current;
      if (!canvas || !crop.width || !crop.height) {
        return;
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg", 0.9);
      setPreviewUrl(base64Image);
    },
    []
  );

  React.useEffect(() => {
    if (completedCrop && imgRef.current) {
      generatePreview(imgRef.current, completedCrop);
    }
  }, [completedCrop, generatePreview]);

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<File> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio;

      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              throw new Error("Canvas is empty");
            }
            const file = new File([blob], selectedFile?.name || "cropped-image.jpg", {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(file);
          },
          "image/jpeg",
          0.9
        );
      });
    },
    [selectedFile?.name]
  );

  const handleCrop = useCallback(async () => {
    if (completedCrop && imgRef.current) {
      try {
        const croppedFile = await getCroppedImg(imgRef.current, completedCrop);
        onCropComplete(croppedFile);
        onClose();
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  }, [completedCrop, getCroppedImg, onCropComplete, onClose]);

  const handleClose = useCallback(() => {
    setSelectedFile(null);
    setImageSrc("");
    setCrop(undefined);
    setCompletedCrop(undefined);
    setPreviewUrl("");
    onClose();
  }, [onClose]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  React.useEffect(() => {
    if (initialImage) {
      setSelectedFile(initialImage);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(initialImage);
    }
  }, [initialImage]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      sx={imageCropperStyles.dialog}
    >
      <DialogTitle sx={imageCropperStyles.dialogTitle}>
        <CropIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Crop Image
      </DialogTitle>
      
      <DialogContent sx={imageCropperStyles.dialogContent}>
        {!imageSrc ? (
          <Box sx={imageCropperStyles.uploadArea} onClick={handleUploadClick}>
            <ImageIcon sx={imageCropperStyles.uploadIcon} />
            <Typography variant="h6" sx={imageCropperStyles.uploadText}>
              Select an image to crop
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click here or drag and drop an image
            </Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              style={imageCropperStyles.hiddenInput}
            />
          </Box>
        ) : (
          <Box sx={imageCropperStyles.cropContainer}>
            <Box sx={imageCropperStyles.aspectRatioContainer}>
              {aspectRatios.map((ratio) => (
                <Chip
                  key={ratio.label}
                  label={ratio.label}
                  onClick={() => handleAspectRatioChange(ratio.value)}
                  color={selectedAspectRatio === ratio.value ? "primary" : "default"}
                  variant={selectedAspectRatio === ratio.value ? "filled" : "outlined"}
                  sx={imageCropperStyles.aspectRatioChip}
                />
              ))}
            </Box>

            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={selectedAspectRatio}
              style={imageCropperStyles.cropArea}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                onLoad={onImageLoad}
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </ReactCrop>

            {previewUrl && (
              <Box sx={imageCropperStyles.previewContainer}>
                <Typography variant="subtitle2" color="text.secondary">
                  Preview:
                </Typography>
                <img
                  src={previewUrl}
                  alt="Crop preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                  }}
                />
              </Box>
            )}

            <canvas
              ref={previewCanvasRef}
              style={{ display: "none" }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={imageCropperStyles.dialogActions}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={imageCropperStyles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCrop}
          variant="contained"
          disabled={!completedCrop}
          sx={imageCropperStyles.cropButton}
        >
          Crop & Use
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;