// Comments Detail Page Styles
export const commentsDetailStyles = {
  container: {
    maxWidth: 800,
    mx: 'auto',
    p: 2,
    minHeight: '100vh',
    bgcolor: 'background.default',
  },
  card: {
    borderRadius: 3,
    boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
    border: '1px solid',
    borderColor: 'divider',
    overflow: 'visible',
  },
  
  // Header styles
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
    pb: 1,
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  backButton: {
    color: 'text.primary',
    '&:hover': {
      bgcolor: 'action.hover',
    },
  },
  title: {
    fontWeight: 600,
    flex: 1,
    textAlign: 'center',
    mx: 2,
  },
  filterButton: {
    color: 'text.secondary',
    '&:hover': {
      bgcolor: 'action.hover',
    },
  },

  // Post info styles
  postInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
    p: 2,
    bgcolor: 'grey.50',
    borderRadius: 2,
    mb: 2,
  },
  postAvatar: {
    width: 48,
    height: 48,
    border: '2px solid',
    borderColor: 'primary.main',
  },
  postContent: {
    flex: 1,
    minWidth: 0,
  },
  postUsername: {
    fontWeight: 600,
    color: 'text.primary',
  },
  postCaption: {
    color: 'text.secondary',
    mt: 0.5,
    lineHeight: 1.4,
  },
  postTime: {
    color: 'text.disabled',
    mt: 0.5,
    display: 'block',
  },

  // Filter chips styles
  filterChips: {
    mb: 3,
    flexWrap: 'wrap',
  },
  filterChip: {
    fontSize: '0.75rem',
    height: 28,
    '&:hover': {
      bgcolor: 'primary.light',
      color: 'primary.contrastText',
    },
  },

  // Comments list styles
  commentsList: {
    maxHeight: '60vh',
    overflowY: 'auto',
    mb: 2,
    pr: 1,
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      bgcolor: 'grey.100',
      borderRadius: 3,
    },
    '&::-webkit-scrollbar-thumb': {
      bgcolor: 'grey.400',
      borderRadius: 3,
      '&:hover': {
        bgcolor: 'grey.500',
      },
    },
  },

  // Comment item styles
  commentItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1.5,
    py: 2,
    borderBottom: '1px solid',
    borderColor: 'grey.100',
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      bgcolor: 'grey.50',
      borderRadius: 1,
    },
  },
  commentAvatar: {
    width: 36,
    height: 36,
    fontSize: '0.875rem',
  },
  avatarWithInitials: {
    bgcolor: 'primary.main',
    color: 'white',
    fontWeight: 600,
  },
  commentContent: {
    flex: 1,
    minWidth: 0,
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 0.5,
  },
  commentUsername: {
    fontWeight: 600,
    color: 'text.primary',
  },
  commentTime: {
    color: 'text.disabled',
    fontSize: '0.75rem',
    ml: 'auto',
    mr: 1,
  },
  commentMenu: {
    opacity: 0,
    transition: 'opacity 0.2s',
    '.commentItem:hover &': {
      opacity: 1,
    },
  },
  commentText: {
    color: 'text.primary',
    lineHeight: 1.5,
    wordBreak: 'break-word',
    mb: 1,
  },
  commentActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  actionButton: {
    minWidth: 'auto',
    px: 1,
    py: 0.5,
    fontSize: '0.75rem',
    textTransform: 'none',
    color: 'text.secondary',
    '&:hover': {
      bgcolor: 'action.hover',
    },
    '& .MuiButton-startIcon': {
      mr: 0.5,
      '& svg': {
        fontSize: '1rem',
      },
    },
  },

  // Comment input styles
  commentInput: {
    borderTop: '1px solid',
    borderColor: 'divider',
    pt: 2,
    mt: 2,
  },
  replyBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
    p: 1,
    bgcolor: 'info.light',
    borderRadius: 1,
  },
  replyText: {
    color: 'info.dark',
    fontStyle: 'italic',
  },
  cancelReply: {
    fontSize: '0.75rem',
    textTransform: 'none',
    color: 'info.dark',
    minWidth: 'auto',
    p: 0.5,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 1.5,
  },
  inputAvatar: {
    width: 32,
    height: 32,
    mb: 1,
  },
  textField: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      bgcolor: 'background.paper',
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
        },
      },
    },
    '& .MuiInputBase-input': {
      py: 1.5,
      px: 2,
    },
  },
  sendButton: {
    color: 'primary.main',
    mb: 0.5,
    '&:disabled': {
      color: 'text.disabled',
    },
    '&:hover': {
      bgcolor: 'primary.light',
      color: 'primary.contrastText',
    },
  },
};
