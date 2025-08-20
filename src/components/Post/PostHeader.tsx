import React, { memo } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import type { IUser } from "../../interface";
import { formatTime } from "../../utils/formatTime";

interface PostHeaderProps {
  user: IUser;
  createdAt: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, createdAt }) => {

  const getDisplayName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) return user.firstName;
    return "Unknown User";
  };

  const getAvatarProps = () => {
    if (user?.profilePhoto?.photo_url) {
      return { src: user.profilePhoto.photo_url };
    }

    const displayName = getDisplayName();
    const initials = displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return {
      children: initials,
      sx: {
        bgcolor: "primary.main",
        color: "white",
      },
    };
  };

  const displayName = getDisplayName();

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 2, pb: 1 }}>
      <Avatar
        {...getAvatarProps()}
        alt={displayName}
        sx={{ width: 40, height: 40, mr: 2, ...getAvatarProps().sx }}
      />

      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          {displayName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatTime(createdAt)}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(PostHeader);
