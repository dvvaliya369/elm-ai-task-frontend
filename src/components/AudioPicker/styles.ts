import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const audioPickerStyles: Record<string, SxProps<Theme> | CSSProperties> = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  previewGrid: {
    display: "flex",
    flexDirection: "column",
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

export const audioPreviewStyles: Record<string, SxProps<Theme> | CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "background.default",
    border: "1px solid",
    borderColor: "divider",
    padding: 2,
    display: "flex",
    alignItems: "center",
    gap: 2,
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "primary.main",
      backgroundColor: "action.hover",
    },
  },
  audioIcon: {
    fontSize: 40,
    color: "primary.main",
  },
  infoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
    minWidth: 0,
  },
  fileName: {
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fileInfo: {
    color: "text.secondary",
    fontSize: "0.875rem",
  },
  audioPlayer: {
    width: "100%",
    marginTop: 1,
  } as CSSProperties,
  removeButton: {
    color: "error.main",
    "&:hover": {
      backgroundColor: "error.light",
      color: "error.dark",
    },
  },
};
