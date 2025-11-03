import type { SxProps, Theme } from "@mui/material";

export const timerStyles: Record<string, SxProps<Theme>> = {
  container: {
    padding: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    minWidth: 280,
    maxWidth: 320,
    backgroundColor: "#0d47a1",
    color: "#ffffff",
  },
  title: {
    fontWeight: 600,
    color: "#ffffff",
  },
  progressContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgress: {
    color: "#64b5f6",
  },
  timeDisplay: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontWeight: 700,
    fontFamily: "monospace",
    color: "#ffffff",
  },
  inputContainer: {
    display: "flex",
    gap: 2,
    width: "100%",
    justifyContent: "center",
  },
  input: {
    width: 100,
    "& .MuiInputLabel-root": {
      color: "#bbdefb",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#64b5f6",
    },
    "& .MuiOutlinedInput-root": {
      color: "#ffffff",
      "& fieldset": {
        borderColor: "#64b5f6",
      },
      "&:hover fieldset": {
        borderColor: "#90caf9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#64b5f6",
      },
    },
  },
  controls: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
};
