import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../store';
import { updatePost } from '../service/post.service';
import { useToast } from './useToast';

export const useUpdatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { updatePostLoading } = useSelector((state) => state.posts);

  const handleUpdatePost = useCallback(async (
    postId: string,
    caption?: string,
    media?: File,
    isRemoveMedia?: boolean
  ) => {
    if (!caption?.trim() && !media && !isRemoveMedia) {
      showError('Please add a caption or select media');
      return;
    }

    try {
      const result = await dispatch(updatePost({ postId, caption, media, isRemoveMedia }));

      if (updatePost.fulfilled.match(result)) {
        showSuccess('Post updated successfully!');
        navigate('/');
      } else {
        showError(result.payload as string || 'Failed to update post');
      }
    } catch {
      showError('Failed to update post');
    }
  }, [dispatch, navigate, showSuccess, showError]);

  return {
    handleUpdatePost,
    updatePostLoading,
  };
};
