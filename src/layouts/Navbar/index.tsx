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
  // SearchOutlined as SearchIcon,
  AddBoxOutlined as AddIcon,
  PersonOutlined as PersonIcon,
} from "@mui/icons-material";
import Logo from "./components/Logo";
import NavButton from "./components/NavButton";
import IconNavButton from "./components/IconNavButton";
import ProfileMenu from "./components/ProfileMenu";
import { useNavbarHandlers } from "./hooks/useNavbarHandlers";
import { useProfileMenu } from "./hooks/useProfileMenu";
import { navbarStyles } from "./styles";

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
        sx={navbarStyles.appBar}
      >
        <Toolbar sx={navbarStyles.toolbar}>
          <Logo />

          {!isMobile && !isTablet && (
            <Box sx={navbarStyles.desktopNavContainer}>
              <Box sx={navbarStyles.navButtonsContainer}>
                <NavButton
                  icon={<HomeIcon />}
                  label="Home"
                  onClick={() => handleNavigation("/")}
                  isActive={location.pathname === "/"}
                />
                {/* <NavButton icon={<SearchIcon />} label="Search" /> */}
                {isAuthenticated && (
                  <NavButton
                    icon={<AddIcon />}
                    label="Create"
                    onClick={() => handleNavigation("/posts/create")}
                    isActive={location.pathname === "/posts/create"}
                  />
                )}
              </Box>

              {isAuthenticated ? (
                <IconButton onClick={handleProfileClick} sx={navbarStyles.profileButton}>
                  <Avatar
                    alt={user?.fullName || "User"}
                    sx={navbarStyles.profileAvatar}
                  >
                    {user?.fullName?.[0] || "U"}
                  </Avatar>
                </IconButton>
              ) : (
                <Box sx={navbarStyles.authButtonsContainer}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={handleLogin}
                    sx={navbarStyles.loginButton}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleSignup}
                    sx={navbarStyles.signupButton}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {isTablet && (
            <Box sx={navbarStyles.tabletNavContainer}>
              <IconNavButton
                icon={<HomeIcon />}
                onClick={() => handleNavigation("/")}
                isActive={location.pathname === "/"}
              />
              {/* <IconNavButton icon={<SearchIcon />} /> */}
              {isAuthenticated && (
                <IconNavButton
                  icon={<AddIcon />}
                  onClick={() => handleNavigation("/posts/create")}
                  isActive={location.pathname === "/posts/create"}
                />
              )}

              {isAuthenticated ? (
                <IconButton onClick={handleProfileClick} sx={navbarStyles.tabletProfileButton}>
                  <Avatar
                    alt={user?.fullName || "User"}
                    sx={navbarStyles.profileAvatar}
                  >
                    {user?.fullName?.[0] || "U"}
                  </Avatar>
                </IconButton>
              ) : (
                <Box sx={navbarStyles.tabletAuthContainer}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={handleLogin}
                    sx={navbarStyles.tabletLoginButton}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleSignup}
                    sx={navbarStyles.tabletSignupButton}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={handleProfileClick} sx={navbarStyles.mobileProfileButton}>
              {isAuthenticated ? (
                <Avatar
                  alt={user?.fullName || "User"}
                  sx={navbarStyles.mobileProfileAvatar}
                >
                  {user?.fullName?.[0] || "U"}
                </Avatar>
              ) : (
                <PersonIcon sx={navbarStyles.mobilePersonIcon} />
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
