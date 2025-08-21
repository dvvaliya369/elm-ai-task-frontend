import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import {
  MoreVertOutlined as MoreVertIcon,
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "../../store";
import { deletePost } from "../../service/post.service";
import { useToast } from "../../hooks/useToast";
import type { IPost } from "../../interface";
import { postMenuStyles } from "./styles";

interface PostMenuProps {
  post: IPost;
}

const PostMenu: React.FC<PostMenuProps> = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { deletePostLoading } = useSelector((state) => state.posts);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isOwner = user?._id === post.user._id;
  const isDeleting = deletePostLoading[post._id] || false;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setAnchorEl(null);
  };

  const handleEdit = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    handleMenuClose();
    navigate(`/posts/update/${post._id}`);
  };

  const handleDeleteClick = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    try {
      const result = await dispatch(deletePost({ postId: post._id }));

      if (deletePost.fulfilled.match(result)) {
        showSuccess("Post deleted successfully!");
        setDeleteDialogOpen(false);
      } else {
        showError((result.payload as string) || "Failed to delete post");
      }
    } catch {
      showError("Failed to delete post");
    }
  };

  const handleDeleteCancel = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setDeleteDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  if (!isOwner) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        sx={postMenuStyles.menuButton}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(event: React.MouseEvent) => {
          handleMenuClose(event);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Post</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleDeleteClick}
          sx={postMenuStyles.deleteMenuItem}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={postMenuStyles.deleteIcon} />
          </ListItemIcon>
          <ListItemText>Delete Post</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostMenu;
