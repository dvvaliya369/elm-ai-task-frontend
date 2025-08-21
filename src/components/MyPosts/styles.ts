export const myPostsStyles = {
  container: {
    maxWidth: 935,
    mx: "auto",
    px: 2,
    py: 3,
  },

  title: {
    fontWeight: "bold",
    mb: 3,
    textAlign: "center",
  },

  gridContainer: {
    spacing: 1,
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
  },

  errorContainer: {
    textAlign: "center",
    py: 4,
  },

  emptyStateContainer: {
    textAlign: "center",
    py: 8,
  },

  emptyStateSubtitle: {
    mt: 1,
  },
};

export const postGridItemStyles = {
  container: {
    position: "relative",
    aspectRatio: "1",
    cursor: "pointer",
    borderRadius: 1,
    overflow: "hidden",
    bgcolor: "grey.100",
    "&:hover .overlay": {
      opacity: 1,
    },
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  captionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    bgcolor: "grey.100",
    p: 2,
  },

  captionText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
  },

  overlayContent: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    color: "white",
  },

  statContainer: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },

  statIcon: {
    color: "white",
  },

  statText: {
    fontWeight: "bold",
  },
};
