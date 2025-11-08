// PostDetailCard styles
export const postDetailCardStyles = {
  card: {
    width: "100%",
    borderRadius: { xs: 0, sm: 2 },
    boxShadow: "none",
    border: "1px solid",
    borderColor: "divider",
    overflow: "hidden",
  },
  captionContainer: {
    px: { xs: 1.25, sm: 1.5, md: 2 },
    pb: { xs: 0.75, sm: 0.875, md: 1 },
  },
  captionUsername: {
    fontWeight: 600,
    mr: { xs: 0.75, sm: 1 },
    fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.95rem" },
  },
};

// CommentList styles
export const commentListStyles = {
  container: {
    px: { xs: 1.25, sm: 1.5, md: 2 },
    py: { xs: 0.75, sm: 0.875, md: 1 },
  },
  commentSeparator: {
    my: { xs: 0.75, sm: 0.875, md: 1 },
  },
};

// CommentItem styles
export const commentItemStyles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: { xs: 0.75, sm: 1, md: 1.25 },
    py: { xs: 0.75, sm: 0.875, md: 1 },
  },
  avatar: {
    width: { xs: 30, sm: 32, md: 34 },
    height: { xs: 30, sm: 32, md: 34 },
  },
  avatarWithInitials: {
    bgcolor: 'primary.main',
    color: 'white',
    fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
  },
  content: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: 0.5, sm: 0.75, md: 1 },
    mb: { xs: 0.25, sm: 0.5 },
    flexWrap: 'wrap',
  },
  username: {
    fontWeight: 600,
    fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.95rem' },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  timestamp: {
    color: 'text.secondary',
    fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.8rem' },
    flexShrink: 0,
  },
  comment: {
    wordBreak: 'break-word',
    fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.95rem' },
    lineHeight: 1.5,
  },
  deleteButton: {
    color: 'text.secondary',
    p: { xs: 0.5, sm: 0.6, md: 0.75 },
    minWidth: { xs: '36px', sm: '40px' },
    minHeight: { xs: '36px', sm: '40px' },
    '&:hover': {
      color: 'error.main',
    },
  },
};

// PostDetailSkeleton styles
export const postDetailSkeletonStyles = {
  card: {
    width: '100%',
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
  commentsSection: {
    p: { xs: 1.5, sm: 2 },
  },
  commentItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: { xs: 0.75, sm: 1 },
    mb: { xs: 1.5, sm: 2 },
  },
  commentContent: {
    flex: 1,
  },
  commentInputContainer: {
    borderTop: '1px solid',
    borderColor: 'divider',
    px: { xs: 1.5, sm: 2 },
    py: { xs: 0.75, sm: 1 },
  },
};
