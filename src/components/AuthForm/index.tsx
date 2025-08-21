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
import { authFormStyles } from "./styles";

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
      <Box sx={authFormStyles.container}>
        <Card sx={authFormStyles.card}>
          <CardContent sx={authFormStyles.cardContent}>
            <Box sx={authFormStyles.header}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={authFormStyles.title}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={authFormStyles.subtitle}
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
                    <Box sx={authFormStyles.nameFieldsRow}>
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
                sx={authFormStyles.submitButton}
              >
                {isLoading ? "Loading..." : submitText}
              </Button>

              <Box sx={authFormStyles.footer}>
                <Typography
                  variant="body2"
                  sx={authFormStyles.footerText}
                >
                  {footerText}{" "}
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={onFooterLinkClick}
                    sx={authFormStyles.footerLink}
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
