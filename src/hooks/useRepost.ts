import { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from '../store';
import { toggleRepost } from '../service/post.service';
import { useToast } from './useToast';

export const useRepost = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { repostLoading } = useSelector((state) => state.posts);
  const { showError } = useToast();
  const debounceTimers = useRef<Record<string, number>>({});

  const handleRepost = useCallback(async (postId: string) => {
    if (!isAuthenticated) {
      showError('Please log in to repost');
      return;
    }

    if (debounceTimers.current[postId]) {
      clearTimeout(debounceTimers.current[postId]);
    }

    debounceTimers.current[postId] = setTimeout(async () => {
      try {
        const result = await dispatch(toggleRepost({ postId }));
        
        if (toggleRepost.rejected.match(result)) {
          showError(result.payload as string || 'Failed to toggle repost');
        }
      } catch {
        showError('Failed to toggle repost');
      } finally {
        delete debounceTimers.current[postId];
      }
    }, 300);
  }, [dispatch, isAuthenticated, showError]);

  const isRepostLoading = useCallback((postId: string) => {
    return repostLoading?.[postId] || false;
  }, [repostLoading]);

  return {
    handleRepost,
    isRepostLoading,
  };
};
