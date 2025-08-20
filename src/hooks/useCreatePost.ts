import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../store';
import { createPost } from '../service/post.service';
import { useToast } from './useToast';

export const useCreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { createPostLoading } = useSelector((state) => state.posts);

  const handleCreatePost = useCallback(async (caption?: string, media?: File) => {
    if (!caption?.trim() && !media) {
      showError('Please add a caption or select media');
      return;
    }

    try {
      const result = await dispatch(createPost({ caption, media }));
      
      if (createPost.fulfilled.match(result)) {
        showSuccess('Post created successfully!');
        navigate('/');
      } else {
        showError(result.payload as string || 'Failed to create post');
      }
    } catch {
      showError('Failed to create post');
    }
  }, [dispatch, navigate, showSuccess, showError]);

  return {
    handleCreatePost,
    createPostLoading,
  };
};
