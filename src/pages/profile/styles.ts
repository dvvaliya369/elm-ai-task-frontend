export const profileStyles = {
  loadingContainer: {
    py: 4,
  },

  loadingCard: {
    p: 4,
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
    py: 4,
  },

  notFoundCard: {
    p: 4,
    borderRadius: 3,
    textAlign: "center",
  },

  mainBackground: {
    bgcolor: "grey.50",
    minHeight: "calc(100vh - 64px)",
  },

  mainContainer: {
    py: 4,
  },

  mainCard: {
    p: 4,
    borderRadius: 3,
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    border: "1px solid",
    borderColor: "divider",
  },

  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatarContainer: {
    position: "relative",
    mb: 3,
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
  },

  firstNameField: {
    mb: 2,
  },

  lastNameField: {
    mb: 3,
  },

  buttonContainer: {
    display: "flex",
    gap: 2,
    justifyContent: "center",
  },

  cancelButton: {
    minWidth: 100,
  },

  saveButton: {
    minWidth: 100,
  },

  profileName: {
    mb: 1,
    textAlign: "center",
  },

  profileEmail: {
    mb: 3,
  },

  editButton: {
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 500,
    px: 3,
  },

  postsSection: {
    mt: 4,
    pt: 3,
    borderTop: "1px solid",
    borderColor: "divider",
  },
};
