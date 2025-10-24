import React, { useState, useCallback, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Link,
  Container,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { validateForm } from "../../utils/validation";
import { loginUser } from "../../service/auth.service";
import { useSelector, useDispatch } from "../../store/index";
import { useToast } from "../../hooks/useToast";

const EnhancedLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated) {
      showSuccess("Welcome back! Login successful.");
      navigate("/");
    }
  }, [isAuthenticated, navigate, showSuccess]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  const handleInputChange = useCallback(
    (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, rememberMe: event.target.checked }));
  }, []);

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const formErrors = validateForm({ 
        email: formData.email, 
        password: formData.password 
      });
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
        return;
      }

      dispatch(loginUser({ 
        email: formData.email, 
        password: formData.password,
        rememberMe: formData.rememberMe
      }));
    },
    [dispatch, formData]
  );

  const handleSocialLogin = useCallback((provider: string) => {
    // Placeholder for social login implementation
    showError(`${provider} login not implemented yet`);
  }, [showError]);

  const handleForgotPassword = useCallback(() => {
    navigate("/forgot-password");
  }, [navigate]);

  const handleSignupClick = useCallback(() => {
    navigate("/sign-up");
  }, [navigate]);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      py: 4,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    card: {
      width: "100%",
      maxWidth: { xs: 380, sm: 420 },
      mx: { xs: 2, sm: 0 },
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      borderRadius: 4,
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      background: "rgba(255, 255, 255, 0.95)",
    },
    cardContent: {
      p: { xs: 3, sm: 4 },
    },
    header: {
      textAlign: "center",
      mb: 4,
    },
    title: {
      fontWeight: 700,
      color: "primary.main",
      mb: 1,
      fontSize: { xs: "1.875rem", sm: "2.25rem" },
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      color: "text.secondary",
      fontSize: { xs: "0.875rem", sm: "1rem" },
      fontWeight: 400,
    },
    textField: {
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        "&.Mui-focused": {
          boxShadow: "0 4px 16px rgba(25, 118, 210, 0.2)",
        },
      },
    },
    submitButton: {
      mt: 3,
      mb: 2,
      py: 1.5,
      fontSize: "1rem",
      fontWeight: 600,
      borderRadius: 2,
      textTransform: "none",
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
      "&:hover": {
        background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
        transform: "translateY(-2px)",
      },
      "&:disabled": {
        background: "rgba(0,0,0,0.12)",
        boxShadow: "none",
        transform: "none",
      },
      transition: "all 0.3s ease",
    },
    socialButton: {
      py: 1.2,
      px: 3,
      borderRadius: 2,
      textTransform: "none",
      fontWeight: 500,
      border: "1px solid rgba(0,0,0,0.12)",
      color: "text.primary",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transform: "translateY(-1px)",
      },
      transition: "all 0.2s ease",
    },
    rememberMeContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mt: 2,
      mb: 1,
    },
    forgotPasswordLink: {
      textDecoration: "none",
      color: "primary.main",
      fontWeight: 500,
      fontSize: "0.875rem",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    footer: {
      textAlign: "center",
      mt: 3,
    },
    footerText: {
      color: "text.secondary",
      fontSize: "0.95rem",
    },
    footerLink: {
      textDecoration: "none",
      color: "primary.main",
      fontWeight: 600,
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };

  return (
    <Container component="main" maxWidth={false}>
      <Box sx={styles.container}>
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.header}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={styles.title}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={styles.subtitle}>
                Sign in to continue to your account
              </Typography>
            </Box>

            {/* Social Login Buttons */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin("Google")}
                sx={styles.socialButton}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                onClick={() => handleSocialLogin("GitHub")}
                sx={styles.socialButton}
              >
                Continue with GitHub
              </Button>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Divider sx={{ flex: 1 }} />
              <Chip label="OR" size="small" sx={{ mx: 2, fontSize: "0.75rem" }} />
              <Divider sx={{ flex: 1 }} />
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email")(e.target.value)}
                  autoComplete="email"
                  variant="outlined"
                  disabled={loading}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
                />

                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password")(e.target.value)}
                  autoComplete="current-password"
                  variant="outlined"
                  disabled={loading}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
                />
              </Stack>

              <Box sx={styles.rememberMeContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={handleCheckboxChange}
                      name="rememberMe"
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={handleForgotPassword}
                  sx={styles.forgotPasswordLink}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={styles.submitButton}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <Box sx={styles.footer}>
                <Typography variant="body2" sx={styles.footerText}>
                  Don't have an account?{" "}
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={handleSignupClick}
                    sx={styles.footerLink}
                  >
                    Sign up for free
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

EnhancedLogin.displayName = "EnhancedLogin";

export default memo(EnhancedLogin);
