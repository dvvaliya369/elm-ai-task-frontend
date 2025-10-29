import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute, ProtectedRoute } from "./layouts";
import AuthInitializer from "./layouts/AuthInitializer.tsx";
import Home from "./pages/home/index.tsx";
import Login from "./pages/login/index.tsx";
import NotFound from "./pages/NotFound/index.tsx";
import Signup from "./pages/singup/index.tsx";
import PostDetail from "./pages/post/index.tsx";
import CreatePost from "./pages/create/index.tsx";
import Profile from "./pages/profile/index.tsx";
import MyPostsPage from "./pages/my-posts/index.tsx";
import ForgotPassword from "./pages/forgot-password/index.tsx";
import ResetPassword from "./pages/reset-password/index.tsx";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/posts/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/update/:postId"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:profileId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-posts"
            element={
              <ProtectedRoute>
                <MyPostsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/log-in"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  );
};

export default Router;
