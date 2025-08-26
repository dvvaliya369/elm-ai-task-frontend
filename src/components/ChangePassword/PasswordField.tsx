import React, { useState, memo } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import {
  VisibilityOutlined as VisibilityIcon,
  VisibilityOffOutlined as VisibilityOffIcon,
} from "@mui/icons-material";

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

PasswordField.displayName = "PasswordField";

export default memo(PasswordField);
