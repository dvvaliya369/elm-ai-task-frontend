import { useCallback } from "react";
import { useSelector, useDispatch } from "../store/index";
import { getPosts, type IGetPostsParams } from "../service/post.service";
import { clearPosts, clearError, appendPosts } from "../store/postSlice";

export const usePosts = () => {
  const dispatch = useDispatch();
  const { posts, pagination, filters, loading, error } = useSelector(
    (state) => state.posts
  );

  const fetchPosts = useCallback(
    (params?: IGetPostsParams, append = false) => {
      if (append) {
        dispatch(getPosts(params || {})).then((result) => {
          if (result.type === "posts/getPosts/fulfilled") {
            dispatch(appendPosts(result.payload));
          }
        });
      } else {
        dispatch(getPosts(params || {}));
      }
    },
    [dispatch]
  );

  const clearPostsData = useCallback(() => {
    dispatch(clearPosts());
  }, [dispatch]);

  const clearPostsError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    posts,
    pagination,
    filters,
    loading,
    error,
    fetchPosts,
    clearPostsData,
    clearPostsError,
  };
};
