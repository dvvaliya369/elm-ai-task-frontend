export const createPostStyles = {
  container: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: { xs: 'flex-start', sm: 'center' },
    bgcolor: 'grey.50',
    py: { xs: 3, sm: 4 },
    px: { xs: 1.5, sm: 0 },
  },

  containerWrapper: {
    py: { xs: 2, sm: 4 },
  },

  card: {
    p: { xs: 2.5, sm: 3 },
    borderRadius: 2,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'white',
    width: '100%',
  },

  title: {
    mb: { xs: 2, sm: 2.5 },
    color: 'text.primary',
  },

  userProfile: {
    display: 'flex',
    alignItems: { xs: 'flex-start', sm: 'center' },
    flexDirection: { xs: 'column', sm: 'row' },
    mb: { xs: 2, sm: 2.5 },
    gap: { xs: 1.5, sm: 0 },
  },

  avatar: {
    width: 40,
    height: 40,
    mr: { xs: 0, sm: 1.5 },
    mb: { xs: 1, sm: 0 },
  },

  userInfo: {
    flex: 1,
    textAlign: { xs: 'center', sm: 'left' },
    width: '100%',
  },

  textField: {
    mb: 1.5,
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      fontSize: '0.95rem',
      '& fieldset': {
        borderColor: 'divider',
      },
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      },
    },
  },

  characterCounter: {
    display: 'flex',
    justifyContent: { xs: 'center', sm: 'flex-end' },
    mb: { xs: 1.5, sm: 2 },
  },

  previewContainer: {
    position: 'relative',
    mb: { xs: 2, sm: 2.5 },
  },

  closeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    bgcolor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    zIndex: 1,
    width: 32,
    height: 32,
    '&:hover': {
      bgcolor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  
  closeIcon: {
    fontSize: 18,
  },
  
  mediaPreview: {
    width: '100%',
    maxHeight: { xs: '200px', sm: '250px' },
    objectFit: 'cover' as const,
    borderRadius: '8px',
  },

  videoPreview: {
    width: '100%',
    maxHeight: { xs: '200px', sm: '250px' },
    borderRadius: '8px',
  },

  uploadArea: {
    border: '2px dashed',
    borderColor: 'divider',
    borderRadius: 2,
    p: { xs: 2, sm: 3 },
    textAlign: 'center',
    mb: { xs: 2, sm: 2.5 },
    bgcolor: 'grey.50',
  },

  uploadIcon: {
    fontSize: { xs: 32, sm: 40 },
    color: 'text.secondary',
    mb: { xs: 1, sm: 1.5 },
  },

  uploadText: {
    mb: { xs: 1, sm: 1.5 },
  },

  uploadButton: {
    borderRadius: 1.5,
    textTransform: 'none',
    fontWeight: 500,
    px: 2.5,
    py: 0.75,
  },
  
  buttonContainer: {
    display: 'flex',
    gap: { xs: 1.5, sm: 2 },
    width: '100%',
  },

  cancelButton: {
    flex: 1,
    py: 1.2,
    width: { xs: '100%', sm: 'auto' },
    borderRadius: 1.5,
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.95rem',
    borderColor: 'divider',
    color: 'text.secondary',
    '&:hover': {
      borderColor: 'primary.main',
      color: 'primary.main',
      bgcolor: 'rgba(25, 118, 210, 0.04)',
    },
  },
  
  submitButton: {
    flex: 1,
    py: 1.2,
    width: { xs: '100%', sm: 'auto' },
    borderRadius: 1.5,
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.95rem',
    bgcolor: 'primary.main',
    '&:hover': {
      bgcolor: 'primary.dark',
    },
    '&:disabled': {
      bgcolor: 'grey.300',
      color: 'grey.500',
    },
  },
  
  // Skeleton styles
  skeletonTitle: {
    mx: 'auto',
    mb: 2.5,
  },
  
  skeletonProfile: {
    display: 'flex',
    alignItems: 'center',
    mb: 2.5,
  },
  
  skeletonAvatar: {
    mr: 1.5,
  },
  
  skeletonUserInfo: {
    flex: 1,
  },
  
  skeletonUsername: {
    mb: 0.5,
  },
  
  skeletonTextField: {
    mb: 1.5,
    borderRadius: 1.5,
  },
  
  skeletonCounter: {
    display: 'flex',
    justifyContent: 'flex-end',
    mb: 2,
  },
  
  skeletonMedia: {
    mb: 2.5,
    borderRadius: 2,
  },
  
  skeletonButtons: {
    display: 'flex',
    gap: 1.5,
  },
  
  skeletonButton: {
    borderRadius: 1.5,
  },
};
