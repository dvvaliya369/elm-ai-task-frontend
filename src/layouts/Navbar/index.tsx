import React, { memo } from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Box,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../store/index";
import {
  HomeOutlined as HomeIcon,
  SearchOutlined as SearchIcon,
  AddBoxOutlined as AddIcon,
  PersonOutlined as PersonIcon,
} from "@mui/icons-material";
import Logo from "./components/Logo";
import NavButton from "./components/NavButton";
import IconNavButton from "./components/IconNavButton";
import ProfileMenu from "./components/ProfileMenu";
import { useNavbarHandlers } from "./hooks/useNavbarHandlers";
import { useProfileMenu } from "./hooks/useProfileMenu";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const { handleNavigation, handleLogin, handleSignup, handleLogout } =
    useNavbarHandlers();
  const { anchorEl, open, handleProfileClick, handleClose } = useProfileMenu();

  const handleMenuNavigation = (path: string) => {
    handleNavigation(path);
    handleClose();
  };

  const handleMenuLogin = () => {
    handleLogin();
    handleClose();
  };

  const handleMenuSignup = () => {
    handleSignup();
    handleClose();
  };

  const handleMenuLogout = () => {
    handleLogout();
    handleClose();
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1,
            px: { xs: 2, sm: 3, md: 8, lg: 15 },
            minHeight: "64px",
          }}
        >
          <Logo />

          {!isMobile && !isTablet && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <NavButton
                  icon={<HomeIcon />}
                  label="Home"
                  onClick={() => handleNavigation("/")}
                  isActive={location.pathname === "/"}
                />
                <NavButton icon={<SearchIcon />} label="Search" />
                {isAuthenticated && (
                  <NavButton icon={<AddIcon />} label="Create" />
                )}
                {isAuthenticated && (
                  <NavButton icon={<PersonIcon />} label="Profile" />
                )}
              </Box>

              {isAuthenticated ? (
                <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.fullName || "User"}
                    sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                  >
                    {user?.fullName?.[0] || "U"}
                  </Avatar>
                </IconButton>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={handleLogin}
                    sx={{
                      color: "text.primary",
                      fontFamily:
                        '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 500,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontSize: "0.875rem",
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleSignup}
                    sx={{
                      fontFamily:
                        '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 500,
                      px: 2,
                      py: 0.5,
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontSize: "0.875rem",
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.24)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {isTablet && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconNavButton
                icon={<HomeIcon />}
                onClick={() => handleNavigation("/")}
                isActive={location.pathname === "/"}
              />
              <IconNavButton icon={<SearchIcon />} />
              {isAuthenticated && (
                <IconNavButton icon={<AddIcon />} />
              )}
              {isAuthenticated && <IconNavButton icon={<PersonIcon />} />}

              {isAuthenticated ? (
                <IconButton onClick={handleProfileClick} sx={{ p: 0, ml: 1 }}>
                  <Avatar
                    alt={user?.fullName || "User"}
                    sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                  >
                    {user?.fullName?.[0] || "U"}
                  </Avatar>
                </IconButton>
              ) : (
                <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={handleLogin}
                    sx={{
                      color: "text.primary",
                      fontFamily:
                        '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 500,
                      px: 1.25,
                      py: 0.25,
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontSize: "0.8125rem",
                      minHeight: "auto",
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleSignup}
                    sx={{
                      fontFamily:
                        '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 500,
                      px: 1.5,
                      py: 0.25,
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontSize: "0.8125rem",
                      minHeight: "auto",
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.24)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
              {isAuthenticated ? (
                <Avatar
                  alt={user?.fullName || "User"}
                  sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                >
                  {user?.fullName?.[0] || "U"}
                </Avatar>
              ) : (
                <PersonIcon sx={{ color: "text.secondary" }} />
              )}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <ProfileMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        user={user}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
        onNavigation={handleMenuNavigation}
        onLogin={handleMenuLogin}
        onSignup={handleMenuSignup}
        onLogout={handleMenuLogout}
      />
    </>
  );
};

export default memo(Navbar);
