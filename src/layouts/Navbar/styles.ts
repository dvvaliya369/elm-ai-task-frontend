export const navbarStyles = {
  appBar: {
    bgcolor: "background.paper",
    borderBottom: "1px solid",
    borderColor: "divider",
    zIndex: (theme: { zIndex: { drawer: number } }) => theme.zIndex.drawer + 1,
  },

  toolbar: {
    justifyContent: "space-between",
    py: { xs: 0.5, sm: 0.75, md: 1 },
    px: { xs: 1, sm: 2, md: 4, lg: 8, xl: 15 },
    minHeight: { xs: "56px", sm: "60px", md: "64px" },
    maxWidth: "100%",
    width: "100%",
  },

  desktopNavContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  navButtonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  profileButton: {
    p: 0,
  },

  profileAvatar: {
    width: { xs: 32, sm: 34, md: 36 },
    height: { xs: 32, sm: 34, md: 36 },
    bgcolor: "primary.main",
    fontSize: { xs: "0.875rem", sm: "1rem" },
  },

  authButtonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: { xs: 0.5, sm: 0.75, md: 1 },
  },

  loginButton: {
    color: "text.primary",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: { xs: 1, sm: 1.25, md: 1.5 },
    py: { xs: 0.5, sm: 0.5, md: 0.5 },
    borderRadius: 1.5,
    textTransform: "none",
    fontSize: { xs: "0.8125rem", sm: "0.8125rem", md: "0.875rem" },
    minHeight: { xs: "32px", sm: "34px", md: "36px" },
    "&:hover": {
      bgcolor: "rgba(0, 0, 0, 0.04)",
    },
  },

  signupButton: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: { xs: 1.25, sm: 1.5, md: 2 },
    py: { xs: 0.5, sm: 0.5, md: 0.5 },
    borderRadius: 1.5,
    textTransform: "none",
    fontSize: { xs: "0.8125rem", sm: "0.8125rem", md: "0.875rem" },
    minHeight: { xs: "32px", sm: "34px", md: "36px" },
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.24)",
    },
  },

  tabletNavContainer: {
    display: "flex",
    alignItems: "center",
    gap: { xs: 1, sm: 1.5 },
  },

  tabletProfileButton: {
    p: 0,
    ml: { xs: 0.75, sm: 1 },
  },

  tabletAuthContainer: {
    display: "flex",
    gap: { xs: 0.75, sm: 1 },
    ml: { xs: 0.75, sm: 1 },
  },

  tabletLoginButton: {
    color: "text.primary",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: { xs: 1, sm: 1.25 },
    py: { xs: 0.4, sm: 0.5 },
    borderRadius: 1.5,
    textTransform: "none",
    fontSize: { xs: "0.8125rem", sm: "0.8125rem" },
    minHeight: { xs: "32px", sm: "34px" },
    "&:hover": {
      bgcolor: "rgba(0, 0, 0, 0.04)",
    },
  },

  tabletSignupButton: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: { xs: 1.25, sm: 1.5 },
    py: { xs: 0.4, sm: 0.5 },
    borderRadius: 1.5,
    textTransform: "none",
    fontSize: { xs: "0.8125rem", sm: "0.8125rem" },
    minHeight: { xs: "32px", sm: "34px" },
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.24)",
    },
  },

  mobileProfileButton: {
    p: { xs: 0.5, sm: 0.75 },
  },

  mobileProfileAvatar: {
    width: { xs: 32, sm: 34 },
    height: { xs: 32, sm: 34 },
    bgcolor: "primary.main",
    fontSize: { xs: "0.875rem", sm: "1rem" },
  },

  mobilePersonIcon: {
    color: "text.secondary",
    fontSize: { xs: "1.5rem", sm: "1.75rem" },
  },
};
