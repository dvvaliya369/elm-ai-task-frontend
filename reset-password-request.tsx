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
  Link,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

// Simple validation function
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

interface ResetPasswordRequestProps {
  onBackToLogin?: () => void;
}

const ResetPasswordRequest = ({ onBackToLogin }: ResetPasswordRequestProps) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setEmail(value);
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: "" }));
      }
    },
    [errors.email]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Reset previous messages
      setErrors({});

      // Validate form
      const newErrors: Record<string, string> = {};
      
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Simulate password reset request
      setLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success state
        setIsSubmitted(true);
        
        console.log("Password reset requested for:", email);
        
      } catch (error) {
        setErrors({ general: "Failed to send reset email. Please try again." });
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  const handleBackToLogin = useCallback(() => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      // For standalone usage, you might want to redirect or use router
      console.log("Navigate back to login");
    }
  }, [onBackToLogin]);

  const handleResendEmail = useCallback(() => {
    setIsSubmitted(false);
    setEmail("");
    setErrors({});
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

  if (isSubmitted) {
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

              <Box sx={styles.successContainer}>
                <CheckCircleIcon sx={styles.successIcon} />
                <Typography variant="h5" sx={styles.successTitle}>
                  Check Your Email
                </Typography>
                <Typography variant="body1" sx={styles.successText}>
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions to reset your password.
                </Typography>
                <Typography variant="body2" sx={{ ...styles.successText, fontSize: "0.875rem" }}>
                  Didn't receive the email? Check your spam folder or{" "}
                  <Typography 
                    component="span" 
                    onClick={handleResendEmail}
                    sx={styles.linkButton}
                  >
                    try again
                  </Typography>
                </Typography>
                
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleBackToLogin}
                  sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}
                >
                  Back to Login
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
                Reset Password
              </Typography>
              <Typography variant="body2" sx={styles.subtitle}>
                Enter your email address and we'll send you a link to reset your password
              </Typography>
            </Box>

            {errors.general && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.general}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                autoFocus
                variant="outlined"
                disabled={loading}
                error={!!errors.email}
                helperText={errors.email || "We'll never share your email with anyone else"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={styles.textField}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={styles.submitButton}
              >
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
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

ResetPasswordRequest.displayName = "ResetPasswordRequest";

export default memo(ResetPasswordRequest);
