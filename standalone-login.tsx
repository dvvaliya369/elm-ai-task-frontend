import React, { useState, useCallback, memo } from "react";
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
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

// Simple validation function
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 6;
};

const StandaloneLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = useCallback(
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
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
      
      // Reset previous messages
      setErrors({});
      setSuccessMessage("");

      // Validate form
      const newErrors: Record<string, string> = {};
      
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (!validatePassword(formData.password)) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Simulate login process
      setLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo purposes, always show success
        setSuccessMessage(`Welcome back! ${formData.rememberMe ? "You will stay logged in." : ""}`);
        
        // In a real app, you would redirect or update app state here
        console.log("Login successful:", {
          email: formData.email,
          rememberMe: formData.rememberMe,
        });
        
      } catch (error) {
        setErrors({ general: "Login failed. Please try again." });
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const handleSocialLogin = useCallback((provider: string) => {
    // Simulate social login
    setSuccessMessage(`${provider} login would be implemented here`);
  }, []);

  const handleForgotPassword = useCallback(() => {
    setSuccessMessage("Forgot password functionality would redirect to reset page");
  }, []);

  const handleSignupClick = useCallback(() => {
    setSuccessMessage("Sign up functionality would redirect to registration page");
  }, []);

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
      cursor: "pointer",
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
      cursor: "pointer",
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

            {successMessage && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {successMessage}
              </Alert>
            )}

            {errors.general && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.general}
              </Alert>
            )}

            {/* Social Login Buttons */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin("Google")}
                sx={styles.socialButton}
                disabled={loading}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                onClick={() => handleSocialLogin("GitHub")}
                sx={styles.socialButton}
                disabled={loading}
              >
                Continue with GitHub
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<TwitterIcon />}
                onClick={() => handleSocialLogin("Twitter")}
                sx={styles.socialButton}
                disabled={loading}
              >
                Continue with Twitter
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
                  onChange={handleInputChange("email")}
                  autoComplete="email"
                  variant="outlined"
                  disabled={loading}
                  error={!!errors.email}
                  helperText={errors.email || "Enter your email address"}
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
                  onChange={handleInputChange("password")}
                  autoComplete="current-password"
                  variant="outlined"
                  disabled={loading}
                  error={!!errors.password}
                  helperText={errors.password || "Enter your password"}
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
                <Typography
                  variant="body2"
                  onClick={handleForgotPassword}
                  sx={styles.forgotPasswordLink}
                >
                  Forgot password?
                </Typography>
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
                  <Typography
                    component="span"
                    variant="body2"
                    onClick={handleSignupClick}
                    sx={styles.footerLink}
                  >
                    Sign up for free
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

StandaloneLoginPage.displayName = "StandaloneLoginPage";

export default memo(StandaloneLoginPage);
