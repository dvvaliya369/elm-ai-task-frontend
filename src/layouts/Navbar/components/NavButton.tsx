import React, { memo } from "react";
import { Chip } from "@mui/material";
import { navbarComponentStyles } from "./styles";

interface NavButtonProps {
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  onClick,
  isActive,
}) => (
  <Chip
    icon={icon}
    label={label}
    variant="outlined"
    onClick={onClick}
    sx={navbarComponentStyles.navButton(isActive || false)}
  />
);

export default memo(NavButton);
