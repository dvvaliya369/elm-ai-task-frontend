import React, { memo, useCallback } from 'react';
import { Box, Avatar, Typography, IconButton, CircularProgress } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from '../../store';
import { deleteComment } from '../../service/post.service';
import { useToast } from '../../hooks/useToast';
import type { IComment } from '../../interface';
import { formatTime } from '../../utils/formatTime';

interface CommentItemProps {
  comment: IComment;
  postId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { user, deleteCommentLoading } = useSelector((state) => ({
    user: state.auth.user,
    deleteCommentLoading: state.posts.deleteCommentLoading,
  }));
  const { showError, showSuccess } = useToast();

  const isLoading = deleteCommentLoading[comment._id] || false;
  const canDelete = user && user._id === comment.user._id;

  const handleDelete = useCallback(async () => {
    try {
      const result = await dispatch(deleteComment({
        postId,
        commentId: comment._id
      }));

      if (deleteComment.fulfilled.match(result)) {
        showSuccess('Comment deleted successfully');
      } else if (deleteComment.rejected.match(result)) {
        showError(result.payload as string || 'Failed to delete comment');
      }
    } catch {
      showError('Failed to delete comment');
    }
  }, [dispatch, postId, comment._id, showError, showSuccess]);

  const getAvatarProps = (user: IComment['user']) => {
    if (user.profilePhoto?.photo_url) {
      return { src: user.profilePhoto.photo_url };
    }

    return {
      children: comment.name[0],
      sx: {
        bgcolor: 'primary.main',
        color: 'white',
        fontSize: '0.875rem',
      },
    };
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, py: 1 }}>
      <Avatar
        {...getAvatarProps(comment.user)}
        sx={{ width: 32, height: 32, ...getAvatarProps(comment.user).sx }}
      />
      
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {comment.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatTime(comment.createdAt)}
          </Typography>
        </Box>
        
        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
          {comment.comment}
        </Typography>
      </Box>

      {canDelete && (
        <IconButton
          onClick={handleDelete}
          disabled={isLoading}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'error.main',
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={16} />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default memo(CommentItem);
