import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Navbar } from "../../layouts";
import { PostCard, PostSkeleton } from "../../components/Post";
import { usePosts } from "../../hooks/usePosts";

const Home = () => {
  const navigate = useNavigate();
  const { posts, pagination, loading, error, fetchPosts } = usePosts();
  const currentPageRef = useRef(1);
  const isLoadingMoreRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  const handleViewComments = useCallback((postId: string) => {
    navigate(`/posts/${postId}`);
  }, [navigate]);

  const loadPosts = useCallback((page: number, append = false) => {
    if (isLoadingMoreRef.current) return;

    isLoadingMoreRef.current = true;

    fetchPosts({
      page,
      limit: 15,
    }, append);

    setTimeout(() => {
      isLoadingMoreRef.current = false;
    }, 1000);
  }, [fetchPosts]);

  const loadMorePosts = useCallback(() => {
    if (!pagination?.hasNextPage || loading || isLoadingMoreRef.current) return;

    const nextPage = currentPageRef.current + 1;
    currentPageRef.current = nextPage;
    loadPosts(nextPage, true);
  }, [pagination?.hasNextPage, loading, loadPosts]);

  useEffect(() => {
    currentPageRef.current = 1;
    loadPosts(1);
  }, [loadPosts]);

  useEffect(() => {
    const trigger = loadMoreTriggerRef.current;
    if (!trigger) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(trigger);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMorePosts]);

  if (error && posts.length === 0) {
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
            Failed to load posts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error}
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
          maxWidth: 500,
          width: '100%',
          mx: 'auto',
          px: { xs: 1, sm: 2 },
          py: 2,
        }}
      >
        {loading && posts.length === 0 ? (
          Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        ) : (
          <>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onViewComments={handleViewComments}
                onCardClick={handleViewComments}
              />
            ))}

            {pagination?.hasNextPage && (
              <Box
                ref={loadMoreTriggerRef}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  py: 3,
                }}
              >
                {loading && (
                  <CircularProgress size={24} />
                )}
              </Box>
            )}

            {posts.length === 0 && !loading && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 300,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No posts found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Be the first to share something!
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
