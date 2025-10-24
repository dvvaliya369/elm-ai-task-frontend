import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Button,
  Divider,
  Chip,
  Stack,
  Fade,
  Skeleton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Reply as ReplyIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { useSelector } from '../../store';
import { formatTime } from '../../utils/formatTime';
import type { IComment, IPost } from '../../interface';
import { commentsDetailStyles } from './styles';

interface CommentsDetailPageProps {}

// Enhanced Comment Item with reply functionality
const EnhancedCommentItem: React.FC<{
  comment: IComment;
  onReply: (commentId: string, userName: string) => void;
  onLike: (commentId: string) => void;
  isLiked: boolean;
  likesCount: number;
  level?: number;
}> = ({ comment, onReply, onLike, isLiked, likesCount, level = 0 }) => {
  const getAvatarProps = (user: IComment['user']) => {
    if (user.profilePhoto?.photo_url) {
      return { src: user.profilePhoto.photo_url };
    }
    return {
      children: comment.name[0].toUpperCase(),
      sx: commentsDetailStyles.avatarWithInitials,
    };
  };

  return (
    <Fade in timeout={300}>
      <Box sx={{ ...commentsDetailStyles.commentItem, ml: level * 3 }}>
        <Avatar
          {...getAvatarProps(comment.user)}
          sx={{
            ...commentsDetailStyles.commentAvatar,
            ...getAvatarProps(comment.user).sx,
          }}
        />
        
        <Box sx={commentsDetailStyles.commentContent}>
          <Box sx={commentsDetailStyles.commentHeader}>
            <Typography variant="subtitle2" sx={commentsDetailStyles.commentUsername}>
              {comment.name}
            </Typography>
            <Typography variant="caption" sx={commentsDetailStyles.commentTime}>
              {formatTime(comment.createdAt)}
            </Typography>
            <IconButton size="small" sx={commentsDetailStyles.commentMenu}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Typography variant="body2" sx={commentsDetailStyles.commentText}>
            {comment.comment}
          </Typography>
          
          <Box sx={commentsDetailStyles.commentActions}>
            <Button
              size="small"
              startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => onLike(comment._id)}
              sx={{
                ...commentsDetailStyles.actionButton,
                color: isLiked ? 'error.main' : 'text.secondary',
              }}
            >
              {likesCount > 0 && likesCount}
            </Button>
            <Button
              size="small"
              startIcon={<ReplyIcon />}
              onClick={() => onReply(comment._id, comment.name)}
              sx={commentsDetailStyles.actionButton}
            >
              Reply
            </Button>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

const CommentsDetailPage: React.FC<CommentsDetailPageProps> = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  // Mock state - in real app, this would come from Redux store
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular'>('all');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockPost: IPost = {
        _id: postId || '1',
        user: {
          _id: '1',
          fullName: 'John Doe',
          profilePhoto: {
            photo_url: 'https://via.placeholder.com/150'
          }
        },
        caption: 'This is a sample post with lots of interesting comments!',
        createdAt: '2024-10-20T10:00:00Z',
        updatedAt: '2024-10-20T10:00:00Z',
        likesCount: 42,
        commentsCount: 15,
        likes: [],
        isLikedByUser: false,
        isCommentedByUser: true
      };

      const mockComments: IComment[] = [
        {
          _id: '1',
          user: {
            _id: '2',
            profilePhoto: {
              photo_url: 'https://via.placeholder.com/100'
            }
          },
          name: 'Alice Smith',
          comment: 'Great post! Really enjoyed reading this.',
          createdAt: '2024-10-20T11:00:00Z',
          updatedAt: '2024-10-20T11:00:00Z'
        },
        {
          _id: '2',
          user: {
            _id: '3',
          },
          name: 'Bob Johnson',
          comment: 'I completely agree with your perspective. This is exactly what I was thinking about yesterday.',
          createdAt: '2024-10-20T12:00:00Z',
          updatedAt: '2024-10-20T12:00:00Z'
        },
        {
          _id: '3',
          user: {
            _id: '4',
            profilePhoto: {
              photo_url: 'https://via.placeholder.com/100'
            }
          },
          name: 'Carol Davis',
          comment: 'Thanks for sharing! Could you elaborate more on the second point?',
          createdAt: '2024-10-20T13:00:00Z',
          updatedAt: '2024-10-20T13:00:00Z'
        },
        {
          _id: '4',
          user: {
            _id: '5',
          },
          name: 'David Wilson',
          comment: 'Interesting perspective. I have a different view on this topic though.',
          createdAt: '2024-10-20T14:00:00Z',
          updatedAt: '2024-10-20T14:00:00Z'
        },
        {
          _id: '5',
          user: {
            _id: '6',
            profilePhoto: {
              photo_url: 'https://via.placeholder.com/100'
            }
          },
          name: 'Eva Martinez',
          comment: 'Love this! Sharing with my team 🚀',
          createdAt: '2024-10-20T15:00:00Z',
          updatedAt: '2024-10-20T15:00:00Z'
        }
      ];

      setPost(mockPost);
      setComments(mockComments);
      setLoading(false);
    }, 1000);
  }, [postId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: IComment = {
      _id: Date.now().toString(),
      user: {
        _id: user?._id || 'current-user',
        profilePhoto: user?.profilePhoto
      },
      name: user?.fullName || user?.firstName + ' ' + user?.lastName || 'Anonymous',
      comment: replyTo ? `@${replyTo.name} ${newComment}` : newComment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setReplyTo(null);
  };

  const handleReply = (commentId: string, userName: string) => {
    setReplyTo({ id: commentId, name: userName });
    setNewComment(`@${userName} `);
  };

  const handleLikeComment = (commentId: string) => {
    const newLikedComments = new Set(likedComments);
    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);
  };

  const filteredComments = comments.filter(() => {
    // Add filtering logic here based on filter state
    return true;
  });

  if (loading) {
    return (
      <Box sx={commentsDetailStyles.container}>
        <Card sx={commentsDetailStyles.card}>
          <CardContent>
            <Box sx={commentsDetailStyles.header}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Skeleton width="60%" height={24} />
                <Skeleton width="40%" height={20} />
              </Box>
            </Box>
            
            <Skeleton height={60} sx={{ my: 2 }} />
            
            {[...Array(3)].map((_, index) => (
              <Box key={index} sx={commentsDetailStyles.commentItem}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ ml: 1, flex: 1 }}>
                  <Skeleton width="30%" height={20} />
                  <Skeleton width="80%" height={20} />
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={commentsDetailStyles.container}>
      <Card sx={commentsDetailStyles.card}>
        <CardContent>
          {/* Header */}
          <Box sx={commentsDetailStyles.header}>
            <IconButton onClick={handleBack} sx={commentsDetailStyles.backButton}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={commentsDetailStyles.title}>
              Comments ({comments.length})
            </Typography>
            <IconButton sx={commentsDetailStyles.filterButton}>
              <FilterListIcon />
            </IconButton>
          </Box>

          {/* Post Info */}
          {post && (
            <Box sx={commentsDetailStyles.postInfo}>
              <Avatar
                src={post.user.profilePhoto?.photo_url}
                sx={commentsDetailStyles.postAvatar}
              >
                {post.user.fullName?.[0]}
              </Avatar>
              <Box sx={commentsDetailStyles.postContent}>
                <Typography variant="subtitle2" sx={commentsDetailStyles.postUsername}>
                  {post.user.fullName}
                </Typography>
                <Typography variant="body2" sx={commentsDetailStyles.postCaption}>
                  {post.caption}
                </Typography>
                <Typography variant="caption" sx={commentsDetailStyles.postTime}>
                  {formatTime(post.createdAt)}
                </Typography>
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Filter Chips */}
          <Stack direction="row" spacing={1} sx={commentsDetailStyles.filterChips}>
            {(['all', 'recent', 'popular'] as const).map((filterType) => (
              <Chip
                key={filterType}
                label={filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                variant={filter === filterType ? 'filled' : 'outlined'}
                size="small"
                onClick={() => setFilter(filterType)}
                sx={commentsDetailStyles.filterChip}
              />
            ))}
          </Stack>

          {/* Comments List */}
          <Box sx={commentsDetailStyles.commentsList}>
            {filteredComments.map((comment) => (
              <EnhancedCommentItem
                key={comment._id}
                comment={comment}
                onReply={handleReply}
                onLike={handleLikeComment}
                isLiked={likedComments.has(comment._id)}
                likesCount={Math.floor(Math.random() * 20)} // Mock likes count
              />
            ))}
          </Box>

          {/* Comment Input */}
          <Box sx={commentsDetailStyles.commentInput}>
            {replyTo && (
              <Box sx={commentsDetailStyles.replyBanner}>
                <Typography variant="caption" sx={commentsDetailStyles.replyText}>
                  Replying to @{replyTo.name}
                </Typography>
                <Button
                  size="small"
                  onClick={() => {
                    setReplyTo(null);
                    setNewComment('');
                  }}
                  sx={commentsDetailStyles.cancelReply}
                >
                  Cancel
                </Button>
              </Box>
            )}
            
            <Box sx={commentsDetailStyles.inputContainer}>
              <Avatar
                src={user?.profilePhoto?.photo_url}
                sx={commentsDetailStyles.inputAvatar}
              >
                {user?.fullName?.[0]}
              </Avatar>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                size="small"
                sx={commentsDetailStyles.textField}
              />
              <IconButton
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                sx={commentsDetailStyles.sendButton}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommentsDetailPage;
