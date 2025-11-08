// PostCard styles
export const postCardStyles = {
  card: {
    maxWidth: { xs: "100%", sm: 470, md: 500 },
    width: "100%",
    mx: "auto",
    mb: { xs: 1.5, sm: 2, md: 3 },
    borderRadius: { xs: 0, sm: 2 },
    boxShadow: "none",
    border: "1px solid",
    borderColor: "divider",
    overflow: "hidden",
  },
  cardClickable: {
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: { xs: "none", sm: "translateY(-2px)" },
      boxShadow: { xs: "none", sm: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    },
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
    p: { xs: 1.25, sm: 1.5, md: 2 },
    pb: { xs: 0.75, sm: 1 },
  },
  avatar: {
    width: { xs: 34, sm: 38, md: 40 },
    height: { xs: 34, sm: 38, md: 40 },
    mr: { xs: 1.25, sm: 1.5, md: 2 },
    fontSize: { xs: "0.875rem", sm: "1rem" },
  },
  avatarWithPhoto: {},
  avatarWithInitials: {
    bgcolor: "primary.main",
    color: "white",
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  username: {
    fontWeight: 600,
    fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "0.95rem" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  timestamp: {
    color: "text.secondary",
    fontSize: { xs: "0.6875rem", sm: "0.75rem", md: "0.8rem" },
  },
};

// PostMedia styles
export const postMediaStyles = {
  errorContainer: {
    width: '100%',
    height: { xs: 200, sm: 250, md: 300 },
    bgcolor: 'grey.100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'text.secondary',
    fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "1rem" },
    p: 2,
    textAlign: 'center',
  },
  mediaContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'grey.50',
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: { xs: '350px', sm: '450px', md: '550px', lg: '600px' },
    minHeight: { xs: '200px', sm: '250px' },
    objectFit: 'cover' as const,
    borderRadius: 0,
    display: 'block',
  },
  video: {
    width: '100%',
    height: 'auto',
    maxHeight: { xs: '350px', sm: '450px', md: '550px', lg: '600px' },
    minHeight: { xs: '200px', sm: '250px' },
    objectFit: 'cover' as const,
    borderRadius: 0,
    display: 'block',
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
    px: { xs: 1.25, sm: 1.5, md: 2 },
    py: { xs: 0.75, sm: 0.875, md: 1 },
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: 0.5, sm: 0.75, md: 1 },
    mb: { xs: 0.5, sm: 0.75, md: 1 },
  },
  iconButton: {
    p: { xs: 0.5, sm: 0.6, md: 0.75 },
    minWidth: { xs: '40px', sm: '44px' },
    minHeight: { xs: '40px', sm: '44px' },
  },
  likedIcon: {
    color: 'error.main',
    fontSize: { xs: 24, sm: 26, md: 28 },
  },
  likeIcon: {
    fontSize: { xs: 24, sm: 26, md: 28 },
  },
  commentedIcon: {
    color: 'primary.main',
    fontSize: { xs: 24, sm: 26, md: 28 },
  },
  commentIcon: {
    fontSize: { xs: 24, sm: 26, md: 28 },
  },
  likesCount: {
    fontWeight: 600,
    mb: { xs: 0.25, sm: 0.5 },
    fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.95rem" },
  },
};

// PostCaption styles
export const postCaptionStyles = {
  container: {
    px: { xs: 1.25, sm: 1.5, md: 2 },
    pb: { xs: 0.75, sm: 0.875, md: 1 },
  },
  caption: {
    mb: { xs: 0.5, sm: 0.75, md: 1 },
    fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.95rem" },
    lineHeight: 1.5,
    wordBreak: "break-word",
  },
  username: {
    fontWeight: 600,
    mr: { xs: 0.75, sm: 1 },
  },
  moreButton: {
    p: 0,
    ml: { xs: 0.25, sm: 0.5 },
    minWidth: "auto",
    minHeight: { xs: "32px", sm: "auto" },
    color: "text.secondary",
    textTransform: "none",
    fontSize: "inherit",
  },
  viewCommentsButton: {
    p: 0,
    minWidth: "auto",
    minHeight: { xs: "32px", sm: "auto" },
    color: "text.secondary",
    textTransform: "none",
    fontSize: { xs: "0.75rem", sm: "0.8125rem", md: "0.875rem" },
    justifyContent: "flex-start",
  },
};

// CommentInput styles
export const commentInputStyles = {
  container: {
    px: { xs: 1.25, sm: 1.5, md: 2 },
    py: { xs: 0.875, sm: 1, md: 1.25 },
    borderTop: '1px solid',
    borderColor: 'divider',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: 0.75, sm: 1 },
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
      fontSize: { xs: '16px', sm: '0.875rem', md: '0.9375rem' }, // 16px on mobile prevents zoom on iOS
      padding: { xs: '4px 0', sm: '2px 0' },
    },
  },
  sendButton: {
    color: 'primary.main',
    p: { xs: 0.75, sm: 0.875, md: 1 },
    minWidth: { xs: '40px', sm: '44px' },
    minHeight: { xs: '40px', sm: '44px' },
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
    maxWidth: { xs: "100%", sm: 470 },
    width: '100%',
    mx: 'auto',
    mb: { xs: 2, sm: 3 },
    borderRadius: { xs: 0, sm: 2 },
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'divider',
  },
  header: {
    p: { xs: 1.5, sm: 2 },
    pb: { xs: 1, sm: 1 },
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  headerAvatar: {
    mr: { xs: 1.5, sm: 2 },
  },
  headerInfo: {
    flex: 1,
  },
  content: {
    p: { xs: 1.5, sm: 2 },
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: 0.5, sm: 1 },
    mb: { xs: 0.75, sm: 1 },
  },
  commentInputContainer: {
    borderTop: '1px solid',
    borderColor: 'divider',
    px: { xs: 1.5, sm: 2 },
    py: { xs: 0.75, sm: 1 },
  },
};
