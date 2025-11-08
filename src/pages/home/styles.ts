export const homeStyles = {
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: { xs: 250, sm: 350, md: 400 },
    px: { xs: 1.5, sm: 2 },
  },

  mainContainer: {
    maxWidth: { xs: "100%", sm: 500, md: 550 },
    width: '100%',
    mx: 'auto',
    px: { xs: 0, sm: 1.5, md: 2 },
    py: { xs: 0.5, sm: 1.5, md: 2 },
  },

  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    py: { xs: 2, sm: 2.5, md: 3 },
  },

  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: { xs: 200, sm: 250, md: 300 },
    textAlign: 'center',
    px: { xs: 2, sm: 2.5, md: 3 },
  },
};
