export const createPostStyles = {
  container: {
    minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 60px)', md: 'calc(100vh - 64px)' },
    display: 'flex',
    alignItems: { xs: 'flex-start', sm: 'center' },
    justifyContent: 'center',
    bgcolor: { xs: 'white', sm: 'grey.50' },
    py: { xs: 0, sm: 2, md: 4 },
  },
  
  containerWrapper: {
    py: { xs: 0, sm: 2, md: 4 },
    width: '100%',
  },
  
  card: {
    p: { xs: 1.5, sm: 2.5, md: 3 },
    borderRadius: { xs: 0, sm: 2 },
    boxShadow: { xs: 'none', sm: '0 2px 12px rgba(0, 0, 0, 0.06)' },
    border: { xs: 'none', sm: '1px solid' },
    borderColor: 'divider',
    bgcolor: 'white',
  },
  
  title: {
    mb: { xs: 1.5, sm: 2, md: 2.5 },
    color: 'text.primary',
    fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
    fontWeight: 600,
  },
  
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    mb: { xs: 1.5, sm: 2, md: 2.5 },
  },
  
  avatar: {
    width: { xs: 34, sm: 38, md: 40 },
    height: { xs: 34, sm: 38, md: 40 },
    mr: { xs: 1, sm: 1.25, md: 1.5 },
    fontSize: { xs: '0.875rem', sm: '1rem' },
  },
  
  userInfo: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
  },
  
  textField: {
    mb: { xs: 1, sm: 1.25, md: 1.5 },
    '& .MuiOutlinedInput-root': {
      borderRadius: { xs: 1, sm: 1.5 },
      fontSize: { xs: '16px', sm: '0.9375rem', md: '0.95rem' }, // 16px on mobile prevents zoom on iOS
      '& fieldset': {
        borderColor: 'divider',
      },
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      },
      '& textarea': {
        fontSize: { xs: '16px', sm: '0.9375rem', md: '0.95rem' },
      },
    },
  },
  
  characterCounter: {
    display: 'flex',
    justifyContent: 'flex-end',
    mb: { xs: 1.25, sm: 1.5, md: 2 },
    fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.8125rem' },
  },
  
  previewContainer: {
    position: 'relative',
    mb: { xs: 1.5, sm: 2, md: 2.5 },
    borderRadius: { xs: 1, sm: 2 },
    overflow: 'hidden',
  },
  
  closeButton: {
    position: 'absolute',
    top: { xs: 6, sm: 8 },
    right: { xs: 6, sm: 8 },
    bgcolor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    zIndex: 1,
    width: { xs: 32, sm: 36 },
    height: { xs: 32, sm: 36 },
    '&:hover': {
      bgcolor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  
  closeIcon: {
    fontSize: { xs: 18, sm: 20 },
  },
  
  mediaPreview: {
    width: '100%',
    maxHeight: { xs: '250px', sm: '300px', md: '350px' },
    minHeight: { xs: '150px', sm: '200px' },
    objectFit: 'cover' as const,
    borderRadius: { xs: '4px', sm: '8px' },
    display: 'block',
  },

  videoPreview: {
    width: '100%',
    maxHeight: { xs: '250px', sm: '300px', md: '350px' },
    minHeight: { xs: '150px', sm: '200px' },
    borderRadius: { xs: '4px', sm: '8px' },
    display: 'block',
  },
  
  uploadArea: {
    border: '2px dashed',
    borderColor: 'divider',
    borderRadius: { xs: 1, sm: 2 },
    p: { xs: 2, sm: 2.5, md: 3 },
    textAlign: 'center',
    mb: { xs: 1.5, sm: 2, md: 2.5 },
    bgcolor: 'grey.50',
  },
  
  uploadIcon: {
    fontSize: { xs: 36, sm: 40, md: 48 },
    color: 'text.secondary',
    mb: { xs: 1, sm: 1.25, md: 1.5 },
  },
  
  uploadText: {
    mb: { xs: 1, sm: 1.25, md: 1.5 },
    fontSize: { xs: '0.8125rem', sm: '0.9375rem', md: '1rem' },
  },
  
  uploadButton: {
    borderRadius: { xs: 1, sm: 1.5 },
    textTransform: 'none',
    fontWeight: 500,
    px: { xs: 2, sm: 2.25, md: 2.5 },
    py: { xs: 0.75, sm: 0.875, md: 1 },
    fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '0.95rem' },
    minHeight: { xs: '40px', sm: '42px' },
  },
  
  buttonContainer: {
    display: 'flex',
    gap: { xs: 1.25, sm: 1.5, md: 2 },
    flexDirection: { xs: 'column', sm: 'row' },
    mt: { xs: 0.5, sm: 0 },
  },
  
  cancelButton: {
    flex: 1,
    py: { xs: 1.25, sm: 1.25, md: 1.2 },
    borderRadius: { xs: 1, sm: 1.5 },
    textTransform: 'none',
    fontWeight: 500,
    fontSize: { xs: '0.9375rem', sm: '0.9375rem', md: '0.95rem' },
    minHeight: { xs: '44px', sm: '42px' },
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
    py: { xs: 1.25, sm: 1.25, md: 1.2 },
    borderRadius: { xs: 1, sm: 1.5 },
    textTransform: 'none',
    fontWeight: 500,
    fontSize: { xs: '0.9375rem', sm: '0.9375rem', md: '0.95rem' },
    minHeight: { xs: '44px', sm: '42px' },
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
