import { memo, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { AuthFormField } from "../AuthForm/authForm.interface";
import { formFieldStyles } from "./styles";

interface FormFieldProps extends AuthFormField {
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      required={required}
      fullWidth
      id={name}
      label={label}
      name={name}
      type={isPasswordField && showPassword ? "text" : type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete={name}
      variant="outlined"
      disabled={disabled}
      size="small"
      error={!!error}
      helperText={error}
      slotProps={{
        input: isPasswordField
          ? {
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
            }
          : undefined,
      }}
      sx={formFieldStyles.textField}
    />
  );
};

FormField.displayName = "FormField";

export default memo(FormField);
