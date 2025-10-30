export const imageCropperStyles = {
  dialog: {
    "& .MuiDialog-paper": {
      maxWidth: 600,
      width: "100%",
      m: 2,
    },
  },

  dialogTitle: {
    pb: 2,
  },

  dialogContent: {
    p: 0,
    position: "relative",
    height: 400,
    bgcolor: "grey.900",
  },

  cropContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  controls: {
    p: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  zoomControl: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  zoomIcon: {
    color: "text.secondary",
  },

  slider: {
    flex: 1,
  },

  actions: {
    p: 2,
    gap: 2,
    justifyContent: "flex-end",
  },

  cancelButton: {
    minWidth: 100,
  },

  saveButton: {
    minWidth: 100,
  },
};
