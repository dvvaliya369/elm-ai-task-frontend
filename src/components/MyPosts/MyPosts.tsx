import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { getUserPosts } from "../../service/post.service";
import type { AppDispatch, RootState } from "../../store";
import PostGridItem from "./PostGridItem";
import { myPostsStyles } from "./styles";

const MyPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userPosts, userPostsLoading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserPosts(user._id));
    }
  }, [dispatch, user?._id]);

  if (userPostsLoading) {
    return (
      <Box sx={myPostsStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={myPostsStyles.errorContainer}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (userPosts.length === 0) {
    return (
      <Box sx={myPostsStyles.emptyStateContainer}>
        <Typography variant="h6" color="text.secondary">
          No posts yet
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={myPostsStyles.emptyStateSubtitle}
        >
          Start sharing your moments!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={myPostsStyles.container}>
      <Typography variant="h5" sx={myPostsStyles.title}>
        My Posts
      </Typography>
      <Grid container spacing={myPostsStyles.gridContainer.spacing}>
        {userPosts.map((post) => (
          <Grid size={{ xs: 6, sm: 6, md: 4 }} key={post._id}>
            <PostGridItem post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(MyPosts);
