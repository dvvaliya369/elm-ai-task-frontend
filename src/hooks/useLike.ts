import { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from '../store';
import { toggleLike } from '../service/post.service';
import { useToast } from './useToast';

export const useLike = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { likeLoading } = useSelector((state) => state.posts);
  const { showError } = useToast();
  const debounceTimers = useRef<Record<string, number>>({});

  const handleLike = useCallback(async (postId: string) => {
    if (!isAuthenticated) {
      showError('Please log in to like posts');
      return;
    }

    if (debounceTimers.current[postId]) {
      clearTimeout(debounceTimers.current[postId]);
    }

    debounceTimers.current[postId] = setTimeout(async () => {
      try {
        const result = await dispatch(toggleLike({ postId }));
        
        if (toggleLike.rejected.match(result)) {
          showError(result.payload as string || 'Failed to toggle like');
        }
      } catch {
        showError('Failed to toggle like');
      } finally {
        delete debounceTimers.current[postId];
      }
    }, 300);
  }, [dispatch, isAuthenticated, showError]);

  const isLikeLoading = useCallback((postId: string) => {
    return likeLoading[postId] || false;
  }, [likeLoading]);

  return {
    handleLike,
    isLikeLoading,
  };
};
