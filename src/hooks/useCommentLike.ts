import { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from '../store';
import { toggleCommentLike } from '../service/post.service';
import { useToast } from './useToast';

export const useCommentLike = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { commentLikeLoading } = useSelector((state) => state.posts);
  const { showError } = useToast();
  const debounceTimers = useRef<Record<string, number>>({});

  const handleCommentLike = useCallback(async (postId: string, commentId: string) => {
    if (!isAuthenticated) {
      showError('Please log in to like comments');
      return;
    }

    if (debounceTimers.current[commentId]) {
      clearTimeout(debounceTimers.current[commentId]);
    }

    debounceTimers.current[commentId] = setTimeout(async () => {
      try {
        const result = await dispatch(toggleCommentLike({ postId, commentId }));
        
        if (toggleCommentLike.rejected.match(result)) {
          showError(result.payload as string || 'Failed to toggle comment like');
        }
      } catch {
        showError('Failed to toggle comment like');
      } finally {
        delete debounceTimers.current[commentId];
      }
    }, 300);
  }, [dispatch, isAuthenticated, showError]);

  const isCommentLikeLoading = useCallback((commentId: string) => {
    return commentLikeLoading[commentId] || false;
  }, [commentLikeLoading]);

  return {
    handleCommentLike,
    isCommentLikeLoading,
  };
};
