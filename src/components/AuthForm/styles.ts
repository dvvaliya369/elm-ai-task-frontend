// AuthForm styles
export const authFormStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    py: { xs: 2, sm: 3, md: 4 },
    px: { xs: 0.5, sm: 1, md: 0 },
  },
  card: {
    width: "100%",
    maxWidth: { xs: "100%", sm: 420, md: 450 },
    mx: { xs: 0.5, sm: 1, md: 0 },
    boxShadow: { xs: "none", sm: "0 8px 32px rgba(0,0,0,0.12)" },
    borderRadius: { xs: 0, sm: 2, md: 3 },
    border: { xs: "none", sm: "1px solid rgba(0,0,0,0.08)" },
  },
  cardContent: {
    p: { xs: 2, sm: 3, md: 4 },
  },
  header: {
    textAlign: "center",
    mb: { xs: 2.5, sm: 3, md: 4 },
  },
  title: {
    fontWeight: 700,
    color: "primary.main",
    mb: { xs: 0.75, sm: 1 },
    fontSize: { xs: "1.375rem", sm: "1.75rem", md: "2.125rem" },
  },
  subtitle: {
    color: "text.secondary",
    fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.95rem" },
  },
  fieldsContainer: {
    spacing: { xs: 1.75, sm: 2, md: 2.5 },
  },
  nameFieldsRow: {
    display: "flex",
    gap: { xs: 1.25, sm: 1.5, md: 2 },
    flexDirection: { xs: "column", sm: "row" },
  },
  submitButton: {
    mt: { xs: 2, sm: 2.5, md: 3 },
    mb: { xs: 2, sm: 2.5, md: 3 },
    py: { xs: 1.25, sm: 1.25, md: 1.2 },
    fontSize: { xs: "0.9375rem", sm: "0.9375rem", md: "1rem" },
    fontWeight: 600,
    borderRadius: { xs: 1.5, sm: 2 },
    textTransform: "none",
    minHeight: { xs: "44px", sm: "42px" },
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
    fontSize: { xs: "0.875rem", sm: "0.95rem" },
  },
  footerLink: {
    textDecoration: "none",
    color: "primary.main",
    fontWeight: 600,
    fontSize: { xs: "0.875rem", sm: "0.95rem" },
    "&:hover": {
      textDecoration: "underline",
    },
  },
};
