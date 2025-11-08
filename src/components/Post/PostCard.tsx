import React, { memo } from "react";
import { Card } from "@mui/material";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import CommentInput from "./CommentInput";
import type { IPost } from "../../interface";
import { useLike } from "../../hooks/useLike";
import { useSharePost } from "../../hooks/useSharePost";
import { postCardStyles } from "./styles";

interface PostCardProps {
  post: IPost;
  onViewComments?: (postId: string) => void;
  onCardClick?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onViewComments,
  onCardClick,
  onShare,
}) => {
  const { handleLike } = useLike();
  const { sharePost } = useSharePost();
  const onLike = () => {
    handleLike?.(post._id);
  };

  const handleViewComments = () => {
    onViewComments?.(post._id);
  };

  const handleCardClick = () => {
    onCardClick?.(post._id);
  };

  const handleShare = () => {
    if (onShare) {
      onShare(post._id);
      return;
    }

    const authorName =
      post.user.fullName ||
      `${post.user.firstName || ""} ${post.user.lastName || ""}`.trim() ||
      "Unknown User";
    sharePost({
      postId: post._id,
      caption: post.caption,
      authorName,
    });
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

      {post.media && (
        <PostMedia media={post.media} handleCardClick={handleCardClick} />
      )}

      {post.media && (
        <PostActions
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          isLiked={post.isLikedByUser}
          isCommented={post.isCommentedByUser}
          onLike={onLike}
          onComment={handleViewComments}
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
          isLiked={post.isLikedByUser}
          isCommented={post.isCommentedByUser}
          onLike={onLike}
          onComment={handleViewComments}
          onShare={handleShare}
        />
      )}

      <CommentInput postId={post._id} />
    </Card>
  );
};

export default memo(PostCard);
