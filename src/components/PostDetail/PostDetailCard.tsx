import React, { memo, useCallback } from "react";
import { Card, Box, Typography } from "@mui/material";
import PostHeader from "../Post/PostHeader";
import PostMedia from "../Post/PostMedia";
import PostActions from "../Post/PostActions";
import CommentInput from "../Post/CommentInput";
import CommentList from "./CommentList";
import { useLike } from "../../hooks/useLike";
import type { IPost } from "../../interface";
import { postDetailCardStyles } from "./styles";

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

  const handleShare = useCallback(async () => {
    const postUrl = `${window.location.origin}/posts/${post._id}`;
    const shareData = {
      title: 'Check out this post',
      text: post.caption || 'Check out this post',
      url: postUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(postUrl);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  }, [post._id, post.caption]);

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
    <Card sx={postDetailCardStyles.card}>
      <PostHeader user={post.user} createdAt={post.createdAt} post={post} />

      {post.media?.url && <PostMedia media={post.media} />}

      <PostActions
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        isLiked={post.isLikedByUser}
        isCommented={post.isCommentedByUser}
        onLike={onLike}
        onComment={handleViewComments}
        onShare={handleShare}
      />

      {post.caption && (
        <Box sx={postDetailCardStyles.captionContainer}>
          <Typography variant="body2">
            <Typography
              component="span"
              sx={postDetailCardStyles.captionUsername}
            >
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
