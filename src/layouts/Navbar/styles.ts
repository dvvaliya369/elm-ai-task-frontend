export const navbarStyles = {
  appBar: {
    bgcolor: "background.paper",
    borderBottom: "1px solid",
    borderColor: "divider",
  },

  toolbar: {
    justifyContent: "space-between",
    py: 1,
    px: { xs: 2, sm: 3, md: 8, lg: 15 },
    minHeight: "64px",
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
    width: 32,
    height: 32,
    bgcolor: "primary.main",
  },

  authButtonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  loginButton: {
    color: "text.primary",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: 1.5,
    py: 0.5,
    borderRadius: 1.5,
    textTransform: "none",
    fontSize: "0.875rem",
    "&:hover": {
      bgcolor: "rgba(0, 0, 0, 0.04)",
    },
  },

  signupButton: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: 2,
    py: 0.5,
    borderRadius: 1.5,
    textTransform: "none",
    fontSize: "0.875rem",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.24)",
    },
  },

  tabletNavContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },

  tabletProfileButton: {
    p: 0,
    ml: 1,
  },

  tabletAuthContainer: {
    display: "flex",
    gap: 1,
    ml: 1,
  },

  tabletLoginButton: {
    color: "text.primary",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: 1.25,
    py: 0.25,
    borderRadius: 1.5,
    textTransform: "none",
    fontSize: "0.8125rem",
    minHeight: "auto",
    "&:hover": {
      bgcolor: "rgba(0, 0, 0, 0.04)",
    },
  },

  tabletSignupButton: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: 1.5,
    py: 0.25,
    borderRadius: 1.5,
    textTransform: "none",
    fontSize: "0.8125rem",
    minHeight: "auto",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.24)",
    },
  },

  mobileProfileButton: {
    p: 0,
  },

  mobileProfileAvatar: {
    width: 32,
    height: 32,
    bgcolor: "primary.main",
  },

  mobilePersonIcon: {
    color: "text.secondary",
  },
};
