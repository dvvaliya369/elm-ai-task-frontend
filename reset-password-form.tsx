import React, { useState, useCallback, memo } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

// Password validation helpers
const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

const getPasswordStrength = (password: string) => {
  const validation = validatePassword(password);
  const score = Object.values(validation).filter(Boolean).length;
  
  if (score < 2) return { strength: 0, label: "Weak", color: "error" };
  if (score < 4) return { strength: 50, label: "Fair", color: "warning" };
  if (score < 5) return { strength: 75, label: "Good", color: "info" };
  return { strength: 100, label: "Strong", color: "success" };
};

interface ResetPasswordFormProps {
  onBackToLogin?: () => void;
  token?: string; // Reset token from URL params
}

const ResetPasswordForm = ({ onBackToLogin, token }: ResetPasswordFormProps) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordValidation = validatePassword(formData.password);

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

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleToggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Reset previous messages
      setErrors({});

      // Validate form
      const newErrors: Record<string, string> = {};
      
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else {
        const validation = validatePassword(formData.password);
        if (!validation.length) {
          newErrors.password = "Password must be at least 8 characters long";
        } else if (!validation.uppercase) {
          newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!validation.lowercase) {
          newErrors.password = "Password must contain at least one lowercase letter";
        } else if (!validation.number) {
          newErrors.password = "Password must contain at least one number";
        } else if (!validation.special) {
          newErrors.password = "Password must contain at least one special character";
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Simulate password reset
      setLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success state
        setIsSuccess(true);
        
        console.log("Password reset successful for token:", token);
        
      } catch (error) {
        setErrors({ general: "Failed to reset password. Please try again." });
      } finally {
        setLoading(false);
      }
    },
    [formData, token]
  );

  const handleBackToLogin = useCallback(() => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      // For standalone usage, you might want to redirect or use router
      console.log("Navigate back to login");
    }
  }, [onBackToLogin]);

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
    backButton: {
      mb: 2,
      color: "primary.main",
      "&:hover": {
        backgroundColor: "rgba(25, 118, 210, 0.04)",
      },
    },
    header: {
      textAlign: "center",
      mb: 4,
    },
    title: {
      fontWeight: 700,
      color: "primary.main",
      mb: 1,
      fontSize: { xs: "1.75rem", sm: "2rem" },
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      color: "text.secondary",
      fontSize: { xs: "0.875rem", sm: "1rem" },
      fontWeight: 400,
      lineHeight: 1.5,
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
    passwordStrength: {
      mt: 1,
      mb: 0.5,
    },
    strengthIndicator: {
      display: "flex",
      alignItems: "center",
      gap: 1,
      mt: 0.5,
    },
    strengthText: {
      fontSize: "0.75rem",
      fontWeight: 500,
    },
    validationList: {
      mt: 1,
      pl: 2,
    },
    validationItem: {
      fontSize: "0.75rem",
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      mb: 0.25,
    },
    successContainer: {
      textAlign: "center",
    },
    successIcon: {
      fontSize: "4rem",
      color: "success.main",
      mb: 2,
    },
    successTitle: {
      fontWeight: 600,
      color: "text.primary",
      mb: 2,
      fontSize: "1.5rem",
    },
    successText: {
      color: "text.secondary",
      mb: 3,
      lineHeight: 1.6,
    },
    linkButton: {
      textDecoration: "none",
      color: "primary.main",
      fontWeight: 500,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };

  if (isSuccess) {
    return (
      <Container component="main" maxWidth={false}>
        <Box sx={styles.container}>
          <Card sx={styles.card}>
            <CardContent sx={styles.cardContent}>
              <Box sx={styles.successContainer}>
                <CheckCircleIcon sx={styles.successIcon} />
                <Typography variant="h5" sx={styles.successTitle}>
                  Password Reset Successful!
                </Typography>
                <Typography variant="body1" sx={styles.successText}>
                  Your password has been successfully reset. You can now sign in 
                  with your new password.
                </Typography>
                
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleBackToLogin}
                  sx={styles.submitButton}
                >
                  Sign In Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth={false}>
      <Box sx={styles.container}>
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <IconButton 
              onClick={handleBackToLogin}
              sx={styles.backButton}
              size="small"
            >
              <ArrowBackIcon />
            </IconButton>

            <Box sx={styles.header}>
              <Typography variant="h4" component="h1" sx={styles.title}>
                Set New Password
              </Typography>
              <Typography variant="body2" sx={styles.subtitle}>
                Choose a strong password to secure your account
              </Typography>
            </Box>

            {errors.general && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.general}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    autoComplete="new-password"
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
                  
                  {formData.password && (
                    <Box sx={styles.passwordStrength}>
                      <Box sx={styles.strengthIndicator}>
                        <LinearProgress
                          variant="determinate"
                          value={passwordStrength.strength}
                          color={passwordStrength.color as any}
                          sx={{ flex: 1, height: 6, borderRadius: 3 }}
                        />
                        <Typography 
                          sx={{ 
                            ...styles.strengthText, 
                            color: `${passwordStrength.color}.main` 
                          }}
                        >
                          {passwordStrength.label}
                        </Typography>
                      </Box>
                      
                      <Box sx={styles.validationList}>
                        <Box sx={styles.validationItem}>
                          <CheckCircleIcon 
                            sx={{ 
                              fontSize: "12px", 
                              color: passwordValidation.length ? "success.main" : "grey.400" 
                            }} 
                          />
                          <Typography 
                            sx={{ 
                              ...styles.strengthText,
                              color: passwordValidation.length ? "text.primary" : "text.secondary" 
                            }}
                          >
                            At least 8 characters
                          </Typography>
                        </Box>
                        <Box sx={styles.validationItem}>
                          <CheckCircleIcon 
                            sx={{ 
                              fontSize: "12px", 
                              color: passwordValidation.uppercase ? "success.main" : "grey.400" 
                            }} 
                          />
                          <Typography 
                            sx={{ 
                              ...styles.strengthText,
                              color: passwordValidation.uppercase ? "text.primary" : "text.secondary" 
                            }}
                          >
                            One uppercase letter
                          </Typography>
                        </Box>
                        <Box sx={styles.validationItem}>
                          <CheckCircleIcon 
                            sx={{ 
                              fontSize: "12px", 
                              color: passwordValidation.number ? "success.main" : "grey.400" 
                            }} 
                          />
                          <Typography 
                            sx={{ 
                              ...styles.strengthText,
                              color: passwordValidation.number ? "text.primary" : "text.secondary" 
                            }}
                          >
                            One number
                          </Typography>
                        </Box>
                        <Box sx={styles.validationItem}>
                          <CheckCircleIcon 
                            sx={{ 
                              fontSize: "12px", 
                              color: passwordValidation.special ? "success.main" : "grey.400" 
                            }} 
                          />
                          <Typography 
                            sx={{ 
                              ...styles.strengthText,
                              color: passwordValidation.special ? "text.primary" : "text.secondary" 
                            }}
                          >
                            One special character
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>

                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm New Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  autoComplete="new-password"
                  variant="outlined"
                  disabled={loading}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword || "Re-enter your new password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
                />
              </Stack>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || passwordStrength.strength < 75}
                sx={styles.submitButton}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{" "}
                  <Typography 
                    component="span" 
                    onClick={handleBackToLogin}
                    sx={styles.linkButton}
                  >
                    Back to login
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

ResetPasswordForm.displayName = "ResetPasswordForm";

export default memo(ResetPasswordForm);
