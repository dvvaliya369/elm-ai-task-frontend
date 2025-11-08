export const changePasswordStyles = {
  card: {
    p: { xs: 2, sm: 2.5, md: 3 },
    mt: { xs: 1.5, sm: 2 },
    borderRadius: { xs: 0, sm: 2, md: 3 },
    boxShadow: { xs: "none", sm: "0 2px 12px rgba(0, 0, 0, 0.08)" },
    border: { xs: "none", sm: "1px solid" },
    borderColor: "divider",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: { xs: 1.5, sm: 1.75, md: 2 },
    flexWrap: "wrap",
    gap: { xs: 0.75, sm: 1 },
  },
  title: {
    fontWeight: 600,
    fontSize: { xs: "1rem", sm: "1.0625rem", md: "1.125rem" },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: { xs: 1.5, sm: 1.75, md: 2 },
  },
  buttonContainer: {
    display: "flex",
    gap: { xs: 1, sm: 1.25, md: 1.5 },
    justifyContent: "flex-end",
    mt: { xs: 0.75, sm: 1 },
    flexDirection: { xs: "column", sm: "row" },
  },
  description: {
    color: "text.secondary",
    fontSize: { xs: "0.8125rem", sm: "0.9375rem", md: "1rem" },
  },
};
