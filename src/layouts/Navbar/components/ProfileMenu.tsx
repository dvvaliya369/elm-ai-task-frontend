import {
  AddBoxOutlined as AddIcon,
  HomeOutlined as HomeIcon,
  LogoutOutlined as LogoutIcon,
  PersonOutlined as PersonIcon,
  SearchOutlined as SearchIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import type { IUser } from "../../../interface";

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  user: IUser | null;
  isAuthenticated: boolean;
  isMobile: boolean;
  onNavigation: (path: string) => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  open,
  onClose,
  user,
  isAuthenticated,
  isMobile,
  onNavigation,
  onLogin,
  onSignup,
  onLogout,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    sx={{
      mt: 1,
      "& .MuiPaper-root": {
        minWidth: 220,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
    }}
  >
    {isAuthenticated ? (
      <React.Fragment>
        <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt={user?.fullName || "User"}
              sx={{ width: 40, height: 40, bgcolor: "primary.main" }}
            >
              {user?.fullName?.[0] || "U"}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {user?.fullName || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />

        {isMobile && (
          <React.Fragment>
            <MenuItem
              onClick={() => onNavigation("/")}
              sx={{
                py: 1.5,
                "&:hover": { bgcolor: "rgba(25, 118, 210, 0.08)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <HomeIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontFamily:
                      '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 500,
                  },
                }}
              />
            </MenuItem>
            <MenuItem
              onClick={onClose}
              sx={{
                py: 1.5,
                "&:hover": { bgcolor: "rgba(25, 118, 210, 0.08)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <SearchIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary="Search"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontFamily:
                      '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 500,
                  },
                }}
              />
            </MenuItem>
            {isAuthenticated && (
              <MenuItem
                onClick={onClose}
                sx={{
                  py: 1.5,
                  "&:hover": { bgcolor: "rgba(25, 118, 210, 0.08)" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AddIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Create"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontFamily:
                        '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 500,
                    },
                  }}
                />
              </MenuItem>
            )}
            <Divider sx={{ my: 1 }} />
          </React.Fragment>
        )}

        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={onLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </React.Fragment>
    ) : (
      <React.Fragment>
        {isMobile && (
          <React.Fragment>
            <MenuItem onClick={() => onNavigation("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem onClick={onClose}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText>Search</ListItemText>
            </MenuItem>
            <Divider />
          </React.Fragment>
        )}

        <Box sx={{ px: 2, py: 1.5 }}>
          <Button
            fullWidth
            variant="text"
            onClick={onLogin}
            sx={{
              color: "text.primary",
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 500,
              py: 1,
              borderRadius: 1.5,
              textTransform: "none",
              justifyContent: "flex-start",
              mb: 1,
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onSignup}
            sx={{
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 500,
              py: 1,
              borderRadius: 1.5,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.24)",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </React.Fragment>
    )}
  </Menu>
);

export default memo(ProfileMenu);
