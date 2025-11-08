import {
  type GridColDef,
  type GridRenderCellParams,
  getGridStringOperators,
  getGridNumericOperators
} from "@mui/x-data-grid";
import { Box, Typography, IconButton, Avatar, Chip } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  IosShare as ShareIcon,
} from "@mui/icons-material";

interface PostColumnsProps {
  handleView: (postId: string) => void;
  handleEdit: (postId: string) => void;
  handleDelete: (postId: string) => void;
  handleShare: (postId: string) => void;
}

export const createPostColumns = ({
  handleView,
  handleEdit,
  handleDelete,
  handleShare,
}: PostColumnsProps): GridColDef[] => [
  {
    field: "media",
    headerName: "Media",
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        {params.row.media?.url ? (
          params.row.media.mediaType === "video" ? (
            <Box
              component="video"
              src={params.row.media.url}
              sx={{
                width: 50,
                height: 50,
                borderRadius: 1,
                objectFit: "cover",
              }}
              muted
            />
          ) : (
            <Avatar
              src={params.row.media.url}
              variant="rounded"
              sx={{ width: 50, height: 50 }}
            />
          )
        ) : (
          <Avatar variant="rounded" sx={{ width: 50, height: 50 }}>
            📝
          </Avatar>
        )}
      </Box>
    ),
  },
  {
    field: "caption",
    headerName: "Caption",
    width: 300,
    sortable: false,
    filterOperators: getGridStringOperators().filter(
      (operator) => !["isEmpty", "isNotEmpty", "isAnyOf"].includes(operator.value)
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        variant="body2"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {params.value || "No caption"}
      </Typography>
    ),
  },
  {
    field: "likesCount",
    headerName: "Likes",
    width: 100,
    type: "number",
    sortable: false,
    filterable: true,
    filterOperators: getGridNumericOperators().filter(
      (operator) => !["isEmpty", "isNotEmpty", "isAnyOf"].includes(operator.value)
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        icon={<FavoriteIcon />}
        label={params.value || 0}
        size="small"
        color="primary"
        variant="outlined"
      />
    ),
  },
  {
    field: "commentsCount",
    headerName: "Comments",
    width: 120,
    type: "number",
    sortable: false,
    filterable: true,
    filterOperators: getGridNumericOperators().filter(
      (operator) => !["isEmpty", "isNotEmpty", "isAnyOf"].includes(operator.value)
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        icon={<CommentIcon />}
        label={params.value || 0}
        size="small"
        color="secondary"
        variant="outlined"
      />
    ),
  },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
    type: "date",
    sortable: true,
    filterable: false,
    valueGetter: (params) => new Date(params),
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2">
        {new Date(params.value).toLocaleDateString()}
      </Typography>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={() => handleView(params.row.id)}
          color="primary"
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleEdit(params.row.id)}
          color="secondary"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleShare(params.row.id)}
          color="primary"
        >
          <ShareIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDelete(params.row.id)}
          color="error"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
  },
];
