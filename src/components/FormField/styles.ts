// FormField styles
export const formFieldStyles = {
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: { xs: 1.5, sm: 2 },
      fontSize: { xs: "16px", sm: "0.9375rem", md: "1rem" }, // 16px on mobile prevents zoom on iOS
      minHeight: { xs: "48px", sm: "52px" },
      "&:hover fieldset": {
        borderColor: "primary.main",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
    },
    "& .MuiFormHelperText-root": {
      fontSize: { xs: "0.75rem", sm: "0.8125rem" },
      marginLeft: { xs: "8px", sm: "14px" },
    },
    "& .MuiInputBase-input": {
      fontSize: { xs: "16px", sm: "0.9375rem", md: "1rem" },
      padding: { xs: "12px 14px", sm: "14px 16px" },
    },
  },
};
