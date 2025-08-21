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
import { profileStyles } from "./styles";

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
        <Container maxWidth="md" sx={profileStyles.loadingContainer}>
          <Card sx={profileStyles.loadingCard}>
            <Box sx={profileStyles.loadingProfile}>
              <Skeleton
                variant="circular"
                width={120}
                height={120}
                sx={profileStyles.loadingSkeleton}
              />
              <Skeleton variant="text" width={200} height={32} sx={profileStyles.loadingSkeletonName} />
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
        <Container maxWidth="md" sx={profileStyles.notFoundContainer}>
          <Card sx={profileStyles.notFoundCard}>
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
      <Box sx={profileStyles.mainBackground}>
        <Container maxWidth="md" sx={profileStyles.mainContainer}>
          <Card sx={profileStyles.mainCard}>
            <Box sx={profileStyles.profileHeader}>
              <Box sx={profileStyles.avatarContainer}>
                <Avatar
                  src={previewUrl || profile.profilePhoto?.photo_url}
                  sx={profileStyles.avatar}
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
                        sx={profileStyles.cameraButton}
                      >
                        <CameraIcon sx={profileStyles.cameraIcon} />
                      </IconButton>
                    </label>
                  </>
                )}
              </Box>

              {isEditing ? (
                <Box sx={profileStyles.editFormContainer}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={profileStyles.firstNameField}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={profileStyles.lastNameField}
                    variant="outlined"
                    size="small"
                  />

                  <Box sx={profileStyles.buttonContainer}>
                    <Button
                      variant="outlined"
                      onClick={handleEditToggle}
                      startIcon={<CloseIcon />}
                      disabled={updateLoading}
                      sx={profileStyles.cancelButton}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      startIcon={<SaveIcon />}
                      disabled={updateLoading}
                      sx={profileStyles.saveButton}
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
                    sx={profileStyles.profileName}
                  >
                    {displayName}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={profileStyles.profileEmail}
                  >
                    {profile.email}
                  </Typography>

                  {isOwnProfile && (
                    <Button
                      variant="outlined"
                      onClick={handleEditToggle}
                      startIcon={<EditIcon />}
                      sx={profileStyles.editButton}
                    >
                      Edit Profile
                    </Button>
                  )}
                </>
              )}
            </Box>

            <Box sx={profileStyles.postsSection}
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
