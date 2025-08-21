// AuthForm styles
export const authFormStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    py: 4,
  },
  card: {
    width: "100%",
    maxWidth: { xs: 350, sm: 400 },
    mx: { xs: 2, sm: 0 },
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    borderRadius: 3,
    border: "1px solid rgba(0,0,0,0.08)",
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
    fontSize: { xs: "1.75rem", sm: "2.125rem" },
  },
  subtitle: {
    color: "text.secondary",
    fontSize: { xs: "0.875rem", sm: "0.95rem" },
  },
  fieldsContainer: {
    spacing: 2.5,
  },
  nameFieldsRow: {
    display: "flex",
    gap: { xs: 1.5, sm: 2 },
    flexDirection: { xs: "column", sm: "row" },
  },
  submitButton: {
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
  },
  footer: {
    textAlign: "center",
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
