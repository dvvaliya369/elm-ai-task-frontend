import { createAsyncThunk } from "@reduxjs/toolkit";
import api from ".";

export interface IProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: {
    photo_id?: string;
    photo_url?: string;
    photo_data?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: IProfile;
}

interface GetProfileParams {
  profileId?: string;
}

interface UpdateProfileParams {
  firstName?: string;
  lastName?: string;
  file?: File;
}

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (params: GetProfileParams = {}, { rejectWithValue }) => {
    try {
      const endpoint = params.profileId
        ? `/profile/${params.profileId}`
        : "/profile/me";
      const res = await api.get<ProfileResponse>(endpoint);

      if (!res.data.success || !res.data.data) {
        return rejectWithValue(res.data.message || "Failed to fetch profile");
      }

      return res.data.data;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const message =
        axiosError.response?.data?.message || "Failed to fetch profile";
      return rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (params: UpdateProfileParams, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      if (params.firstName) {
        formData.append("firstName", params.firstName);
      }

      if (params.lastName) {
        formData.append("lastName", params.lastName);
      }

      if (params.file) {
        formData.append("file", params.file);
      }

      const res = await api.put<ProfileResponse>("/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to update profile");
      }

      return res.data.data;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const message =
        axiosError.response?.data?.message || "Failed to update profile";
      return rejectWithValue(message);
    }
  }
);
