import React, { memo, useCallback, useState } from "react";
import { Card, Box, Typography, Snackbar, Alert } from "@mui/material";
import PostHeader from "../Post/PostHeader";
import PostMedia from "../Post/PostMedia";
import PostActions from "../Post/PostActions";
import CommentInput from "../Post/CommentInput";
import CommentList from "./CommentList";
import { useLike } from "../../hooks/useLike";
import { useRepost } from "../../hooks/useRepost";
import type { IPost } from "../../interface";
import { postDetailCardStyles } from "./styles";

interface PostDetailCardProps {
  post: IPost;
}

const PostDetailCard: React.FC<PostDetailCardProps> = ({ post }) => {
  const { handleLike } = useLike();
  const { handleRepost } = useRepost();
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  const onLike = useCallback(() => {
    handleLike(post._id);
  }, [handleLike, post._id]);

  const onRepost = useCallback(() => {
    handleRepost(post._id);
  }, [handleRepost, post._id]);

  const handleViewComments = useCallback(() => {
    // Already on detail page, do nothing
  }, []);

  const handleShare = useCallback(async () => {
    const postUrl = `${window.location.origin}/posts/${post._id}`;
    
    try {
      // Try to use Web Share API if available (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this post',
          text: post.caption || 'Check out this post',
          url: postUrl,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(postUrl);
        setShowShareSuccess(true);
      }
    } catch (error) {
      // User cancelled share or clipboard failed
      console.error('Error sharing:', error);
    }
  }, [post._id, post.caption]);

  const handleCloseSnackbar = useCallback(() => {
    setShowShareSuccess(false);
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
    <Card sx={postDetailCardStyles.card}>
      <PostHeader user={post.user} createdAt={post.createdAt} post={post} />

      {post.media?.url && <PostMedia media={post.media} />}

      <PostActions
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        repostsCount={post.repostsCount}
        viewsCount={post.viewsCount}
        isLiked={post.isLikedByUser}
        isCommented={post.isCommentedByUser}
        isReposted={post.isRepostedByUser}
        onLike={onLike}
        onComment={handleViewComments}
        onRepost={onRepost}
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

      <Snackbar
        open={showShareSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default memo(PostDetailCard);
