export const changePasswordStyles = {
  card: {
    p: { xs: 2.5, sm: 3 },
    mt: 2,
  },
  header: {
    display: "flex",
    alignItems: { xs: "flex-start", sm: "center" },
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: { xs: "flex-start", sm: "space-between" },
    gap: { xs: 1.5, sm: 0 },
    mb: 2,
    textAlign: { xs: "center", sm: "left" },
  },
  title: {
    fontWeight: 600,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: { xs: 1.5, sm: 2 },
  },
  buttonContainer: {
    display: "flex",
    gap: { xs: 1, sm: 1.5 },
    justifyContent: { xs: "center", sm: "flex-end" },
    flexWrap: { xs: "wrap", sm: "nowrap" },
    mt: 1,
  },
  description: {
    color: "text.secondary",
  },
};
