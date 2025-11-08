export const homeStyles = {
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    px: { xs: 2, sm: 3 },
    textAlign: 'center',
  },

  mainContainer: {
    width: '100%',
    mx: 'auto',
    px: { xs: 1.5, sm: 3, md: 4 },
    py: { xs: 2, sm: 3, md: 4 },
    maxWidth: { xs: '100%', sm: 720, md: 960, lg: 1200 },
  },

  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    py: { xs: 2, sm: 3 },
  },

  postWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
  },

  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    textAlign: 'center',
    px: { xs: 1.5, sm: 2 },
  },
};
