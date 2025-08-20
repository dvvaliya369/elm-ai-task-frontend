import { createSlice } from "@reduxjs/toolkit";
import type { IPagination, IPost } from "../interface";
import {
  getPosts,
  addComment,
  toggleLike,
  getPostById,
  deleteComment,
} from "../service/post.service";

interface PostState {
  posts: IPost[];
  pagination: IPagination | null;
  filters: {
    search?: string;
    userId?: string;
    mediaType?: string;
    sortBy: string;
    minLikes: number;
  } | null;
  loading: boolean;
  error: string | null;
  commentLoading: Record<string, boolean>;
  likeLoading: Record<string, boolean>;
  singlePost: IPost | null;
  singlePostLoading: boolean;
  singlePostError: string | null;
  deleteCommentLoading: Record<string, boolean>;
}

const initialState: PostState = {
  posts: [],
  pagination: null,
  filters: null,
  loading: false,
  error: null,
  commentLoading: {},
  likeLoading: {},
  singlePost: null,
  singlePostLoading: false,
  singlePostError: null,
  deleteCommentLoading: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.pagination = null;
      state.filters = null;
      state.error = null;
      state.commentLoading = {};
      state.likeLoading = {};
    },
    clearSinglePost: (state) => {
      state.singlePost = null;
      state.singlePostLoading = false;
      state.singlePostError = null;
      state.deleteCommentLoading = {};
    },
    clearError: (state) => {
      state.error = null;
    },
    appendPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts];
      state.pagination = action.payload.pagination;
      state.filters = action.payload.filters;
    },
    incrementCommentCount: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        post.commentsCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.pagination = action.payload.pagination;
        state.filters = action.payload.filters;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch posts";
      })
      .addCase(addComment.pending, (state, action) => {
        const postId = action.meta.arg.postId;
        state.commentLoading[postId] = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const postId = action.payload.postId;
        const commentText = action.meta.arg.comment;
        const currentUser = action.payload.currentUser;
        const commentId = action.payload.commentId;
        state.commentLoading[postId] = false;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.commentsCount += 1;
          post.isCommentedByUser = true;
        }
        if (state.singlePost && state.singlePost._id === postId) {
          state.singlePost.commentsCount += 1;
          state.singlePost.isCommentedByUser = true;
          if (state.singlePost.comments && currentUser && commentId) {
            const userName = currentUser.fullName ||
              `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() ||
              'Current User';

            const newComment = {
              _id: commentId,
              user: {
                _id: currentUser._id,
                firstName: currentUser.firstName || currentUser.fullName?.split(' ')[0] || 'User',
                lastName: currentUser.lastName || currentUser.fullName?.split(' ')[1] || '',
                profilePhoto: currentUser.profilePhoto,
              },
              name: userName,
              comment: commentText,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            state.singlePost.comments.push(newComment);
          }
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        state.commentLoading[postId] = false;
      })
      .addCase(toggleLike.pending, (state, action) => {
        const postId = action.meta.arg.postId;
        state.likeLoading[postId] = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const postId = action.payload.postId;
        state.likeLoading[postId] = false;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          if (post.isLikedByUser) {
            post.isLikedByUser = false;
            post.likesCount = Math.max(0, post.likesCount - 1);
          } else {
            post.isLikedByUser = true;
            post.likesCount = post.likesCount + 1;
          }
        }
        if (state.singlePost && state.singlePost._id === postId) {
          if (state.singlePost.isLikedByUser) {
            state.singlePost.isLikedByUser = false;
            state.singlePost.likesCount = Math.max(0, state.singlePost.likesCount - 1);
          } else {
            state.singlePost.isLikedByUser = true;
            state.singlePost.likesCount = state.singlePost.likesCount + 1;
          }
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        state.likeLoading[postId] = false;
      })
      .addCase(getPostById.pending, (state) => {
        state.singlePostLoading = true;
        state.singlePostError = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.singlePostLoading = false;
        state.singlePost = action.payload;
        state.singlePostError = null;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.singlePostLoading = false;
        state.singlePostError =
          (action.payload as string) ?? "Failed to fetch post";
      })
      .addCase(deleteComment.pending, (state, action) => {
        const commentId = action.meta.arg.commentId;
        state.deleteCommentLoading[commentId] = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { commentId } = action.payload;
        state.deleteCommentLoading[commentId] = false;
        if (state.singlePost && state.singlePost.comments) {
          state.singlePost.comments = state.singlePost.comments.filter(
            (comment) => comment._id !== commentId
          );
          state.singlePost.commentsCount -= 1;
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        const commentId = action.meta.arg.commentId;
        state.deleteCommentLoading[commentId] = false;
      });
  },
});

export const {
  clearPosts,
  clearError,
  appendPosts,
  incrementCommentCount,
  clearSinglePost,
} = postSlice.actions;
export default postSlice.reducer;
