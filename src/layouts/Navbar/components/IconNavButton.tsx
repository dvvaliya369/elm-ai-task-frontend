import React, { memo } from "react";
import { IconButton } from "@mui/material";
import { navbarComponentStyles } from "./styles";

interface IconNavButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const IconNavButton: React.FC<IconNavButtonProps> = ({
  icon,
  onClick,
  isActive,
}) => (
  <IconButton
    onClick={onClick}
    sx={navbarComponentStyles.iconNavButton(isActive || false)}
  >
    {icon}
  </IconButton>
);

export default memo(IconNavButton);
