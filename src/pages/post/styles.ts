export const postStyles = {
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: { xs: 250, sm: 350, md: 400 },
    px: { xs: 1.5, sm: 2 },
  },

  mainContainer: {
    maxWidth: { xs: "100%", sm: 600, md: 650 },
    width: '100%',
    mx: 'auto',
    px: { xs: 0, sm: 1.5, md: 2 },
    py: { xs: 0.5, sm: 1.5, md: 2 },
  },

  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    mb: { xs: 1, sm: 1.5, md: 2 },
    px: { xs: 1.25, sm: 0 },
  },

  backButton: {
    mr: { xs: 0.5, sm: 0.75, md: 1 },
    p: { xs: 0.75, sm: 0.875, md: 1 },
    minWidth: { xs: '40px', sm: '44px' },
    minHeight: { xs: '40px', sm: '44px' },
  },
};
