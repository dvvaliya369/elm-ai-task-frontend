import React, { memo, useCallback } from "react";
import { Card, Box, Typography } from "@mui/material";
import PostHeader from "../Post/PostHeader";
import PostMedia from "../Post/PostMedia";
import PostActions from "../Post/PostActions";
import CommentInput from "../Post/CommentInput";
import CommentList from "./CommentList";
import { useLike } from "../../hooks/useLike";
import type { IPost } from "../../interface";

interface PostDetailCardProps {
  post: IPost;
}

const PostDetailCard: React.FC<PostDetailCardProps> = ({ post }) => {
  const { handleLike } = useLike();

  const onLike = useCallback(() => {
    handleLike(post._id);
  }, [handleLike, post._id]);

  const handleViewComments = useCallback(() => {
    // Already on detail page, do nothing
  }, []);

  const getUserDisplayName = (user: {
    fullName?: string;
    firstName?: string;
    lastName?: string;
  }) => {
    if (user.fullName) return user.fullName;
    if (user.firstName && user.lastName)
      return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    return "Unknown User";
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <PostHeader user={post.user} createdAt={post.createdAt} post={post}/>

      {post.media?.url && <PostMedia media={post.media} />}

      <PostActions
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        isLiked={post.isLikedByUser}
        isCommented={post.isCommentedByUser}
        onLike={onLike}
        onComment={handleViewComments}
      />

      {post.caption && (
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="body2">
            <Typography component="span" fontWeight={600} sx={{ mr: 1 }}>
              {getUserDisplayName(post.user)}
            </Typography>
            {post.caption}
          </Typography>
        </Box>
      )}

      <CommentInput postId={post._id} />

      {post.comments && post.comments.length > 0 && (
        <CommentList comments={post.comments} postId={post._id} />
      )}
    </Card>
  );
};

export default memo(PostDetailCard);
