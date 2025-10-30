import React, { useState, useCallback } from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ImageOutlined as ImageIcon,
  CloseOutlined as CloseIcon,
  CropOutlined as CropIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../../store";
import { getUserDisplayName, getUserAvatarProps } from "../../utils/user";
import { useCreatePost } from "../../hooks/useCreatePost";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import { getPostById } from "../../service/post.service";
import Navbar from "../../layouts/Navbar";
import { ImageCropper } from "../../components";
import { createPostStyles } from "./styles";

const CreatePost: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams<{ postId: string }>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((state) => state.auth);
  const { singlePostLoading } = useSelector((state) => state.posts);
  const { handleCreatePost, createPostLoading } = useCreatePost();
  const { handleUpdatePost, updatePostLoading } = useUpdatePost();

  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [originalMediaUrl, setOriginalMediaUrl] = useState<string | null>(null);
  const [isMediaRemoved, setIsMediaRemoved] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<File | null>(null);

  const isUpdateMode = Boolean(postId);
  const displayName = getUserDisplayName(user);
  const avatarProps = getUserAvatarProps(user);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setMediaType(file.type.startsWith("image/") ? "image" : "video");
        setIsMediaRemoved(false);
      }
    },
    []
  );

  const handleCropImage = useCallback(() => {
    if (selectedFile && mediaType === "image") {
      setImageToEdit(selectedFile);
      setCropperOpen(true);
    }
  }, [selectedFile, mediaType]);

  const handleCropComplete = useCallback((croppedFile: File) => {
    // Clean up the old preview URL
    if (previewUrl && !originalMediaUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Set the new cropped file
    setSelectedFile(croppedFile);
    const newUrl = URL.createObjectURL(croppedFile);
    setPreviewUrl(newUrl);
    setCropperOpen(false);
    setImageToEdit(null);
  }, [previewUrl, originalMediaUrl]);

  const handleCropperClose = useCallback(() => {
    setCropperOpen(false);
    setImageToEdit(null);
  }, []);

  const handleRemoveFile = useCallback(() => {
    if (previewUrl && !originalMediaUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (originalMediaUrl && previewUrl === originalMediaUrl) {
      setIsMediaRemoved(true);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setMediaType(null);
  }, [previewUrl, originalMediaUrl]);

  const handleCancel = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    navigate("/");
  }, [navigate, previewUrl]);

  React.useEffect(() => {
    if (isUpdateMode && postId && !isLoaded) {
      const fetchPost = async () => {
        try {
          const result = await dispatch(getPostById({ postId }));
          if (getPostById.fulfilled.match(result)) {
            const post = result.payload;
            setCaption(post.caption || "");

            if (post.media?.url) {
              setPreviewUrl(post.media.url);
              setOriginalMediaUrl(post.media.url);
              setMediaType(
                post.media.type?.startsWith("video") ? "video" : "image"
              );
            }

            setIsLoaded(true);
          }
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };

      fetchPost();
    }
  }, [isUpdateMode, postId, isLoaded, dispatch, navigate]);

  const handleSubmit = useCallback(async () => {
    if (isUpdateMode && postId) {
      await handleUpdatePost(
        postId,
        caption,
        selectedFile || undefined,
        isMediaRemoved
      );
    } else {
      await handleCreatePost(caption, selectedFile || undefined);
    }
  }, [
    isUpdateMode,
    postId,
    handleUpdatePost,
    handleCreatePost,
    caption,
    selectedFile,
    isMediaRemoved,
  ]);

  const isDisabled =
    (!caption.trim() && !selectedFile && !isMediaRemoved) ||
    createPostLoading ||
    updatePostLoading;

  if (isUpdateMode && !isLoaded && singlePostLoading) {
    return (
      <>
        <Navbar />
        <Box sx={createPostStyles.container}>
          <Container maxWidth="sm" sx={createPostStyles.containerWrapper}>
            <Card sx={createPostStyles.card}>
              <Skeleton
                variant="text"
                width={200}
                height={32}
                sx={createPostStyles.skeletonTitle}
              />

              <Box sx={createPostStyles.skeletonProfile}>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={createPostStyles.skeletonAvatar}
                />
                <Box sx={createPostStyles.skeletonUserInfo}>
                  <Skeleton
                    variant="text"
                    width={120}
                    height={20}
                    sx={createPostStyles.skeletonUsername}
                  />
                  <Skeleton variant="text" width={80} height={16} />
                </Box>
              </Box>

              <Skeleton
                variant="rectangular"
                width="100%"
                height={80}
                sx={createPostStyles.skeletonTextField}
              />

              <Box sx={createPostStyles.skeletonCounter}>
                <Skeleton variant="text" width={40} height={16} />
              </Box>

              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={createPostStyles.skeletonMedia}
              />

              <Box sx={createPostStyles.skeletonButtons}>
                <Skeleton
                  variant="rectangular"
                  width="50%"
                  height={40}
                  sx={createPostStyles.skeletonButton}
                />
                <Skeleton
                  variant="rectangular"
                  width="50%"
                  height={40}
                  sx={createPostStyles.skeletonButton}
                />
              </Box>
            </Card>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={createPostStyles.container}>
        <Container maxWidth="sm">
          <Card sx={createPostStyles.card}>
            <Typography
              variant="h6"
              fontWeight={600}
              textAlign="center"
              sx={createPostStyles.title}
            >
              {isUpdateMode ? "Update Post" : "Create New Post"}
            </Typography>

            <Box sx={createPostStyles.userProfile}>
              <Avatar
                {...avatarProps}
                sx={{
                  ...createPostStyles.avatar,
                  ...avatarProps.sx,
                }}
              />
              <Box sx={createPostStyles.userInfo}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {displayName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setCaption(e.target.value);
                }
              }}
              variant="outlined"
              sx={createPostStyles.textField}
            />

            <Box sx={createPostStyles.characterCounter}>
              <Typography variant="caption" color="text.secondary">
                {caption.length}/500
              </Typography>
            </Box>

            {previewUrl ? (
              <Box sx={createPostStyles.previewContainer}>
                <Box sx={{ display: "flex", gap: 1, position: "absolute", top: 8, right: 8, zIndex: 1 }}>
                  {mediaType === "image" && (
                    <IconButton
                      onClick={handleCropImage}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                        },
                      }}
                      size="small"
                    >
                      <CropIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={handleRemoveFile}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                {mediaType === "image" ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={createPostStyles.mediaPreview}
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    style={createPostStyles.videoPreview}
                  />
                )}
              </Box>
            ) : (
              <Box sx={createPostStyles.uploadArea}>
                <ImageIcon sx={createPostStyles.uploadIcon} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={createPostStyles.uploadText}
                >
                  Add a photo or video to your post
                </Typography>
                <input
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<ImageIcon />}
                    size="small"
                    sx={createPostStyles.uploadButton}
                  >
                    Select Image/Video
                  </Button>
                </label>
              </Box>
            )}

            <Box
              sx={{
                ...createPostStyles.buttonContainer,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={createPostStyles.cancelButton}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isDisabled}
                sx={createPostStyles.submitButton}
              >
                {createPostLoading || updatePostLoading
                  ? isUpdateMode
                    ? "Updating..."
                    : "Sharing..."
                  : isUpdateMode
                  ? "Update Post"
                  : "Share Post"}
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>

      <ImageCropper
        open={cropperOpen}
        onClose={handleCropperClose}
        onCropComplete={handleCropComplete}
        initialImage={imageToEdit || undefined}
      />
    </>
  );
};

export default CreatePost;
