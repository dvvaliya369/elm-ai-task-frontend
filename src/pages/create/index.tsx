import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ImageOutlined as ImageIcon,
  CloseOutlined as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../store';
import { getUserDisplayName, getUserAvatarProps } from '../../utils/user';
import { useCreatePost } from '../../hooks/useCreatePost';
import Navbar from '../../layouts/Navbar';

const CreatePost: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useSelector((state) => state.auth);
  const { handleCreatePost, createPostLoading } = useCreatePost();

  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const displayName = getUserDisplayName(user);
  const avatarProps = getUserAvatarProps(user);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setMediaType(file.type.startsWith('image/') ? 'image' : 'video');
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setMediaType(null);
  }, [previewUrl]);

  const handleCancel = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    navigate('/');
  }, [navigate, previewUrl]);

  const handleSubmit = useCallback(async () => {
    await handleCreatePost(caption, selectedFile || undefined);
  }, [handleCreatePost, caption, selectedFile]);

  const isDisabled = (!caption.trim() && !selectedFile) || createPostLoading;

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.50',
          py: 4,
        }}
      >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
          }}
        >
        <Typography
          variant="h6"
          fontWeight={600}
          textAlign="center"
          sx={{ mb: 2.5, color: 'text.primary' }}
        >
          Create New Post
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
          <Avatar
            {...avatarProps}
            sx={{
              width: 40,
              height: 40,
              mr: 1.5,
              ...avatarProps.sx,
            }}
          />
          <Box>
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
          sx={{
            mb: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
              fontSize: '0.95rem',
              '& fieldset': {
                borderColor: 'divider',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {caption.length}/500
          </Typography>
        </Box>

        {previewUrl ? (
          <Box sx={{ position: 'relative', mb: 2.5 }}>
            <IconButton
              onClick={handleRemoveFile}
              sx={{
                position: 'absolute',
                top: 6,
                right: 6,
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                zIndex: 1,
                width: 32,
                height: 32,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
            {mediaType === 'image' ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: '250px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <video
                src={previewUrl}
                controls
                style={{
                  width: '100%',
                  maxHeight: '250px',
                  borderRadius: '8px',
                }}
              />
            )}
          </Box>
        ) : (
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              mb: 2.5,
              bgcolor: 'grey.50',
            }}
          >
            <ImageIcon
              sx={{
                fontSize: 40,
                color: 'text.secondary',
                mb: 1.5,
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Add a photo or video to your post
            </Typography>
            <input
              accept="image/*,video/*"
              style={{ display: 'none' }}
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
                sx={{
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2.5,
                  py: 0.75,
                }}
              >
                Select Image/Video
              </Button>
            </label>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              flex: 1,
              py: 1.2,
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              borderColor: 'divider',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
                bgcolor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isDisabled}
            sx={{
              flex: 1,
              py: 1.2,
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&:disabled': {
                bgcolor: 'grey.300',
                color: 'grey.500',
              },
            }}
          >
            {createPostLoading ? 'Sharing...' : 'Share Post'}
          </Button>
        </Box>
        </Card>
      </Container>
    </Box>
    </>
  );
};

export default CreatePost;
