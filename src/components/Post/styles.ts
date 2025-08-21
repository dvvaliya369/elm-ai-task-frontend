// PostCard styles
export const postCardStyles = {
  card: {
    maxWidth: 470,
    width: "100%",
    mx: "auto",
    mb: 3,
    borderRadius: 2,
    boxShadow: "none",
    border: "1px solid",
    borderColor: "divider",
  },
  cardClickable: {
    cursor: "pointer",
  },
  cardDefault: {
    cursor: "default",
  },
};

// PostHeader styles
export const postHeaderStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    p: 2,
    pb: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    mr: 2,
  },
  avatarWithPhoto: {},
  avatarWithInitials: {
    bgcolor: "primary.main",
    color: "white",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 600,
  },
  timestamp: {
    color: "text.secondary",
  },
};

// PostMedia styles
export const postMediaStyles = {
  errorContainer: {
    width: '100%',
    height: 300,
    bgcolor: 'grey.100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'text.secondary',
  },
  mediaContainer: {
    position: 'relative',
    width: '100%',
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '600px',
    objectFit: 'cover' as const,
    borderRadius: 0,
  },
  video: {
    width: '100%',
    height: 'auto',
    maxHeight: '600px',
    objectFit: 'cover' as const,
    borderRadius: 0,
  },
  mediaHidden: {
    display: 'none',
  },
  mediaVisible: {
    display: 'block',
  },
};

// PostActions styles
export const postActionsStyles = {
  container: {
    px: 2,
    py: 1,
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  },
  iconButton: {
    p: 0.5,
  },
  likedIcon: {
    color: 'error.main',
    fontSize: 24,
  },
  likeIcon: {
    fontSize: 24,
  },
  commentedIcon: {
    color: 'primary.main',
    fontSize: 24,
  },
  commentIcon: {
    fontSize: 24,
  },
  likesCount: {
    fontWeight: 600,
    mb: 0.5,
  },
};

// PostCaption styles
export const postCaptionStyles = {
  container: {
    px: 2,
    pb: 1,
  },
  caption: {
    mb: 1,
  },
  username: {
    fontWeight: 600,
    mr: 1,
  },
  moreButton: {
    p: 0,
    ml: 0.5,
    minWidth: "auto",
    color: "text.secondary",
    textTransform: "none",
    fontSize: "inherit",
  },
  viewCommentsButton: {
    p: 0,
    minWidth: "auto",
    color: "text.secondary",
    textTransform: "none",
    fontSize: "0.875rem",
    justifyContent: "flex-start",
  },
};

// CommentInput styles
export const commentInputStyles = {
  container: {
    px: 2,
    py: 1,
    borderTop: '1px solid',
    borderColor: 'divider',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  textField: {
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: '0.875rem',
      padding: '2px 0',
    },
  },
  sendButton: {
    color: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.light',
      color: 'primary.dark',
    },
    '&:disabled': {
      color: 'grey.400',
    },
  },
};

// PostMenu styles
export const postMenuStyles = {
  menuButton: {
    color: "text.secondary",
    "&:hover": {
      color: "text.primary",
    },
  },
  deleteMenuItem: {
    color: "error.main",
  },
  deleteIcon: {
    color: "error.main",
  },
};

// PostSkeleton styles
export const postSkeletonStyles = {
  card: {
    maxWidth: 470,
    width: '100%',
    mx: 'auto',
    mb: 3,
    borderRadius: 2,
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'divider',
  },
  header: {
    p: 2,
    pb: 1,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  headerAvatar: {
    mr: 2,
  },
  headerInfo: {
    flex: 1,
  },
  content: {
    p: 2,
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  },
  commentInputContainer: {
    borderTop: '1px solid',
    borderColor: 'divider',
    px: 2,
    py: 1,
  },
};
