export const navbarComponentStyles = {
  // Logo styles
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainerImage: {
    height: "32px",
    width: "auto",
    objectFit: "contain" as const,
    maxWidth: "120px",
  },

  // NavButton styles
  navButton: (isActive: boolean) => ({
    bgcolor: isActive ? "rgba(25, 118, 210, 0.08)" : "transparent",
    color: isActive ? "primary.main" : "text.secondary",
    border: "none",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    px: 2.5,
    py: 1,
    height: "auto",
    "&:hover": {
      bgcolor: "rgba(25, 118, 210, 0.08)",
      color: "primary.main",
    },
    "& .MuiChip-icon": {
      color: "inherit",
      marginLeft: 0,
      marginRight: "8px",
    },
    "& .MuiChip-label": {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      paddingLeft: 0,
      paddingRight: 0,
    },
  }),

  // IconNavButton styles
  iconNavButton: (isActive: boolean) => ({
    color: isActive ? "primary.main" : "text.secondary",
    bgcolor: isActive ? "rgba(25, 118, 210, 0.08)" : "transparent",
    p: 1.5,
    borderRadius: 2,
    "&:hover": {
      bgcolor: "rgba(25, 118, 210, 0.08)",
      color: "primary.main",
    },
  }),

  // ProfileMenu styles
  profileMenu: {
    mt: 1,
    "& .MuiPaper-root": {
      minWidth: 220,
      borderRadius: 2,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  },

  profileHeader: {
    px: 2,
    py: 1,
    minWidth: 200,
  },

  profileInfo: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  profileAvatar: {
    width: 40,
    height: 40,
    bgcolor: "primary.main",
  },

  menuItem: {
    py: 1.5,
    "&:hover": {
      bgcolor: "rgba(25, 118, 210, 0.08)",
    },
  },

  menuItemIcon: {
    minWidth: 40,
  },

  menuItemIconSmall: {
    fontSize: 20,
  },

  menuItemText: {
    "& .MuiListItemText-primary": {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
    },
  },

  menuDivider: {
    my: 1,
  },

  logoutMenuItem: {
    color: "error.main",
  },

  logoutIcon: {
    color: "error.main",
  },

  authButtonContainer: {
    px: 2,
    py: 1.5,
  },

  loginButton: {
    color: "text.primary",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    py: 1,
    borderRadius: 1.5,
    textTransform: "none",
    justifyContent: "flex-start",
    mb: 1,
    "&:hover": {
      bgcolor: "rgba(0, 0, 0, 0.04)",
    },
  },

  signupButton: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    py: 1,
    borderRadius: 1.5,
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.24)",
    },
  },
};
