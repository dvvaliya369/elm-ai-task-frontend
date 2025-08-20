import { createAsyncThunk } from "@reduxjs/toolkit";
import api from ".";
import type { IPost, IPagination } from "../interface";

export interface IGetPostsParams {
  limit?: number;
  page?: number;
  userId?: string;
  search?: string;
  minLikes?: number;
  mediaType?: "image" | "video";
  sortBy?: "newest" | "oldest" | "mostLiked";
}

interface PostsResponse {
  success: boolean;
  message: string;
  data?: {
    posts: IPost[];
    pagination: IPagination;
    filters: {
      search?: string;
      userId?: string;
      mediaType?: string;
      sortBy: string;
      minLikes: number;
    };
  };
}

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (params: IGetPostsParams = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      queryParams.append("limit", (params.limit || 15).toString());
      queryParams.append("page", (params.page || 1).toString());

      if (params.userId) {
        queryParams.append("userId", params.userId);
      }

      if (params.search) {
        queryParams.append("search", params.search);
      }

      if (params.minLikes !== undefined) {
        queryParams.append("minLikes", params.minLikes.toString());
      }

      if (params.mediaType) {
        queryParams.append("mediaType", params.mediaType);
      }

      if (params.sortBy) {
        queryParams.append("sortBy", params.sortBy);
      }

      const res = await api.get<PostsResponse>(`/post/list?${queryParams.toString()}`);

      if (!res.data.success || !res.data.data) {
        return rejectWithValue(res.data.message || "Failed to fetch posts");
      }

      return res.data.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to fetch posts";
      return rejectWithValue(message);
    }
  }
);

export interface IAddCommentParams {
  postId: string;
  comment: string;
}

interface AddCommentResponse {
  success: boolean;
  message: string;
  commentId?: string;
}

interface CreatePostParams {
  caption?: string;
  media?: File;
}

interface CreatePostResponse {
  success: boolean;
  message: string;
  data: IPost;
}

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (params: IAddCommentParams, { rejectWithValue, getState }) => {
    try {
      const res = await api.put<AddCommentResponse>(`/post/comment/${params.postId}`, {
        comment: params.comment,
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to add comment");
      }

      // Get current user from state
      const state = getState() as {
        auth: {
          user: {
            _id: string;
            fullName?: string;
            firstName?: string;
            lastName?: string;
            email?: string;
            profilePhoto?: {
              photo_id?: string;
              photo_url?: string;
              photo_data?: string;
            };
          } | null;
        }
      };
      const currentUser = state.auth.user;

      return {
        postId: params.postId,
        message: res.data.message,
        commentId: res.data.commentId,
        currentUser: currentUser
      };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to add comment";
      return rejectWithValue(message);
    }
  }
);

export interface IToggleLikeParams {
  postId: string;
}

interface ToggleLikeResponse {
  success: boolean;
  message: string;
}

export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async (params: IToggleLikeParams, { rejectWithValue }) => {
    try {
      const res = await api.put<ToggleLikeResponse>(`/post/like/${params.postId}`);

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to toggle like");
      }

      return { postId: params.postId, message: res.data.message };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to toggle like";
      return rejectWithValue(message);
    }
  }
);

export interface IGetPostByIdParams {
  postId: string;
}

interface PostByIdResponse {
  success: boolean;
  message: string;
  data?: IPost;
}

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (params: IGetPostByIdParams, { rejectWithValue }) => {
    try {
      const res = await api.get<PostByIdResponse>(`/post/${params.postId}`);

      if (!res.data.success || !res.data.data) {
        return rejectWithValue(res.data.message || "Failed to fetch post");
      }

      return res.data.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to fetch post";
      return rejectWithValue(message);
    }
  }
);

export interface IDeleteCommentParams {
  postId: string;
  commentId: string;
}

interface DeleteCommentResponse {
  success: boolean;
  message: string;
}

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (params: IDeleteCommentParams, { rejectWithValue }) => {
    try {
      const res = await api.delete<DeleteCommentResponse>(`/post/comment/${params.postId}`, {
        data: { commentId: params.commentId }
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to delete comment");
      }

      return { postId: params.postId, commentId: params.commentId, message: res.data.message };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to delete comment";
      return rejectWithValue(message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (params: CreatePostParams, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      if (params.caption) {
        formData.append('caption', params.caption);
      }

      if (params.media) {
        formData.append('file', params.media);
      }

      const res = await api.post<CreatePostResponse>('/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to create post");
      }

      return res.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to create post";
      return rejectWithValue(message);
    }
  }
);
