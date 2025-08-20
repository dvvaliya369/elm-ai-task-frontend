import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = "http://localhost:8000/api";

interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface TokenData {
  accessToken: string | null;
  refreshToken: string | null;
}

export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getTokens = (): TokenData => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void): void => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string): void => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const redirectToLogin = (): void => {
  clearTokens();
  if (window.location.pathname !== "/log-in") {
    window.location.href = "/log-in";
  }
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _skipAuthRefresh?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const skipRefreshPaths = [
        "/auth/refresh-token",
        "/auth/login",
        "/auth/register",
      ];
      const shouldSkipRefresh =
        originalRequest._skipAuthRefresh ||
        skipRefreshPaths.some((path) => originalRequest.url?.includes(path));

      if (shouldSkipRefresh) {
        return Promise.reject(error);
      }

      const errorData = error.response?.data as
        | { message?: string }
        | undefined;
      const errorMessage = errorData?.message?.toLowerCase() || "";
      const isAuthError =
        errorMessage.includes("token") ||
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("authentication") ||
        errorMessage.includes("expired") ||
        !errorMessage;

      if (!isAuthError) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { refreshToken } = getTokens();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios
          .create({
            baseURL: BASE_URL,
            headers: { "Content-Type": "application/json" },
          })
          .post<RefreshTokenResponse>("/auth/refresh-token", { refreshToken });

        const { data } = refreshResponse.data;

        if (
          !refreshResponse.data.success ||
          !data.accessToken ||
          !data.refreshToken
        ) {
          throw new Error("Invalid refresh token response");
        }

        setTokens(data.accessToken, data.refreshToken);
        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        onRefreshed(data.accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError: unknown) {
        const axiosError = refreshError as AxiosError;
        if (axiosError.response?.status === 401) {
          console.log("Refresh token expired, redirecting to login");
        } else if (axiosError.response?.status === 403) {
          console.log("Refresh token forbidden, redirecting to login");
        } else {
          const errorMessage = axiosError.message || "Unknown error occurred";
          console.log("Token refresh failed:", errorMessage);
        }

        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const isAuthenticated = (): boolean => {
  const { accessToken } = getTokens();
  return !!accessToken;
};

export const logout = (): void => {
  clearTokens();
  window.location.href = "/log-in";
};

export type { RefreshTokenResponse, TokenData };

export default api;
