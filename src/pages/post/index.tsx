import { useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Navbar } from "../../layouts";
import { PostDetailCard, PostDetailSkeleton } from "../../components/PostDetail";
import { useSelector, useDispatch } from "../../store";
import { getPostById } from "../../service/post.service";
import { clearSinglePost } from "../../store/postSlice";
import { postStyles } from "./styles";

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
        <Box sx={postStyles.errorContainer}>
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
      <Box sx={postStyles.mainContainer}>
        <Box sx={postStyles.headerContainer}>
          <IconButton onClick={handleBack} sx={postStyles.backButton}>
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
