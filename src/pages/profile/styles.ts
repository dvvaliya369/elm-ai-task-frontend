export const profileStyles = {
  loadingContainer: {
    py: { xs: 3, sm: 4 },
    px: { xs: 2, sm: 0 },
  },

  loadingCard: {
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
  },

  loadingProfile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  loadingSkeleton: {
    mb: 2,
  },

  loadingSkeletonName: {
    mb: 1,
  },

  notFoundContainer: {
    py: { xs: 3, sm: 4 },
    px: { xs: 2, sm: 0 },
  },

  notFoundCard: {
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
    textAlign: "center",
  },

  mainBackground: {
    bgcolor: "grey.50",
    minHeight: "calc(100vh - 64px)",
  },

  mainContainer: {
    py: { xs: 3, sm: 4 },
    px: { xs: 2, sm: 0 },
  },

  mainCard: {
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    border: "1px solid",
    borderColor: "divider",
  },

  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: { xs: "center", sm: "left" },
  },

  avatarContainer: {
    position: "relative",
    mb: { xs: 2, sm: 3 },
  },

  avatar: {
    width: 120,
    height: 120,
    bgcolor: "primary.main",
    fontSize: "2rem",
    fontWeight: 600,
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    bgcolor: "primary.main",
    color: "white",
    width: 36,
    height: 36,
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },

  cameraIcon: {
    fontSize: 18,
  },

  editFormContainer: {
    width: "100%",
    maxWidth: 400,
    mt: { xs: 2, sm: 0 },
  },

  firstNameField: {
    mb: { xs: 1.5, sm: 2 },
  },

  lastNameField: {
    mb: { xs: 2, sm: 3 },
  },

  buttonContainer: {
    display: "flex",
    gap: { xs: 1.5, sm: 2 },
    justifyContent: "center",
    flexWrap: { xs: "wrap", sm: "nowrap" },
  },

  cancelButton: {
    minWidth: 100,
  },

  saveButton: {
    minWidth: 100,
  },

  profileName: {
    mb: { xs: 0.75, sm: 1 },
    textAlign: "center",
  },

  profileEmail: {
    mb: { xs: 2, sm: 3 },
  },

  editButton: {
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 500,
    px: 3,
    width: { xs: "100%", sm: "auto" },
  },

  postsSection: {
    mt: { xs: 3, sm: 4 },
    pt: { xs: 2, sm: 3 },
    borderTop: "1px solid",
    borderColor: "divider",
  },
};
