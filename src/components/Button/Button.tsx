import React from "react";
import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";

export interface ButtonProps extends MuiButtonProps {
  label?: string;
}

const Button: React.FC<ButtonProps> = ({ label, children, ...props }) => {
  return (
    <MuiButton {...props}>
      {label || children}
    </MuiButton>
  );
};

export default Button;
