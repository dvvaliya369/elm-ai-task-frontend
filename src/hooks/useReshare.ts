import { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from '../store';
import { toggleReshare } from '../service/post.service';
import { useToast } from './useToast';

export const useReshare = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { reshareLoading } = useSelector((state) => state.posts);
  const { showError } = useToast();
  const debounceTimers = useRef<Record<string, number>>({});

  const handleReshare = useCallback(async (postId: string) => {
    if (!isAuthenticated) {
      showError('Please log in to reshare posts');
      return;
    }

    if (debounceTimers.current[postId]) {
      clearTimeout(debounceTimers.current[postId]);
    }

    debounceTimers.current[postId] = setTimeout(async () => {
      try {
        const result = await dispatch(toggleReshare({ postId }));
        
        if (toggleReshare.rejected.match(result)) {
          showError(result.payload as string || 'Failed to toggle reshare');
        }
      } catch {
        showError('Failed to toggle reshare');
      } finally {
        delete debounceTimers.current[postId];
      }
    }, 300);
  }, [dispatch, isAuthenticated, showError]);

  const isReshareLoading = useCallback((postId: string) => {
    return reshareLoading[postId] || false;
  }, [reshareLoading]);

  return {
    handleReshare,
    isReshareLoading,
  };
};
