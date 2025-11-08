export const myPostsStyles = {
  container: {
    maxWidth: 1000,
    mx: "auto",
    px: { xs: 1.5, sm: 2 },
    py: { xs: 2, sm: 3 },
  },

  title: {
    fontWeight: "bold",
    mb: { xs: 2, sm: 3 },
    textAlign: "center",
  },

  dataGridContainer: {
    height: { xs: 500, sm: 600 },
    width: '100%',
    overflowX: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    p: { xs: 1, sm: 1.5 },
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    '& .MuiDataGrid-cell': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: 'action.hover',
    },
    '& .MuiDataGrid-columnHeader': {
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-virtualScroller': {
      minWidth: { xs: 600, md: 'unset' },
    },
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    px: { xs: 2, sm: 0 },
  },

  errorContainer: {
    textAlign: "center",
    py: { xs: 3, sm: 4 },
    px: { xs: 2, sm: 0 },
  },

  emptyStateContainer: {
    textAlign: "center",
    py: { xs: 6, sm: 8 },
    px: { xs: 2, sm: 0 },
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
