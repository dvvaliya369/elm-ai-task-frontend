import { useEffect, memo, useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  DataGrid,
  type GridFilterModel,
  type GridSortModel,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";
import { getUserPosts, deletePost } from "../../service/post.service";
import api from "../../service";
import type { AppDispatch, RootState } from "../../store";
import type { IPost } from "../../interface";
import { useToast } from "../../hooks/useToast";
import { myPostsStyles } from "./styles";
import { createPostColumns } from "../../pages/my-posts/postColumns";
import { debounce } from "../../utils";
import DeleteConfirmDialog from "../DeleteConfirmDialog";

const MyPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { userPosts, userPostsLoading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [currentFilters, setCurrentFilters] = useState<GridFilterModel>({
    items: [],
  });
  const [currentSort, setCurrentSort] = useState<GridSortModel>([
    { field: "createdAt", sort: "desc" },
  ]);

  const [isDebouncing, setIsDebouncing] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserPosts(user._id));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (userPosts && Array.isArray(userPosts)) {
      setFilteredPosts(userPosts);
      setTotalRows(userPosts.length);
    }
  }, [userPosts]);

  const handleView = useCallback(
    (postId: string) => {
      navigate(`/posts/${postId}`);
    },
    [navigate]
  );

  const handleEdit = useCallback(
    (postId: string) => {
      navigate(`/posts/update/${postId}`);
    },
    [navigate]
  );

  const handleDelete = useCallback((postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  }, []);

  const fetchPostsWithFiltersAndSort = useCallback(
    async (
      filters: GridFilterModel,
      sorts: GridSortModel,
      page: number = 0,
      pageSize: number = 10,
      reason: string = "filter/sort change"
    ) => {
      if (!user?._id) {
        showError("User not found");
        return null;
      }

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", String(page + 1));
        queryParams.append("limit", String(pageSize));

        const validFilters = filters.items.filter((filter) => {
          return (
            filter.value !== undefined &&
            filter.value !== null &&
            filter.value !== "" &&
            filter.field &&
            filter.operator
          );
        });

        // Convert filters to array format
        const filtersArray = validFilters.map((filter) => ({
          field: filter.field,
          operator: filter.operator,
          value: filter.value,
        }));

        if (filtersArray.length > 0) {
          const filtersString = JSON.stringify(filtersArray);
          queryParams.append("filters", encodeURIComponent(filtersString));
        }

        if (sorts.length > 0) {
          queryParams.append("sortBy", sorts[0].field);
          queryParams.append("sortOrder", sorts[0].sort || "desc");
        }

        const response = await api.get(
          `/post/user/${user._id}?${queryParams.toString()}`
        );
        const data = response.data;

        if (data.success && data.data && data.data.posts) {
          setFilteredPosts(data.data.posts);
          setTotalRows(
            data.data.pagination?.totalPosts || data.data.posts.length
          );
          return data.data.posts;
        } else {
          showError(data.message || "Failed to fetch posts");
          return null;
        }
      } catch {
        showError(`Failed to apply ${reason}`);
        return null;
      }
    },
    [user?._id, showError]
  );

  const debouncedFetchPosts = useMemo(
    () =>
      debounce(
        async (
          filters: GridFilterModel,
          sorts: GridSortModel,
          page: number = 0,
          pageSize: number = 10,
          reason: string = "filter/sort change"
        ) => {
          setIsDebouncing(true);
          try {
            await fetchPostsWithFiltersAndSort(
              filters,
              sorts,
              page,
              pageSize,
              reason
            );
          } finally {
            setIsDebouncing(false);
          }
        },
        500
      ),
    [fetchPostsWithFiltersAndSort]
  );

  useEffect(() => {
    if (user?._id) {
      debouncedFetchPosts(
        currentFilters,
        currentSort,
        paginationModel.page,
        paginationModel.pageSize,
        "initial load"
      );
    }
  }, [
    user?._id,
    debouncedFetchPosts,
    currentFilters,
    currentSort,
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  const handleFilterChange = useCallback(
    (filterModel: GridFilterModel) => {
      setCurrentFilters(filterModel);
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
      debouncedFetchPosts(
        filterModel,
        currentSort,
        0,
        paginationModel.pageSize,
        "filter change"
      );
    },
    [currentSort, debouncedFetchPosts, paginationModel.pageSize]
  );

  const handleSortChange = useCallback(
    (sortModel: GridSortModel) => {
      setCurrentSort(sortModel);
      debouncedFetchPosts(
        currentFilters,
        sortModel,
        paginationModel.page,
        paginationModel.pageSize,
        "sort change"
      );
    },
    [
      currentFilters,
      debouncedFetchPosts,
      paginationModel.page,
      paginationModel.pageSize,
    ]
  );

  const handlePaginationChange = useCallback(
    (newPaginationModel: { page: number; pageSize: number }) => {
      setPaginationModel(newPaginationModel);
      debouncedFetchPosts(
        currentFilters,
        currentSort,
        newPaginationModel.page,
        newPaginationModel.pageSize,
        "pagination change"
      );
    },
    [currentFilters, currentSort, debouncedFetchPosts]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!postToDelete) return;

    try {
      const result = await dispatch(deletePost({ postId: postToDelete }));
      if (deletePost.fulfilled.match(result)) {
        showSuccess("Post deleted successfully");
        setDeleteDialogOpen(false);
        setPostToDelete(null);
        debouncedFetchPosts(
          currentFilters,
          currentSort,
          paginationModel.page,
          paginationModel.pageSize,
          "post deleted"
        );
      } else {
        showError((result.payload as string) || "Failed to delete post");
      }
    } catch {
      showError("Failed to delete post");
    }
  }, [
    postToDelete,
    dispatch,
    showSuccess,
    showError,
    debouncedFetchPosts,
    currentFilters,
    currentSort,
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  }, []);

  const columns = createPostColumns({
    handleView,
    handleEdit,
    handleDelete,
  });

  const rows = Array.isArray(filteredPosts)
    ? filteredPosts.map((post: IPost) => ({
        id: post._id,
        media: post.media,
        caption: post.caption,
        likesCount: post.likesCount,
        commentsCount: post.commentsCount,
        createdAt: post.createdAt,
      }))
    : [];

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

  if (!Array.isArray(userPosts) || userPosts.length === 0) {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={myPostsStyles.title}>
          My Posts ({Array.isArray(userPosts) ? userPosts.length : 0})
        </Typography>
      </Box>
      <Box sx={myPostsStyles.dataGridContainer}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={userPostsLoading || isDebouncing}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          paginationMode="server"
          rowCount={totalRows}
          initialState={{
            sorting: {
              sortModel: [{ field: "createdAt", sort: "desc" }],
            },
          }}
          disableRowSelectionOnClick
          onFilterModelChange={handleFilterChange}
          onSortModelChange={handleSortChange}
        />
      </Box>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default memo(MyPosts);
