import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Card,
  Avatar,
  Typography,
  Button,
  TextField,
  IconButton,
  Skeleton,
} from "@mui/material";
import {
  EditOutlined as EditIcon,
  PhotoCameraOutlined as CameraIcon,
  SaveOutlined as SaveIcon,
  CloseOutlined as CloseIcon,
} from "@mui/icons-material";
import Navbar from "../../layouts/Navbar";
import { useProfile } from "../../hooks/useProfile";
import { getUserDisplayName } from "../../utils/user";

const Profile: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const { profile, loading, updateLoading, handleUpdateProfile } =
    useProfile(profileId);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isOwnProfile = !profileId;
  const displayName = getUserDisplayName(profile);

  React.useEffect(() => {
    if (profile && isEditing) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
    }
  }, [profile, isEditing]);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    },
    []
  );

  const handleEditToggle = useCallback(() => {
    if (isEditing) {
      setIsEditing(false);
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } else {
      setIsEditing(true);
    }
  }, [isEditing, previewUrl]);

  const handleSave = useCallback(async () => {
    const success = await handleUpdateProfile(
      firstName,
      lastName,
      selectedFile || undefined
    );
    if (success) {
      setIsEditing(false);
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  }, [firstName, lastName, selectedFile, handleUpdateProfile, previewUrl]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Card sx={{ p: 4, borderRadius: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="circular"
                width={120}
                height={120}
                sx={{ mb: 2 }}
              />
              <Skeleton variant="text" width={200} height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width={150} height={24} />
            </Box>
          </Card>
        </Container>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Card sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Profile not found
            </Typography>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "grey.50", minHeight: "calc(100vh - 64px)" }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ position: "relative", mb: 3 }}>
                <Avatar
                  src={previewUrl || profile.profilePhoto?.photo_url}
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: "primary.main",
                    fontSize: "2rem",
                    fontWeight: 600,
                  }}
                >
                  {!previewUrl &&
                    !profile.profilePhoto?.photo_url &&
                    displayName[0]}
                </Avatar>

                {isEditing && (
                  <>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      type="file"
                      onChange={handleFileSelect}
                    />
                    <label htmlFor="avatar-upload">
                      <IconButton
                        component="span"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          bgcolor: "primary.main",
                          color: "white",
                          width: 36,
                          height: 36,
                          "&:hover": {
                            bgcolor: "primary.dark",
                          },
                        }}
                      >
                        <CameraIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </label>
                  </>
                )}
              </Box>

              {isEditing ? (
                <Box sx={{ width: "100%", maxWidth: 400 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{ mb: 2 }}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ mb: 3 }}
                    variant="outlined"
                    size="small"
                  />

                  <Box
                    sx={{ display: "flex", gap: 2, justifyContent: "center" }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleEditToggle}
                      startIcon={<CloseIcon />}
                      disabled={updateLoading}
                      sx={{ minWidth: 100 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      startIcon={<SaveIcon />}
                      disabled={updateLoading}
                      sx={{ minWidth: 100 }}
                    >
                      {updateLoading ? "Saving..." : "Save"}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    sx={{ mb: 1, textAlign: "center" }}
                  >
                    {displayName}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {profile.email}
                  </Typography>

                  {isOwnProfile && (
                    <Button
                      variant="outlined"
                      onClick={handleEditToggle}
                      startIcon={<EditIcon />}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 500,
                        px: 3,
                      }}
                    >
                      Edit Profile
                    </Button>
                  )}
                </>
              )}
            </Box>

            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Member since{" "}
                {new Date(profile.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
