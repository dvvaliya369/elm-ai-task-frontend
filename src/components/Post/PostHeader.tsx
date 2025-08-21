import React, { memo } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import type { IPost, IUser } from "../../interface";
import { formatTime } from "../../utils/formatTime";
import PostMenu from "./PostMenu";
import { postHeaderStyles } from "./styles";

interface PostHeaderProps {
  user: IUser;
  createdAt: string;
  post: IPost;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, createdAt, post }) => {
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
      sx: postHeaderStyles.avatarWithInitials,
    };
  };

  const displayName = getDisplayName();

  return (
    <Box sx={postHeaderStyles.container}>
      <Avatar
        {...getAvatarProps()}
        alt={displayName}
        sx={{ ...postHeaderStyles.avatar, ...getAvatarProps().sx }}
      />

      <Box sx={postHeaderStyles.userInfo}>
        <Typography variant="subtitle2" sx={postHeaderStyles.username}>
          {displayName}
        </Typography>
        <Typography variant="caption" sx={postHeaderStyles.timestamp}>
          {formatTime(createdAt)}
        </Typography>
      </Box>

      <PostMenu post={post} />
    </Box>
  );
};

export default memo(PostHeader);
