export const profileStyles = {
  loadingContainer: {
    py: { xs: 1.5, sm: 2, md: 4 },
  },

  loadingCard: {
    p: { xs: 2, sm: 3, md: 4 },
    borderRadius: { xs: 0, sm: 2, md: 3 },
  },

  loadingProfile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  loadingSkeleton: {
    mb: { xs: 1.5, sm: 2 },
  },

  loadingSkeletonName: {
    mb: { xs: 0.75, sm: 1 },
  },

  notFoundContainer: {
    py: { xs: 1.5, sm: 2, md: 4 },
  },

  notFoundCard: {
    p: { xs: 2, sm: 3, md: 4 },
    borderRadius: { xs: 0, sm: 2, md: 3 },
    textAlign: "center",
  },

  mainBackground: {
    bgcolor: { xs: "white", sm: "grey.50" },
    minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 60px)", md: "calc(100vh - 64px)" },
  },

  mainContainer: {
    py: { xs: 0, sm: 2, md: 4 },
    px: { xs: 0, sm: 2 },
  },

  mainCard: {
    p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
    borderRadius: { xs: 0, sm: 2, md: 3 },
    boxShadow: { xs: "none", sm: "0 2px 12px rgba(0, 0, 0, 0.08)" },
    border: { xs: "none", sm: "1px solid" },
    borderColor: "divider",
  },

  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  avatarContainer: {
    position: "relative",
    mb: { xs: 1.5, sm: 2, md: 3 },
  },

  avatar: {
    width: { xs: 90, sm: 110, md: 120 },
    height: { xs: 90, sm: 110, md: 120 },
    bgcolor: "primary.main",
    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
    fontWeight: 600,
  },

  cameraButton: {
    position: "absolute",
    bottom: { xs: -2, sm: 0 },
    right: { xs: -2, sm: 0 },
    bgcolor: "primary.main",
    color: "white",
    width: { xs: 34, sm: 36, md: 40 },
    height: { xs: 34, sm: 36, md: 40 },
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },

  cameraIcon: {
    fontSize: { xs: 18, sm: 20, md: 22 },
  },

  editFormContainer: {
    width: "100%",
    maxWidth: { xs: "100%", sm: 400 },
  },

  firstNameField: {
    mb: { xs: 1.25, sm: 1.5, md: 2 },
    '& .MuiInputBase-input': {
      fontSize: { xs: '16px', sm: '0.9375rem', md: '1rem' },
    },
  },

  lastNameField: {
    mb: { xs: 1.5, sm: 2, md: 3 },
    '& .MuiInputBase-input': {
      fontSize: { xs: '16px', sm: '0.9375rem', md: '1rem' },
    },
  },

  buttonContainer: {
    display: "flex",
    gap: { xs: 1.25, sm: 1.5, md: 2 },
    justifyContent: "center",
    flexDirection: { xs: "column", sm: "row" },
  },

  cancelButton: {
    minWidth: { xs: "100%", sm: 120 },
    minHeight: { xs: "44px", sm: "40px" },
    fontSize: { xs: "0.9375rem", sm: "0.875rem", md: "0.95rem" },
  },

  saveButton: {
    minWidth: { xs: "100%", sm: 120 },
    minHeight: { xs: "44px", sm: "40px" },
    fontSize: { xs: "0.9375rem", sm: "0.875rem", md: "0.95rem" },
  },

  profileName: {
    mb: { xs: 0.75, sm: 1 },
    textAlign: "center",
    fontSize: { xs: "1.125rem", sm: "1.375rem", md: "1.5rem" },
    fontWeight: 600,
    wordBreak: "break-word",
  },

  profileEmail: {
    mb: { xs: 1.5, sm: 2, md: 3 },
    fontSize: { xs: "0.8125rem", sm: "0.9375rem", md: "1rem" },
    textAlign: "center",
    wordBreak: "break-word",
  },

  editButton: {
    borderRadius: { xs: 1, sm: 1.5, md: 2 },
    textTransform: "none",
    fontWeight: 500,
    px: { xs: 2, sm: 2.5, md: 3 },
    py: { xs: 1, sm: 0.75 },
    fontSize: { xs: "0.9375rem", sm: "0.875rem", md: "0.95rem" },
    minHeight: { xs: "44px", sm: "40px" },
  },

  postsSection: {
    mt: { xs: 2, sm: 3, md: 4 },
    pt: { xs: 1.5, sm: 2, md: 3 },
    borderTop: "1px solid",
    borderColor: "divider",
  },
};
