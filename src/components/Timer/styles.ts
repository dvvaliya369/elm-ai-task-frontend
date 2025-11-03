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
  },
  title: {
    fontWeight: 600,
    color: "primary.main",
  },
  progressContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgress: {
    color: "primary.main",
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
    color: "text.primary",
  },
  inputContainer: {
    display: "flex",
    gap: 2,
    width: "100%",
    justifyContent: "center",
  },
  input: {
    width: 100,
  },
  controls: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
};
