import {
  AddBoxOutlined as AddIcon,
  HomeOutlined as HomeIcon,
  LogoutOutlined as LogoutIcon,
  PersonOutlined as PersonIcon,
  GridViewOutlined as PostsIcon,
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
import { navbarComponentStyles } from "./styles";

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
    sx={navbarComponentStyles.profileMenu}
  >
    {isAuthenticated ? (
      <React.Fragment>
        <Box sx={navbarComponentStyles.profileHeader}>
          <Box sx={navbarComponentStyles.profileInfo}>
            <Avatar
              alt={user?.fullName || "User"}
              sx={navbarComponentStyles.profileAvatar}
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
              sx={navbarComponentStyles.menuItem}
            >
              <ListItemIcon sx={navbarComponentStyles.menuItemIcon}>
                <HomeIcon sx={navbarComponentStyles.menuItemIconSmall} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={navbarComponentStyles.menuItemText}
              />
            </MenuItem>
            {isAuthenticated && (
              <MenuItem
                onClick={() => onNavigation("/posts/create")}
                sx={navbarComponentStyles.menuItem}
              >
                <ListItemIcon sx={navbarComponentStyles.menuItemIcon}>
                  <AddIcon sx={navbarComponentStyles.menuItemIconSmall} />
                </ListItemIcon>
                <ListItemText
                  primary="Create"
                  sx={navbarComponentStyles.menuItemText}
                />
              </MenuItem>
            )}
            <Divider sx={navbarComponentStyles.menuDivider} />
          </React.Fragment>
        )}

        <MenuItem onClick={() => onNavigation("/profile")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onNavigation("/my-posts")}>
          <ListItemIcon>
            <PostsIcon />
          </ListItemIcon>
          <ListItemText>My Posts</ListItemText>
        </MenuItem>
        <MenuItem onClick={onLogout} sx={navbarComponentStyles.logoutMenuItem}>
          <ListItemIcon>
            <LogoutIcon sx={navbarComponentStyles.logoutIcon} />
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
            <Divider />
          </React.Fragment>
        )}

        <Box sx={navbarComponentStyles.authButtonContainer}>
          <Button
            fullWidth
            variant="text"
            onClick={onLogin}
            sx={navbarComponentStyles.loginButton}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onSignup}
            sx={navbarComponentStyles.signupButton}
          >
            Sign Up
          </Button>
        </Box>
      </React.Fragment>
    )}
  </Menu>
);

export default memo(ProfileMenu);
