// PostDetailCard styles
export const postDetailCardStyles = {
  card: {
    width: "100%",
    borderRadius: 2,
    boxShadow: "none",
    border: "1px solid",
    borderColor: "divider",
  },
  captionContainer: {
    px: 2,
    pb: 1,
  },
  captionUsername: {
    fontWeight: 600,
    mr: 1,
  },
};

// CommentList styles
export const commentListStyles = {
  container: {
    px: 2,
    py: 1,
  },
  commentSeparator: {
    my: 1,
  },
};

// CommentItem styles
export const commentItemStyles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
    py: 1,
  },
  avatar: {
    width: 32,
    height: 32,
  },
  avatarWithInitials: {
    bgcolor: 'primary.main',
    color: 'white',
    fontSize: '0.875rem',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 0.5,
  },
  username: {
    fontWeight: 600,
  },
  timestamp: {
    color: 'text.secondary',
  },
  comment: {
    wordBreak: 'break-word',
  },
  deleteButton: {
    color: 'text.secondary',
    '&:hover': {
      color: 'error.main',
    },
  },
};

// PostDetailSkeleton styles
export const postDetailSkeletonStyles = {
  card: {
    width: '100%',
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
  commentsSection: {
    p: 2,
  },
  commentItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
    mb: 2,
  },
  commentContent: {
    flex: 1,
  },
  commentInputContainer: {
    borderTop: '1px solid',
    borderColor: 'divider',
    px: 2,
    py: 1,
  },
};
