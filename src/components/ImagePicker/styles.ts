import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const imagePickerStyles: Record<string, SxProps<Theme> | CSSProperties> = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: 2,
    width: "100%",
  },
  dropzone: {
    border: "2px dashed",
    borderColor: "divider",
    borderRadius: 2,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minHeight: 200,
    backgroundColor: "background.paper",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "primary.main",
      backgroundColor: "action.hover",
    },
  },
  dropzoneActive: {
    borderColor: "primary.main",
    backgroundColor: "action.selected",
    transform: "scale(1.02)",
  },
  dropzoneDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    "&:hover": {
      borderColor: "divider",
      backgroundColor: "background.paper",
    },
  },
  dropzoneError: {
    borderColor: "error.main",
    "&:hover": {
      borderColor: "error.dark",
    },
  },
  icon: {
    fontSize: 48,
    color: "text.secondary",
  },
  uploadIcon: {
    fontSize: 48,
    color: "primary.main",
  },
  text: {
    color: "text.secondary",
    textAlign: "center",
    maxWidth: 300,
  },
  dragText: {
    color: "primary.main",
    fontWeight: 600,
    textAlign: "center",
  },
  button: {
    marginTop: 1,
    textTransform: "none",
  },
  helperText: {
    color: "text.secondary",
    marginTop: -1,
  },
  infoText: {
    color: "text.secondary",
    textAlign: "center",
  },
  alert: {
    marginTop: 1,
  },
};

export const imagePreviewStyles: Record<string, SxProps<Theme> | CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    paddingTop: "100%",
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "background.default",
    border: "1px solid",
    borderColor: "divider",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      "& .remove-button": {
        opacity: 1,
      },
    },
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    opacity: 0,
    transition: "opacity 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  },
  removeIcon: {
    fontSize: 18,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  } as CSSProperties,
};
