import { useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Navbar } from "../../layouts";
import { PostDetailCard, PostDetailSkeleton } from "../../components/PostDetail";
import { useSelector, useDispatch } from "../../store";
import { getPostById } from "../../service/post.service";
import { clearSinglePost } from "../../store/postSlice";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singlePost, singlePostLoading, singlePostError } = useSelector((state) => state.posts);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (postId) {
      dispatch(getPostById({ postId }));
    }

    return () => {
      dispatch(clearSinglePost());
    };
  }, [dispatch, postId]);

  if (singlePostError) {
    return (
      <Box>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
            px: 2,
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            Failed to load post
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singlePostError}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          maxWidth: 600,
          width: '100%',
          mx: 'auto',
          px: { xs: 1, sm: 2 },
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBack} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            Post
          </Typography>
        </Box>

        {singlePostLoading && !singlePost ? (
          <PostDetailSkeleton />
        ) : singlePost ? (
          <PostDetailCard post={singlePost} />
        ) : null}
      </Box>
    </Box>
  );
};

export default PostDetail;
