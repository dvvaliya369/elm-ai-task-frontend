import type { Theme } from "@mui/material/styles";

export const imageCropperStyles = {
  dialog: {
    "& .MuiDialog-paper": {
      maxWidth: "90vw",
      maxHeight: "90vh",
      width: "auto",
      height: "auto",
    },
  },
  dialogTitle: {
    textAlign: "center" as const,
    fontWeight: 600,
    borderBottom: (theme: Theme) => `1px solid ${theme.palette.divider}`,
    pb: 2,
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
    p: 3,
    minWidth: "400px",
    maxWidth: "600px",
  },
  uploadArea: {
    border: (theme: Theme) => `2px dashed ${theme.palette.divider}`,
    borderRadius: 2,
    p: 4,
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: (theme: Theme) => theme.palette.primary.main,
      backgroundColor: (theme: Theme) => theme.palette.action.hover,
    },
  },
  uploadIcon: {
    fontSize: 48,
    color: (theme: Theme) => theme.palette.text.secondary,
    mb: 2,
  },
  uploadText: {
    mb: 2,
  },
  cropContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
    alignItems: "center",
  },
  cropArea: {
    maxWidth: "100%",
    maxHeight: "400px",
  },
  aspectRatioContainer: {
    display: "flex",
    gap: 1,
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  aspectRatioChip: {
    cursor: "pointer",
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 2,
  },
  previewImage: {
    maxWidth: "200px",
    maxHeight: "200px",
    borderRadius: 1,
  },
  dialogActions: {
    p: 3,
    borderTop: (theme: Theme) => `1px solid ${theme.palette.divider}`,
    gap: 2,
  },
  cancelButton: {
    minWidth: "100px",
  },
  cropButton: {
    minWidth: "100px",
  },
  hiddenInput: {
    display: "none",
  },
};