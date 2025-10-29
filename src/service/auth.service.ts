import { createAsyncThunk } from "@reduxjs/toolkit";
import api from ".";
import type { IUser } from "../interface";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  token: string;
  newPassword: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (body: ILoginPayload, { rejectWithValue }) => {
    try {
      const res = await api.post<AuthResponse>("/auth/login", body);

      if (!res.data.success || !res.data.data) {
        return rejectWithValue(res.data.message || "Login failed");
      }

      return res.data.data;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const message = axiosError.response?.data?.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (body: ISignupPayload, { rejectWithValue }) => {
    try {
      const res = await api.post<AuthResponse>("/auth/signup", body);

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Signup failed");
      }
      return { message: res.data.message };
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const message = axiosError.response?.data?.message || "Signup failed";
      return rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (body: IChangePasswordPayload, { rejectWithValue }) => {
    try {
      const res = await api.put<ChangePasswordResponse>(
        "/auth/change-password",
        body
      );

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Password change failed");
      }
      return { message: res.data.message };
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const message =
        axiosError.response?.data?.message || "Password change failed";
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (body: IForgotPasswordPayload, { rejectWithValue }) => {
    try {
      const res = await api.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        body
      );

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Request failed");
      }
      return { message: res.data.message };
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const message =
        axiosError.response?.data?.message || "Request failed";
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (body: IResetPasswordPayload, { rejectWithValue }) => {
    try {
      const res = await api.post<ResetPasswordResponse>(
        "/auth/reset-password",
        body
      );

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Password reset failed");
      }
      return { message: res.data.message };
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const message =
        axiosError.response?.data?.message || "Password reset failed";
      return rejectWithValue(message);
    }
  }
);
