export const createPostStyles = {
  container: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'grey.50',
    py: 4,
  },
  
  containerWrapper: {
    py: 4,
  },
  
  card: {
    p: 3,
    borderRadius: 2,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'white',
  },
  
  title: {
    mb: 2.5,
    color: 'text.primary',
  },
  
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    mb: 2.5,
  },
  
  avatar: {
    width: 40,
    height: 40,
    mr: 1.5,
  },
  
  userInfo: {
    flex: 1,
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
    justifyContent: 'flex-end',
    mb: 2,
  },
  
  previewContainer: {
    position: 'relative',
    mb: 2.5,
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
    maxHeight: '250px',
    objectFit: 'cover' as const,
    borderRadius: '8px',
  },

  videoPreview: {
    width: '100%',
    maxHeight: '250px',
    borderRadius: '8px',
  },
  
  uploadArea: {
    border: '2px dashed',
    borderColor: 'divider',
    borderRadius: 2,
    p: 3,
    textAlign: 'center',
    mb: 2.5,
    bgcolor: 'grey.50',
  },
  
  uploadIcon: {
    fontSize: 40,
    color: 'text.secondary',
    mb: 1.5,
  },
  
  uploadText: {
    mb: 1.5,
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
    gap: 2,
  },
  
  cancelButton: {
    flex: 1,
    py: 1.2,
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
