import React, { memo } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Link,
  Container,
  Stack,
} from "@mui/material";
import FormField from "../FormField";
import type { AuthFormProps } from "./authForm.interface";

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  fields,
  submitText,
  onSubmit,
  footerText,
  footerLinkText,
  onFooterLinkClick,
  isLoading = false,
}) => {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: { xs: 350, sm: 400 },
            mx: { xs: 2, sm: 0 },
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            borderRadius: 3,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  mb: 1,
                  fontSize: { xs: "1.75rem", sm: "2.125rem" },
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "0.95rem" } }}
              >
                {subtitle}
              </Typography>
            </Box>

            <Box component="form" onSubmit={onSubmit} noValidate>
              <Stack spacing={2.5}>
                {fields.length === 4 &&
                fields[0].name === "firstName" &&
                fields[1].name === "lastName" ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: 1.5, sm: 2 },
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <FormField {...fields[0]} disabled={isLoading} />
                      <FormField {...fields[1]} disabled={isLoading} />
                    </Box>
                    {fields.slice(2).map((field) => (
                      <FormField
                        key={field.name}
                        {...field}
                        disabled={isLoading}
                      />
                    ))}
                  </>
                ) : (
                  fields.map((field) => (
                    <FormField
                      key={field.name}
                      {...field}
                      disabled={isLoading}
                    />
                  ))
                )}
              </Stack>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 3,
                  mb: 3,
                  py: 1.2,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    boxShadow: "none",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {isLoading ? "Loading..." : submitText}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.95rem" }}
                >
                  {footerText}{" "}
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={onFooterLinkClick}
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {footerLinkText}
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

AuthForm.displayName = "AuthForm";

export default memo(AuthForm);
