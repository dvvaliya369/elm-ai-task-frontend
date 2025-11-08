export const myPostsStyles = {
  container: {
    maxWidth: { xs: "100%", sm: "100%", md: 1000, lg: 1200 },
    mx: "auto",
    px: { xs: 0.5, sm: 1.5, md: 2 },
    py: { xs: 1.5, sm: 2, md: 3 },
  },

  title: {
    fontWeight: "bold",
    mb: { xs: 1.5, sm: 2, md: 3 },
    textAlign: "center",
    fontSize: { xs: "1.125rem", sm: "1.375rem", md: "1.5rem" },
  },

  dataGridContainer: {
    height: { xs: 450, sm: 550, md: 600 },
    width: '100%',
    overflowX: 'auto',
    '& .MuiDataGrid-root': {
      border: { xs: 'none', sm: '1px solid rgba(224, 224, 224, 1)' },
    },
    '& .MuiDataGrid-cell': {
      display: 'flex',
      alignItems: 'center',
      fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
      padding: { xs: '4px 8px', sm: '8px 16px' },
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: 'action.hover',
    },
    '& .MuiDataGrid-columnHeader': {
      fontWeight: 'bold',
      fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
      padding: { xs: '4px 8px', sm: '8px 16px' },
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-footerContainer': {
      minHeight: { xs: '48px', sm: '52px' },
    },
    '& .MuiTablePagination-root': {
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
    },
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
    },
    '& .MuiIconButton-root': {
      padding: { xs: '6px', sm: '8px' },
    },
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
