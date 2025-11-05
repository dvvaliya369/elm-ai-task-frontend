import React, { memo, useState } from "react";
import { Card, Snackbar, Alert } from "@mui/material";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import CommentInput from "./CommentInput";
import type { IPost } from "../../interface";
import { useLike } from "../../hooks/useLike";
import { useRepost } from "../../hooks/useRepost";
import { postCardStyles } from "./styles";

interface PostCardProps {
  post: IPost;
  onViewComments?: (postId: string) => void;
  onCardClick?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onViewComments,
  onCardClick,
}) => {
  const { handleLike } = useLike();
  const { handleRepost } = useRepost();
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  
  const onLike = () => {
    handleLike?.(post._id);
  };

  const onRepost = () => {
    handleRepost?.(post._id);
  };

  const handleViewComments = () => {
    onViewComments?.(post._id);
  };

  const handleCardClick = () => {
    onCardClick?.(post._id);
  };

  const handleShare = async () => {
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
  };

  const handleCloseSnackbar = () => {
    setShowShareSuccess(false);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        ...postCardStyles.card,
        ...(onCardClick
          ? postCardStyles.cardClickable
          : postCardStyles.cardDefault),
      }}
    >
      <PostHeader user={post.user} createdAt={post.createdAt} post={post} />

      {post.media && <PostMedia media={post.media} handleCardClick={handleCardClick} />}

      {post.media && (
        <PostActions
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          repostsCount={post.repostsCount}
          isLiked={post.isLikedByUser}
          isCommented={post.isCommentedByUser}
          isReposted={post.isRepostedByUser}
          onLike={onLike}
          onComment={handleViewComments}
          onRepost={onRepost}
          onShare={handleShare}
        />
      )}

      <PostCaption
        username={
          post.user.fullName ||
          `${post.user.firstName || ""} ${post.user.lastName || ""}`.trim() ||
          "Unknown User"
        }
        caption={post.caption}
        commentsCount={post.commentsCount}
        onViewComments={handleViewComments}
      />

      {!post.media && (
        <PostActions
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          repostsCount={post.repostsCount}
          isLiked={post.isLikedByUser}
          isCommented={post.isCommentedByUser}
          isReposted={post.isRepostedByUser}
          onLike={onLike}
          onComment={handleViewComments}
          onRepost={onRepost}
          onShare={handleShare}
        />
      )}

      <CommentInput postId={post._id} />

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

export default memo(PostCard);
